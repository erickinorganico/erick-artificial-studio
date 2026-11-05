# Módulo opcional · diseño sonoro y mezcla (aprendido en V15 «¿Respondió bien?», Erick Artificial)

Opcional y por proyecto: se usa cuando el expediente pide SFX. No impone vocabulario, niveles ni marca a otras piezas.
Sin música salvo que el expediente la pida. Fuentes: síntesis determinista propia (`sfxlib.py`, semillas fijas) o banco
local con derechos documentados. Los sonidos procedurales se declaran como tales; nunca como grabaciones reales.

## 1. Cues desde la imagen, no desde el texto
- Leer los tiempos en el código de escenas (`E.seg(t, a, b)` + easing). Contacto de `ob` ≈ 35–45 % del tramo
  (ápice del sobreimpulso); `ioc` llega al final del tramo; `oc` asienta ~70 %. Contrastar con hojas cada 0,5 s.
- Cada cue = `id, t_contacto, anchor` (segundos dentro del sonido que caen en el contacto). Whooshes/swells llevan
  anchor > 0 (preparación antes del contacto); transientes anchor = 0.
- Medir y registrar onset (−30 dB del pico) y ápice de cada sonido colocado (`mezclar.py` → `cues-*.json`).

## 2. Vocabulario (una familia por significado, variar tono/duración/intensidad)
| Significado | Familia | Variación |
|---|---|---|
| objeto cerámico (plato) | `clink` inarmónico | f distinta por plato; misma familia en el remate |
| conteo | `ratchet` acelerado + `clunk` de cierre por grupo | no ticks literales; grupos con tono emparentado |
| confirmación | 2 notas `mallet` ascendentes | distinta altura cada vez |
| duda/quiebre | `snap_dry` (chasquido + díada desafinada) | corto, medio-grave, sin alarma |
| vacío/agotado | `drain` + `blip` descendentes + stop corto | termina en seco |
| registro en papel | `printer`, `paper`, `stamp`, `thud` | sintéticos |
| contraste A≠B | par L sólido / R hueco con +70 ms | distinto TIMBRE además de paneo (legible en mono) |
| aparición de texto clave | mazo suave + papel en el hueco previo | uno por bloque, luego reposo para leer |
| remate | arpegio corto mayor + clink, cola completa | resolución, no estruendo |

Jerarquía: acentos más fuertes en huecos de voz; capas finas (−24 a −27 dB de hoja) bajo voz. Dejar descansos.
Cantidad orientativa 30–50 eventos/45 s si la imagen los justifica; más cantidad no es mejor sonido.

## 3. Mezcla (`mezclar.py`)
- Voz: copia bit-exacta del stem aprobado, ganancia unidad, L=R. Sin recomprimir, sin limitador.
- SFX: ducking 6 dB por envolvente de voz (RMS 10 ms, umbral por encima del suelo de pausas MEDIDO, ataque 15 ms,
  relajación 180 ms, pre-roll 40 ms) + muesca 2–4,5 kHz sólo mientras hay voz. Picos: si la mezcla roza el techo se baja
  sólo el SFX de ese tramo (rampa), nunca la voz.
- Ganancias en hoja + un offset global calibrado (V15: +12 dB → SFX −27,8 LUFS vs voz L=R −13,0; voz ≥ 14,9 dB sobre SFX
  en cada frase). Ajustar por proyecto midiendo; no copiar el número a ciegas.
- **Trampa de medidor:** un archivo mono mide 3 LU menos que el mismo audio L=R en BS.1770 (V14: −16,0 mono / −13,0 L=R).
  No es cambio de volumen: comparar siempre con el mismo medidor y la misma disposición de canales; no corregir ganancia por eso.
- **Bug ya visto:** constantes de tiempo de la envolvente calculadas a 48 kHz y aplicadas a 1 kHz de control → ducking
  permanente. Verificar `bajo_voz_pct` bajo en cues de huecos.

## 4. Verificación mínima (ver revision-fidelidad-mono §3d)
SHA esencia de vídeo igual (`ffmpeg -map 0:v -c copy -f hash -hash sha256 -`), voz idéntica dentro de la mezcla,
Δ por frase ≤ 0,5 dB, voz/SFX por frase, pico ≤ −1 dBTP, 0 clipping, suma mono, cola final sin corte, duración exacta,
balance espectral SFX vs voz (>8 kHz). La medición no es escucha: declararlo.

Reproducir V15: `cues.py <audio_dir>` (con `SFX_GAIN_OFFSET`) → `mezclar.py` → AAC 256k estéreo → mux `-c:v copy`.
