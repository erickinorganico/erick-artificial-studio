"""Local production CLI. No provider calls or publication."""
from pathlib import Path
import argparse,hashlib,importlib.util,json,os,re,shutil,subprocess,sys
ROOT=Path(__file__).resolve().parent
def run(args,**kwargs):
    return subprocess.run([str(x) for x in args],check=True,**kwargs)
def episode(name):
    if not re.fullmatch(r'[a-z0-9][a-z0-9-]*',name):raise ValueError('ID inválido')
    base=ROOT/'episodes'/name
    cfg=json.loads((base/'episode.json').read_text(encoding='utf-8'))
    if cfg['id']!=name or not 0<float(cfg['duration'])<=90 or int(cfg['fps'])<=0:raise ValueError('Configuración inválida')
    for key in ['voice','phrases','visual']:
        path=(base/cfg[key]).resolve()
        if not path.is_relative_to(base.resolve()):raise ValueError('Ruta fuera del episodio')
        if not path.exists():raise FileNotFoundError(f'Falta {key}: {path}')
    return base,cfg
def digest(p):return hashlib.sha256(Path(p).read_bytes()).hexdigest()
def probe(p):
    return json.loads(subprocess.check_output(['ffprobe','-v','error','-show_streams','-show_format','-of','json',str(p)],text=True))
def doctor():
    result={'python':sys.version.split()[0],'executables':{n:shutil.which(n) for n in ['ffmpeg','ffprobe']},'modules':{n:importlib.util.find_spec(n) is not None for n in ['numpy','scipy','soundfile','pyloudnorm','playwright','PIL']}}
    print(json.dumps(result,indent=2))
    return all(result['executables'].values()) and all(result['modules'].values())
def produce(action,name):
    base,c=episode(name);out=ROOT/'build'/name;out.mkdir(parents=True,exist_ok=True)
    renderer=ROOT/'skills/mono-volumetrico/scripts/render.py'
    py=[sys.executable,'-X','utf8']
    if action=='check':
        print(json.dumps({'id':name,'inputs_present':True,'voice_sha256':digest(base/c['voice']),'duration':c['duration'],'frames':round(c['duration']*c['fps'])},indent=2));return
    if action=='stills':
        run(py+[renderer,'--project',base/c['visual'],'--stills','0,7.3,14.7,19.6,30,40','--stills-dir',out/'stills']);return
    if action=='render':
        run(py+[renderer,'--project',base/c['visual'],'--out',out/'visual.mp4','--to',c['duration'],'--fps',c['fps']])
        action='sound'
    if action=='sound':
        if not (out/'visual.mp4').exists():raise FileNotFoundError('Ejecuta render primero: falta visual.mp4')
        aud=out/'audio';(aud/'stems').mkdir(parents=True,exist_ok=True)
        env=os.environ.copy();env['SFX_GAIN_OFFSET']=str(c['sfx_gain_offset'])
        run(py+[ROOT/'audio/cues.py',aud],env=env)
        run(py+[ROOT/'audio/mezclar.py',base/c['voice'],aud/'stems/sfx-v15-preduck.wav',aud/'cues-v15-base.json',base/c['phrases'],aud,out/'mix-report.json'])
        run(['ffmpeg','-v','error','-y','-i',aud/'stems/mezcla-v15.wav','-c:a','aac','-b:a','256k','-ar','48000','-ac','2',aud/'mix.m4a'])
        run(['ffmpeg','-v','error','-y','-i',out/'visual.mp4','-i',aud/'mix.m4a','-map','0:v:0','-map','1:a:0','-c','copy','-map_metadata','-1','-map_chapters','-1','-movflags','+faststart',out/'final.mp4'])
        print(str(out/'final.mp4'));return
    if action=='verify':
        final=out/'final.mp4';p=probe(final);video=next(s for s in p['streams'] if s['codec_type']=='video')
        if (video['width'],video['height'])!=(c['width'],c['height']):raise ValueError('Resolución incorrecta')
        num,den=map(int,video['avg_frame_rate'].split('/'))
        if abs(num/den-c['fps'])>.001:raise ValueError('FPS incorrecto')
        if abs(float(video['duration'])-c['duration'])>1/c['fps']:raise ValueError('Duración incorrecta')
        run(['ffmpeg','-v','error','-i',final,'-f','null','-'])
        def essence(path):return subprocess.check_output(['ffmpeg','-v','error','-i',str(path),'-map','0:v:0','-c','copy','-f','hash','-hash','sha256','-'],text=True).strip()
        same=essence(final)==essence(out/'visual.mp4')
        if not same:raise ValueError('El mux cambió la esencia visual')
        report={'sha256':digest(final),'duration':video['duration'],'visual_unchanged':same,'decode_pass':True,'human_review':False,'metadata_publication_gate':False,'publication_authorized':False}
        (out/'verification.json').write_text(json.dumps(report,indent=2),encoding='utf-8')
        meter=run(['ffmpeg','-hide_banner','-i',final,'-af','ebur128=peak=true','-f','null','-'],capture_output=True,text=True)
        (out/'loudness.txt').write_text(meter.stderr,encoding='utf-8');print(json.dumps(report,indent=2))
def main():
    p=argparse.ArgumentParser(description=__doc__);p.add_argument('action',choices=['doctor','check','stills','render','sound','verify']);p.add_argument('episode',nargs='?',default='chilaquiles');a=p.parse_args()
    if a.action=='doctor':return 0 if doctor() else 1
    produce(a.action,a.episode);return 0
if __name__=='__main__':
    try:sys.exit(main())
    except (ValueError,FileNotFoundError,subprocess.CalledProcessError) as e:print(str(e),file=sys.stderr);sys.exit(1)
