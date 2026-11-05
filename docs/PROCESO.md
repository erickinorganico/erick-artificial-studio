# Proceso · cómo se hizo esta estrategia y cómo se produce un episodio

## 1. Cómo se hizo (5 nov 2026)

1. **Revisión completa del repo.** README, AGENTS, docs (arquitectura, procedencia, verificación, revisión V14, entrega V15, backlog), guion y storyboard de chilaquiles, `frases.json`, `episode.json`, las dos skills (`mono-volumetrico`, `revision-fidelidad-mono`), motor JS (núcleo, materiales, relieve, tipografía, preset), escenas a/b/c, scripts de render, revisión y audio, CLI `studio.py` y tests.
2. **Diagnóstico.** Calidad alta, pero 15 versiones por pieza, todo atado a chilaquiles, sin estrategia ni skill de guion. Duplicados: `audio/` = `skills/mono-volumetrico/sonido/`; los tiempos de *stills* de `studio.py` están fijos para ese episodio.
3. **Calibración.** El ritmo real de la voz (2.77 palabras/s) es la base de todas las duraciones.
4. **Inventario de skills.** Se revisaron las skills del repo, las sincronizadas de Erick y las de los plugins, y se mapeó cuáles sirven al canal (`MAPA-DE-SKILLS.md`).
5. **Estrategia.** Con el método de `estrategia-contenido`: 4 preguntas de marca → posicionamiento → pilares → formato → empaque → distribución → métricas → plan.
6. **Investigación de tendencias.** Búsqueda web + filtro `trend-jacking` (`INVESTIGACION-TENDENCIAS.md`); ajustes al calendario.
7. **Guiones.** Con la nueva skill `guion-erick-artificial` (que adapta `escritura-guiones-ai-lab`): ficha → 7 bloques → storyboard «objeto → relación» → empaque → autocrítica. Aritmética verificada y palabras contadas.
8. **Lo que NO se hizo:** voz, render, publicación, gastos, cambios al guion aprobado de chilaquiles, cambios al motor. `hypit` y `watch` no estaban disponibles (viven en la PC de Erick).

## 2. Cómo se produce un episodio (resumen de `skills/episodio-erick-artificial`)

```
Tema (catálogo) → Guion + storyboard + empaque → [G1 Erick aprueba]
→ [G2 Erick autoriza voz] → Voz (1 toma, voz-elevenlabs) → Nivelar + frases.json
→ Escenas (mono-volumetrico + vocabulario) → Muestra 0–6 s → Hojas + prueba sin voz
→ Revisión (revision-fidelidad-mono, ≤ 2 rondas) → Render → Sonido → Verify
→ [G3 visionado 1x con audio] → Empaque (portada, caption, carrusel)
→ Copia limpia + SHA-256 → [G4 Erick autoriza publicación] → Publicar
```

| Puerta | Quién | Bloquea |
|---|---|---|
| G1 · guion aprobado | Erick | voz y escenas definitivas |
| G2 · voz autorizada | Erick | cualquier llamada a ElevenLabs o TTS |
| G3 · visionado 1x con audio | persona | dar por terminado el episodio |
| G4 · publicación | Erick | programar o publicar |

## 3. Semana tipo (1 episodio por semana)

| Día | Qué | Quién decide |
|---|---|---|
| Lunes | Publicar el episodio de la semana anterior · aprobar el guion N+2 (G1) | Erick |
| Martes | Voz del episodio N+1 (G2) · nivelación · `frases.json` | Erick autoriza |
| Miércoles | Escenas + muestra + hojas · carrusel del episodio publicado | — |
| Jueves | Revisión (≤ 2 rondas) · render · sonido | — |
| Viernes | Verify · visionado (G3) · empaque · post P3 + historia con encuesta · métricas de la semana | Erick (G3/G4) |

**Colchón:** siempre 2 guiones aprobados por delante. **Carril rápido** para estacionales: reutilizar escenas comunes y, si no llega, carrusel.

## 4. Ciclo de mejora

Cada viernes:

1. Leer la retención (dónde cae) → ubicar el bloque del formato → hipótesis → aplicarla en el siguiente guion.
2. Leer el % de respuestas correctas a la pregunta de comprensión.
3. Anotar en `planeacion/temporada-1/CALENDARIO.md` qué se cambió y por qué.

Cada 4 semanas, revisar la cadencia (¿≤ 1.5 días por episodio?) y el backlog técnico.
