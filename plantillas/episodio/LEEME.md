# Plantilla de episodio

Para empezar un episodio nuevo después de G1 (guion aprobado):

1. Crea `episodes/<id>/` (`<id>` en minúsculas, con guiones, p. ej. `fonda-promedio`).
2. Copia `episode.json` y llénalo. `duration` se fija con la toma real de voz (≤ 90 s); `studio.py` rechaza 0.
3. Copia el guion aprobado de `planeacion/temporada-N/guiones/` a `episodes/<id>/GUION-STORYBOARD.md` y márcalo como aprobado, con fecha y quién aprobó.
4. Crea `episodes/<id>/visual/preset.js` con `window.MONO_PRESET = 'erick-artificial-negro';`.
5. Pon la voz autorizada (G2) en `episodes/<id>/private/` (excluida de Git), nivélala con `skills/mono-volumetrico/scripts/nivelar_voz.py` y genera `frases.json`.
6. Escribe `visual/escenas-*.js` con el vocabulario visual y las escenas comunes de ep01.
7. Sigue `skills/episodio-erick-artificial/SKILL.md` desde la etapa 7.

Recuerda: hoy `studio.py stills` y `audio/cues.py` siguen fijos para chilaquiles (ver `docs/BACKLOG.md`). Un episodio nuevo necesita sus propios tiempos de *stills* y su propia hoja de cues.
