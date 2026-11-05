# Erick Artificial Studio

Motor local de videos explicativos: escenas Canvas con volumen y relieve, fondos negros, acentos semánticos y efectos procedurales. Primera pieza: chilaquiles — ventas observadas no equivalen a preferencias.

## Inicio

Python 3.10+, FFmpeg/FFprobe y Chromium de Playwright. Configura un entorno propio, instala `requirements.txt` (o `requirements-tested.txt` para las versiones verificadas localmente) y ejecuta `python -m playwright install chromium` si aún no lo tienes. La preparación de este repo no instala dependencias ni llama proveedores.

```sh
python studio.py doctor
python studio.py check chilaquiles
python studio.py stills chilaquiles
python studio.py render chilaquiles
python studio.py sound chilaquiles
python studio.py verify chilaquiles
python -m unittest discover -s tests
```

Usa el mismo Python que tenga Playwright/Chromium y dependencias. `render` crea video y luego llama a `sound`; `sound` regenera efectos y mezcla conservando la voz nivelada. Archivos generados en `build/chilaquiles/`. `verify` compara duración, formato, decodificación, pico/volumen y esencia del video antes/después del mux; no acredita revisión perceptiva.

## Qué editar

- `episodes/chilaquiles/`: guion aprobado, configuración, frases y escenas (`visual/escenas-*.js`).
- `skills/mono-volumetrico/`: motor, materiales, relieve, tipografía y scripts de render.
- `audio/`: síntesis, cues y mezcla; `cues.py` contiene tiempos y diseño sonoro de esta pieza.
- `skills/revision-fidelidad-mono/`: revisión visual y de sonido reutilizable.
- `docs/`: arquitectura, procedencia, revisión y pendientes.

El episodio y sus cues son hoy específicos de chilaquiles. Otro episodio requiere su propio guion, voz, escenas y cues: no basta cambiar el título. No hay síntesis automática ni publicación automática.

## Archivos privados y fuentes

La voz original/nivelada está disponible localmente en `episodes/chilaquiles/private/`, excluida de Git. En otra máquina debe aportarla el propietario. Las fuentes TTF de la pieza están disponibles localmente y excluidas del commit; su procedencia histórica figura en `provenance.json`. El renderer admite fuentes de sistema como alternativa (cambia la apariencia). No se redistribuyen aquí los reels de Alyxia ni clips de referencia.

## Estado

Base consolidada de V14/V15, no aprobación editorial nueva. Sigue pendiente evaluación completa de imagen/audio; ver `docs/BACKLOG.md`. Guion aprobado; aprendizaje/retención no medidos. La ejecución no genera otra voz, compra servicios o publica. Antes de entregar para publicación: copia limpia, verificación fuente/salida y recibo SHA-256 con el procedimiento vigente del canal.

`provenance.json` registra hashes de fuentes importadas. No se cambian ni borran los expedientes originales. Git local con rama `codex/studio-foundation`; sin remoto ni push.
