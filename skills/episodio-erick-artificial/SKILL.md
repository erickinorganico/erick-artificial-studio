---
name: episodio-erick-artificial
description: Úsala para llevar un episodio de Erick Artificial de la idea a la entrega (guion → aprobación → voz autorizada → escenas → revisión → sonido → verificación → empaque) con las skills correctas y las puertas humanas del canal. Orquesta guion-erick-artificial, mono-volumetrico y revision-fidelidad-mono.
---

# Episodio Erick Artificial · de punta a punta

Meta de proceso: **1 guion aprobado + ≤ 2 rondas visuales + 1 ronda de sonido.** Estrategia: `docs/ESTRATEGIA-CONTENIDO.md`. Mapa de skills: `docs/MAPA-DE-SKILLS.md`. Reglas del repo: `AGENTS.md` (mandan sobre esta skill).

## Puertas humanas (no se saltan)

| Puerta | Quién decide | Sin ella no se puede |
|---|---|---|
| G1 · Guion aprobado | Erick | grabar voz ni escribir escenas definitivas |
| G2 · Voz autorizada | Erick (alcance vigente, una toma) | llamar a ElevenLabs o a cualquier TTS |
| G3 · Visionado 1x con audio | Persona (Erick o revisor) | considerar el episodio terminado |
| G4 · Publicación | Erick | programar o publicar |

Una prueba técnica nunca aprueba la estética. Medir no equivale a escuchar ni a ver.

## Etapas

| # | Etapa | Skill / herramienta | Archivo que deja | Hecho cuando |
|---|---|---|---|---|
| 1 | Tema y ficha | `guion-erick-artificial` §0–1 + `referencias/catalogo-criterio.md` | ficha dentro del guion | No repite tema de la temporada |
| 2 | Guion + storyboard + empaque | `guion-erick-artificial` §2–6 | `planeacion/temporada-N/guiones/epNN-*.md` | Autocrítica ≥ 8 en todo → **G1** |
| 3 | Carpeta del episodio | `plantillas/episodio/` | `episodes/<id>/{episode.json, GUION-STORYBOARD.md}` | `python studio.py check <id>` pasa (con la voz ya puesta) |
| 4 | Voz | `voz-elevenlabs` (una toma, candado de voz) → **G2** | `episodes/<id>/private/voz-original.*` (fuera de Git) | Texto enviado = guion aprobado, sin etiquetas audibles |
| 5 | Nivelar + frases | `skills/mono-volumetrico/scripts/nivelar_voz.py` + `silencedetect` | `private/voz-nivelada.wav`, `frases.json` | Nº y orden de tramos = puntuación del guion |
| 6 | Escenas | `mono-volumetrico` + `VOCABULARIO-VISUAL.md` | `episodes/<id>/visual/escenas-*.js`, `preset.js` | Cada frase tiene UNA acción de objeto |
| 7 | Stills y hojas | `studio.py stills`, `scripts/hoja.py` cada 0.5 s y ±0.1 s en cortes | `build/<id>/stills/`, hojas | Prueba sin voz superada |
| 8 | Revisión visual | `revision-fidelidad-mono` §3b, §3c, §4 | `episodes/<id>/REVISION.md` | Lista de defectos vacía o aceptada (máx. 2 rondas) |
| 9 | Render | `studio.py render <id>` | `build/<id>/visual.mp4` | Decode completo |
| 10 | Sonido | `skills/mono-volumetrico/sonido/DISENO-SONORO-Y-MEZCLA.md` + cues del episodio | `build/<id>/final.mp4`, `mix-report.json` | Voz intacta, Δ por frase ≤ 0.5 dB, pico ≤ −1 dBTP |
| 11 | Verificación | `studio.py verify <id>` + `revision-fidelidad-mono` §3d | `verification.json`, `loudness.txt` | Todo pasa → **G3** |
| 12 | Empaque y salidas | `estrategia-contenido` §7, `copy-redes-ai-lab`, `social-media-skills:carousel-writer` | portada, caption, carrusel | 3 variantes evaluadas |
| 13 | Entrega | Procedimiento vigente del canal (copia limpia + SHA-256) → **G4** | recibo de limpieza | `publication_authorized` solo lo cambia Erick |

## Atajos para no repetir 15 versiones

- Escribe primero las escenas comunes (grieta, frase para copiar, remate) llamando a las de ep01. Solo el bloque «Imagina» y el objeto protagonista son nuevos.
- Haz la muestra de 0–6 s (`render.py --from 0 --to 6`) antes de escribir el resto: valida cámara, escala y color de una vez.
- Revisa con hojas por bloque, no al final. Cada error de `SKILL.md §6b` ya tiene su corrección conocida.
- El sonido sigue la familia por significado de `DISENO-SONORO-Y-MEZCLA.md`. Reutiliza familias y no inventes timbres por episodio. Menos eventos que ep01 (63) hasta que el A/B de V14/V15 diga lo contrario.

## Limitaciones actuales del pipeline (ver `docs/BACKLOG.md`)

- `studio.py stills` usa tiempos de chilaquiles y `audio/cues.py` contiene la hoja de chilaquiles. Hasta que se refactoricen, un episodio nuevo necesita sus propios tiempos de *stills* y su propia hoja de cues. No reutilices la de ep01 cambiando solo el título.
