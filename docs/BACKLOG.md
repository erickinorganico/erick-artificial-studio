# Pendientes de mejora

- [ ] Revisar el video completo a velocidad normal con audio, sin confundir reproducción técnica con evaluación perceptiva.
- [ ] Evaluar si 63 sonidos/~48 eventos ayudan o distraen; A/B con V14, en móvil/auriculares/mono. Ratchets, sello e impresora son puntos señalados por Claude.
- [ ] Confirmar cifras, ausencia de etiquetas vocales audibles y naturalidad de «respondió».
- [ ] Mejorar rótulo cliente y solapes en 16.4s/20s; comprobar aprendizaje con una prueba de comprensión real.
- [ ] Refactorizar cues específicos a un manifiesto declarativo por episodio cuando exista una segunda pieza concreta.
- [ ] Añadir cierre de metadatos portable antes de automatizar cualquier entrega publicable; hoy se conserva procedimiento externo del canal.
- [ ] Validar instalación limpia de dependencias/fuentes en otra máquina. No presentar rangos de requirements como lock reproducible exacto.

## Escala de producción (añadido con la estrategia, 5 nov 2026)

Prioridad para pasar de 15 versiones a ≤ 3 por episodio (ver `docs/ESTRATEGIA-CONTENIDO.md §9–10`):

- [ ] `studio.py stills`: leer los tiempos de `episode.json` (hoy fijos para chilaquiles: `0,7.3,14.7,19.6,30,40`).
- [ ] Cues por episodio: mover la hoja de `audio/cues.py` a `episodes/<id>/` (manifiesto declarativo). La condición «segunda pieza concreta» ya se cumple: ep02 en `planeacion/temporada-1/guiones/`.
- [ ] Una sola fuente de sonido: `audio/{cues,mezclar,sfxlib}.py` son copias idénticas de `skills/mono-volumetrico/sonido/`.
- [ ] `skills/mono-volumetrico/assets/escenas-comunes.js`: grieta, frase para copiar, dos preguntas, remate, `chip`, `stacks`, `counts` (extraídos de ep01).
- [ ] Componentes nuevos reutilizables: `E.balance` (ep02), `E.door` (ep03), `E.ramp` (ep04), `E.calendarCard` (ep05). Ver `VOCABULARIO-VISUAL.md`.
- [ ] Confirmar si la skill vigente es `content-motion-studio` (citada en `AGENTS.md`) o `estudio-motion`.
- [ ] Medir comprensión con la pregunta de comprensión de cada episodio (comentarios o encuesta), según la estrategia §8.

No se afirma fidelidad idéntica a Alyxia, cero errores, aprobación del export o mejora de retención medida. No hay publicación/programación registrada por crear este repo.
