# Mapa de skills · qué usar en cada etapa

Hay muchas skills instaladas (repo, PC de Erick y plugins). Este mapa fija **cuáles sí** y **cuáles no** para Erick Artificial, y explica por qué. La línea de producción completa está en `skills/episodio-erick-artificial/SKILL.md`.

## Usar

| Etapa | Skill principal | De apoyo | Notas |
|---|---|---|---|
| Estrategia, ideas y temporada | `docs/ESTRATEGIA-CONTENIDO.md` | `estrategia-contenido` (ángulos §5, empaque §7, hooks §8), `social-media-skills:audience-research`, `social-media-skills:competitor-analysis` | De los referentes se extraen principios, no ideas. |
| Guion y storyboard | **`skills/guion-erick-artificial`** (nueva, del canal) | `escritura-guiones-ai-lab` (solo gancho, diagnóstico del remate y autocrítica) | Catálogo de temas en `referencias/catalogo-criterio.md`. |
| Orquestación del episodio | **`skills/episodio-erick-artificial`** (nueva) | `estudio-motion` (método brief → crítica, no su stack) | Puertas G1–G4. |
| Voz | `voz-elevenlabs` | `skills/mono-volumetrico/scripts/nivelar_voz.py` | Solo con autorización vigente de Erick, una toma. |
| Animación | **`skills/mono-volumetrico`** | `skills/mono-volumetrico/VOCABULARIO-VISUAL.md` (nuevo) | Motor propio Canvas; preset `erick-artificial-negro`. |
| Sonido | `skills/mono-volumetrico/sonido/` | — | SFX procedurales; sin música salvo petición. |
| Revisión | **`skills/revision-fidelidad-mono`** | — | §3b–3d y §4. Los umbrales de §2 son del preset blanco: no aplican al canal. |
| Caption y textos | `copy-redes-ai-lab` | `social-media-skills:caption-writer` | Español de México; la frase para copiar va literal en el caption. |
| Carrusel derivado | `social-media-skills:carousel-writer` | stills de `studio.py stills` / `hoja.py` | 6 láminas con los bloques del formato. |
| Portada | `estrategia-contenido` §7 | `social-media-skills:thumbnail-design` | Fondo negro, una sola tinta de acento. |
| LinkedIn | `post-writer` / `post-formatter` | `hook-generator` (solo LinkedIn) | Cuenta personal de Erick. |
| Publicar | `publicar-redes-ai-lab` | — | Solo con G4 (autorización explícita). |
| Métricas | `auditoria-redes-ai-lab` | `windsor-ai:social-report` (si están conectadas las cuentas) | Estrella polar: guardados + compartidos / 1,000 vistas. |

## No usar en este canal (y por qué)

| Skill | Motivo |
|---|---|
| `guion-animacion-educativa`, `guion-casi-terricolas`, `guiones-labi-beto` | Otro tono (comedia de personajes) y otro público. |
| `episodio-2d-*`, `preparar/dirigir/producir-animacion-educativa`, `episodio-animado-express` | Motor 2D de bustos con personajes; el canal no tiene personajes ni presentador. |
| `stickman-animation-*`, `el-hubiera-*` | Otro canal y otro estilo. |
| `animacion-lego-3d`, `lego-*`, `ciudad-lego-fondos` | Blender/brickfilm; no es el lenguaje volumétrico minimalista. |
| `director-de-foto-ia`, Higgsfield, Kling, Veo, Runway | Video generativo: rompe el control semántico del color y el rigor (y gasta créditos). |
| `historia-*` | Collage histórico, otro formato. |
| `estudio-motion` como stack (HyperFrames/Remotion) | El canal ya tiene motor propio verificado; de esa skill se toma solo el método. |
| SFX de ElevenLabs | Gasta créditos; el canal usa síntesis procedural declarada. |

## Pendiente de confirmar

`AGENTS.md` dice «Usar content-motion-studio para producción», pero esa skill no aparece entre las sincronizadas. La más parecida es `estudio-motion`. Erick decide cuál es la vigente y se corrige `AGENTS.md`.
