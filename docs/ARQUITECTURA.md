# Arquitectura

`episode.json` → escenas Canvas + motor de skills → render Playwright/FFmpeg → `visual.mp4`.

Voz nivelada privada + cues/síntesis → mezcla con ducking sobre SFX → AAC → mux con `-c:v copy` → `final.mp4`.

`studio.py` resuelve rutas desde su archivo, valida el ID/duración/fps, crea carpetas de salida y detiene el proceso ante errores. No invoca shells, modelos ni servicios. Los componentes creativos importados conservan sus autores; la CLI es infraestructura Codex.

Voz → mono; mezcla → estéreo. Comparar loudness con igual disposición de canales: -16 LUFS mono y -13 LUFS L=R no implican por sí solos una subida de ganancia. Una medición no equivale a escuchar. Los recibos originales están en los expedientes históricos; los reportes de build son evidencia técnica nueva.

Procedencia: `provenance.json`. Los hashes son del momento de importación; los archivos de código pueden evolucionar a partir del commit inicial. No cambiar manifiestos para esconder diferencias.
