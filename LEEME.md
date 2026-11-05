# Erick Artificial · paquete de estrategia, investigación y temporada 1

Preparado por Claude el 5 de noviembre de 2026. **Todo es propuesta para que Erick la apruebe**: no se generó voz, render ni publicación, y no cambia el guion aprobado de chilaquiles ni el motor.

## Empieza por aquí

| # | Archivo | Para qué |
|---|---|---|
| 1 | `docs/ESTRATEGIA-CONTENIDO.md` | Diagnóstico, posicionamiento, audiencia, pilares, formato «¿Respondió bien?», empaque, distribución, métricas, plan de 90 días y análisis de tendencias (§12) |
| 2 | `docs/INVESTIGACION-TENDENCIAS.md` | Método, consultas, hallazgos con fuente y confiabilidad, filtro de tendencias, decisiones y límites |
| 3 | `planeacion/temporada-1/CALENDARIO.md` | 13 piezas del 12 nov al 1 feb, con fechas, pilar y frase |
| 4 | `planeacion/temporada-1/guiones/` | **12 guiones completos nuevos** (especial Buen Fin + ep02–ep12), cada uno con ficha, guion, storyboard, riesgos y empaque |
| 5 | `docs/DIRECCION-ANIMACION.md` | Tipo de animación, especificaciones, plantilla por bloque, objetos nuevos y control de calidad |
| 6 | `docs/DIRECCION-VOZ.md` | Voz (persona, tono, ritmo, generación de una sola toma, nivelación), sonido y transparencia |
| 7 | `docs/PROCESO.md` | Cómo se hizo esto y cómo se produce un episodio (puertas G1–G4, semana tipo, ciclo de mejora) |
| 8 | `docs/MAPA-DE-SKILLS.md` | Qué skill usar en cada etapa y cuáles no |

## Skills nuevas

- `skills/guion-erick-artificial/`: escribir y evaluar guiones del canal, más `referencias/catalogo-criterio.md` (temas).
- `skills/episodio-erick-artificial/`: producción de punta a punta con puertas humanas.
- `skills/mono-volumetrico/VOCABULARIO-VISUAL.md`: qué objeto representa cada concepto.

## Otros

- `planeacion/temporada-1/empaque-ep01-chilaquiles.md`: portadas, caption, bio, LinkedIn y carrusel del ep01.
- `planeacion/temporada-1/BRIEFS.md`: resumen de ep06–12 y temas de reserva.
- `plantillas/episodio/`: arranque de un episodio nuevo.
- `docs/BACKLOG.md` (sección nueva): 7 pendientes técnicos para producir más rápido.

## Guiones

| Pieza | Archivo | Palabras | Duración est. |
|---|---|---|---|
| Especial Buen Fin | `ep-especial-buen-fin.md` | 128 | ~46 s |
| Ep02 fonda / promedio | `ep02-fonda-promedio.md` | 135 | ~49 s |
| Ep03 estética / quién no aparece | `ep03-estetica-encuesta.md` | 129 | ~47 s |
| Ep04 te da la razón | `ep04-domingos-razon.md` | 126 | ~46 s |
| Ep05 quincena / causa | `ep05-quincena-causa.md` | 133 | ~48 s |
| Ep06 diciembre / contexto | `ep06-diciembre-precios.md` | 132 | ~48 s |
| Ep07 fuente no encontrada | `ep07-propositos-fuente.md` | 146 | ~53 s |
| Ep08 rosca / muestra chica | `ep08-rosca-muestra.md` | 138 | ~50 s |
| Ep09 % vs cantidad | `ep09-linea-porcentaje.md` | 120 | ~43 s |
| Ep10 pregunta cargada | `ep10-taqueria-pregunta.md` | 130 | ~47 s |
| Ep11 meseros / tamaño | `ep11-meseros-turnos.md` | 123 | ~44 s |
| Ep12 libreta de criterio | `ep12-libreta-criterio.md` | 113 | ~55 s con pausas entre páginas |

## Decisiones pendientes de Erick

1. **Urgente:** ¿se hace el especial Buen Fin? Requiere guion aprobado y voz autorizada a más tardar el sábado 7 de noviembre; si no, sale como carrusel.
2. Aprobar o corregir los guiones (al menos los 2 siguientes siempre por delante).
3. Validar los supuestos marcados ⚠︎: audiencia, cadencia, PDF con DM automático.
4. Declarar la voz con IA en la bio o en las etiquetas de plataforma (recomendado).
5. Confirmar la skill vigente: `content-motion-studio` (citada en `AGENTS.md`) o `estudio-motion`.
6. Dar acceso a la PC para analizar creadores y referencias con `hypit` / `watch`.

## Cómo subirlo al repo

Desde una copia actualizada de `main`:

```
git checkout -b claude/estrategia-contenido
git am 0001-*.patch 0002-*.patch 0003-*.patch
git push -u origin claude/estrategia-contenido
```

O descomprime las carpetas `docs/`, `skills/`, `planeacion/` y `plantillas/` y los archivos `README.md` y `AGENTS.md` sobre la raíz del repo, y haz tu propio commit.
