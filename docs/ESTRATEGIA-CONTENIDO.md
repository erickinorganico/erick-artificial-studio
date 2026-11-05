# Estrategia de contenido · Erick Artificial

Propuesta preparada por Claude el 5 de noviembre de 2026 a partir de una revisión completa del repositorio (motor, guion, escenas, sonido, revisiones V14/V15 y backlog). **Es una propuesta para que Erick la apruebe o corrija; no es una decisión tomada ni autoriza voz, gastos ni publicación.** Los supuestos que todavía hay que validar están marcados con ⚠︎.

---

## 1. Diagnóstico del repo

| Lo que ya está muy bien | Lo que impide volverse referente |
|---|---|
| Una idea de canal clara y poco común: *la IA contó bien, pero ¿respondió bien?* | No había estrategia escrita: ni audiencia, ni pilares, ni formato de serie, ni calendario. |
| Lenguaje visual propio: fondo negro, objetos volumétricos y color con significado fijo. | Un episodio de 45 s costó 15 versiones (V1–V15). A ese ritmo no hay constancia, y sin constancia no hay referente. |
| Rigor: la hipótesis se marca como hipótesis, no se tacha un dato correcto, se declaran los límites. | Todo es específico de chilaquiles: escenas, tiempos de *stills*, cues de sonido. Cada pieza nueva arranca casi de cero. |
| La «frase para copiar» al final: un activo útil que la gente puede guardar. | No hay skill de guion del canal; las skills de guion disponibles son de otros canales (comedia de Casi Terrícolas, Labi & Beto, comerciales). |
| Verificación técnica reproducible (sonido, mux, hashes). | Aprendizaje, retención y comprensión no se han medido nunca. |

**Conclusión:** la calidad ya está. Lo que falta es **convertir el episodio de chilaquiles en un formato repetible** y producir con constancia. Este documento define el formato; las skills nuevas (`skills/guion-erick-artificial`, `skills/episodio-erick-artificial`) y el vocabulario visual (`skills/mono-volumetrico/VOCABULARIO-VISUAL.md`) lo vuelven ejecutable.

---

## 2. Posicionamiento

**Erick Artificial enseña criterio para usar la IA con tus propios datos.**

Tesis del canal (la frase que todo episodio demuestra):

> **La IA casi nunca falla en la cuenta. Falla cuando nadie revisa si la cuenta responde la pregunta.**

### El hueco en el nicho

El contenido de IA en español se concentra en cuatro cosas: herramientas nuevas, «prompts mágicos», noticias y miedo («te va a reemplazar»). Casi nadie enseña, con claridad y buen diseño, **cuándo no creerle a la IA**, con ejemplos de la vida diaria en México. Ese es el territorio.

**Ser referente significa:** ser a quien la gente piensa cuando le surge la duda *«¿esto que me dijo la IA está bien?»*. No competir por ser el que más herramientas conoce.

### Por qué es defendible (el foso)

1. **Un concepto propio con nombre.** La franquicia «¿Respondió bien?» y la idea de *criterio de IA*. Cada episodio repite la misma pregunta, así que el público aprende a hacérsela solo.
2. **Un código visual que el público aprende.** Ámbar = *lo que el dato no sabe*. Rojo y verde = las dos categorías que se comparan, nunca «bien» o «mal». Después de 5–6 episodios, el ámbar ya se lee sin narración. Es marca, no decoración.
3. **Un activo que crece con cada episodio.** Cada pieza deja una pregunta para copiar. Doce episodios forman **«La libreta de criterio»**, un lead magnet que ningún competidor tiene.
4. **Ejemplos cotidianos de México.** Chilaquiles, fonda, estética, quincena, rosca de reyes. Son fáciles de reconocer y de compartir, y no dependen de herramientas que caducan.
5. **Confianza por rigor.** Cifras ilustrativas declaradas, sin hype ni promesas. En un nicho lleno de exageración, la sobriedad se nota.
6. **Acceso real (a partir del mes 2–3).** Casos de negocios de alumnos de AI Lab School, con permiso y anonimizados ⚠︎.

---

## 3. Audiencia

⚠︎ Supuesto a validar con Erick y con los primeros comentarios.

| | Primaria | Secundaria |
|---|---|---|
| Quién | Dueños y encargados de negocios pequeños en México (fonda, tienda, estética, servicios, e-commerce chico) que ya usan ChatGPT, Gemini o Copilot con su Excel o sus ventas | Profesionistas que analizan datos sin ser analistas (administración, contabilidad, marketing junior) y docentes o estudiantes |
| Edad | 25–50 | 20–45 |
| Dolor que ya siente | «Ya uso IA, pero no sé si confiar en lo que me dice, y decido con eso». | «Me piden conclusiones con datos y la IA me da respuestas que suenan seguras». |
| Deseo | Decidir mejor sin volverse analista | Verse competente y no hacer el ridículo con una conclusión falsa |
| Cómo consume | Reels, TikTok y Shorts, muchas veces **sin sonido**; LinkedIn en horario laboral | Igual, más YouTube y LinkedIn |

**Implicación de diseño.** La «prueba sin voz» que ya exige `revision-fidelidad-mono §3c` es justo lo que necesita un público que ve con el sonido apagado. Se mantiene como regla dura: si el episodio no se entiende en mudo, no está listo.

---

## 4. Pilares de contenido

| # | Pilar | Qué enseña | Peso |
|---|---|---|---|
| P1 | **¿Respondió bien?** | Razonamiento con datos: la cuenta está bien y la conclusión no (ventas ≠ preferencias, promedio vs. caso típico, sobrevivientes, correlación, muestra chica, % vs. absoluto, comparar contra qué, tamaños distintos). | 55 % |
| P2 | **Te dio por tu lado** | Cómo se comportan los modelos: te dan la razón, inventan fuentes, se inclinan por cómo está hecha la pregunta, recomiendan sin el contexto de tu negocio. | 25 % |
| P3 | **Pregúntale mejor** | La pregunta o el prompt de criterio, en piezas derivadas: carrusel, post de texto, historia con encuesta. | 15 % |
| P4 | **Casos reales** | Un negocio real, con datos reales y permiso, aplicando una pregunta de la libreta. A partir del mes 2–3. ⚠︎ | 5 % → 15 % |

Fuera de alcance: noticias de IA, listas de herramientas, tutoriales de una app concreta, miedo al reemplazo y contenido político. Restan foco y caducan.

---

## 5. El formato fijo: «¿Respondió bien?»

Sale de la estructura del episodio de chilaquiles, que ya se probó en producción. **Siempre son los mismos 7 tiempos**, en 45–60 s y con 120–160 palabras (ritmo medido de la voz: 2.8 palabras/s).

| # | Tiempo | Bloque | Qué pasa | Firma |
|---|---|---|---|---|
| 1 | 0–3 s | **Pregunta** | «Le pregunté a la IA: «…»». Una pregunta de negocio concreta. En pantalla, las dos opciones o el objeto en ≤ 0.5 s. | Arranque de franquicia |
| 2 | 3–9 s | **Cuenta** | La IA usa un dato real y da una conclusión que suena bien. | Número héroe |
| 3 | 9–12 s | **Grieta** | «[Verbo] bien. Pero ¿respondió bien?». ✓ sobre el dato; se corta el vínculo dato → conclusión; «?» ámbar. | **Frase firma** |
| 4 | 12–25 s | **Imagina** | Una sola hipótesis concreta, con una persona, que muestra que el mismo dato es compatible con otra realidad. Todo en ámbar y con «imagina» en pantalla. | Ámbar |
| 5 | 25–35 s | **Regla** | Qué pregunta sí responde el dato y qué falta para la otra. Sin sermón. | Dos preguntas, dos fuentes |
| 6 | 35–42 s | **Frase para copiar** | «Antes de pedirle conclusiones a la IA, agrega: «…»». Fondo negro, serif grande, de una en una. | **Activo guardable** |
| 7 | 42–45 s | **Remate** | Humor personal de Erick, con callback al inicio. La frase sigue arriba, legible. | Persona |

### Reglas del formato

- Una sola enseñanza por episodio. Si caben dos, son dos episodios.
- La cuenta de la IA **siempre es correcta**. El error está en la pregunta, en el contexto o en la conclusión. Así se protege la tesis y se evita el «la IA es tonta».
- El ejemplo es hipotético y se dice: «Imagina». No se atribuyen datos a negocios reales.
- La frase para copiar es una **pregunta que se pega tal cual en el prompt**. Se escribe también en el *caption* para que se pueda copiar.
- El remate puede variar de forma, pero siempre es Erick hablando como persona, no como profesor.
- Los episodios de P2 adaptan la grieta («Las dos suenan bien. ¿Cuál respondió bien?») sin perder el patrón.

---

## 6. Empaque

Por cada episodio se entregan **3 variantes** (título de portada + concepto visual) y se elige con el checklist de `estrategia-contenido §7`: curiosidad, payoff claro, especificidad y encaje con la plataforma.

- **Portada:** fondo negro, el dato héroe en sans grande y la grieta en serif itálica; un solo acento de color. Fórmula base: «La IA [verbo] bien. ¿Respondió bien?». Variantes con el objeto: «80 rojos ≠ 80 que prefieren rojos».
- **Primer cuadro = portada.** Que el segundo 0 ya funcione como miniatura.
- **Caption:** gancho (1 línea) → la frase para copiar escrita literal → pregunta de comprensión → CTA.
- **Pregunta de comprensión en comentarios** (p. ej. «¿Qué dato le faltaba a la IA?»). Engancha y además **resuelve el pendiente del backlog de medir comprensión real**: el % de respuestas correctas es la métrica de aprendizaje.
- **CTA por fase:**
  - Episodios 1–8: «Guárdalo para tu próximo prompt» + la pregunta de comprensión.
  - Desde el 9: «Comenta LIBRETA y te mando las preguntas de criterio» ⚠︎ (requiere automatización de DM y un PDF aprobado).
  - Nunca «mándaselo a alguien».

---

## 7. Distribución

| Canal | Qué se publica | Notas |
|---|---|---|
| Instagram Reels | Episodio + carrusel derivado + historia con encuesta | Canal principal. Carrusel de 6 láminas sacadas de los *stills* (pregunta, cuenta, grieta, imagina, regla, frase). |
| TikTok | Episodio | Mismo archivo; el texto esencial ya está en pantalla. |
| YouTube Shorts | Episodio | Título = la pregunta del episodio. Acumula búsqueda: «¿la IA se equivoca con Excel?». |
| LinkedIn (cuenta personal de Erick) | Video nativo + post de texto con la frase | Aquí está la audiencia de dueños y profesionistas. La cuenta personal rinde más que la de marca (`estrategia-contenido §10`). |

**Cadencia propuesta** ⚠︎:

- **Semanas 1–4:** 1 episodio por semana + 2 derivados (carrusel y post P3).
- **Semanas 5–12:** 2 episodios por semana, solo si el pipeline llega a ≤ 1.5 días por episodio (ver §9).
- Siempre con **2 episodios de colchón aprobados** antes de publicar el siguiente.

---

## 8. Métricas

| Nivel | Métrica | Por qué |
|---|---|---|
| Estrella polar | **Guardados + compartidos por cada 1,000 vistas** | Mide si la frase para copiar es útil, que es el activo del canal. |
| Gancho | Retención a 3 s | Valida la pregunta inicial y el primer cuadro. |
| Historia | % que ve completo y curva de retención (dónde cae) | Cada caída se mapea a un bloque del formato. |
| Aprendizaje | % de respuestas correctas a la pregunta de comprensión | La prueba de comprensión real que pide el backlog. |
| Crecimiento | Seguidores por cada 1,000 vistas | Calidad de la audiencia. |
| Negocio | DMs o clics hacia AI Lab School / libreta descargada | Conecta vistas con producto (`estrategia-contenido §9`). |

**Ciclo de aprendizaje:** después de 6 episodios se fija una línea base. Cada lunes: dónde cayó la retención → qué bloque fue → hipótesis → se aplica en el siguiente guion → se compara. No se fijan metas numéricas antes de tener línea base: serían inventadas.

---

## 9. Sistema de producción: de 15 versiones a 3

Ser referente requiere constancia, y la constancia requiere que un episodio no cueste 15 versiones. La meta es **1 guion aprobado + ≤ 2 rondas visuales + 1 ronda de sonido.**

| Palanca | Qué cambia | Dónde |
|---|---|---|
| Formato fijo | El guion ya llega con la estructura de 7 bloques; no se reinventa | `skills/guion-erick-artificial` |
| Vocabulario visual | Cada concepto de criterio ya tiene su objeto y su relación | `skills/mono-volumetrico/VOCABULARIO-VISUAL.md` |
| Escenas comunes | Grieta, frase para copiar y remate como funciones reutilizables | Backlog técnico (§10) |
| Cues declarativos | Sonido por manifiesto por episodio, no en código | Backlog técnico (§10) |
| Puertas claras | Guion → aprobación → voz autorizada → escenas → revisión → sonido → verificación → empaque | `skills/episodio-erick-artificial` |
| Plantilla de episodio | `episode.json`, brief, guion y empaque listos para llenar | `plantillas/episodio/` |

**Semana tipo** (1 episodio):

- **Lunes:** guion y aprobación de Erick.
- **Martes:** voz (una toma, con autorización explícita) y `frases.json`.
- **Miércoles:** escenas y *stills*.
- **Jueves:** revisión con hojas, corrección y sonido.
- **Viernes:** verificación, copia limpia, empaque y programación con autorización.

---

## 10. Pendientes técnicos que bloquean la escala

Registrados también en `docs/BACKLOG.md`, en orden de prioridad:

1. Las fracciones de *stills* están fijas para chilaquiles en `studio.py` (`0,7.3,14.7,…`) → leerlas de `episode.json`.
2. `audio/cues.py` es la hoja de chilaquiles → manifiesto por episodio (`episodes/<id>/cues.py` o JSON declarativo). El backlog lo condicionaba a «cuando exista una segunda pieza concreta», y ya existe: ep02.
3. `audio/{cues,mezclar,sfxlib}.py` y `skills/mono-volumetrico/sonido/*` son copias idénticas → una sola fuente.
4. Escenas comunes reutilizables (grieta, frase, remate, `stacks`/`counts`, `chip`) → `skills/mono-volumetrico/assets/escenas-comunes.js`.
5. Componentes nuevos del vocabulario: balancín (promedio), puerta (sobrevivientes), tarjeta de calendario (confusor), plano inclinado (pregunta cargada).
6. `AGENTS.md` menciona la skill `content-motion-studio`, que no aparece entre las skills sincronizadas; la equivalente es `estudio-motion`. Confirmar cuál es la vigente.

---

## 11. Plan de 90 días

| Fase | Semanas | Objetivo | Entregables |
|---|---|---|---|
| 0 · Cierre | 0 | Publicable el ep01 | Cerrar los pendientes del backlog de chilaquiles (visionado 1x, A/B de sonido, cifras), aprobar guiones 02–03 y crear las cuentas o bios con el posicionamiento. |
| 1 · Formato | 1–4 | Probar el formato con 4 episodios | Ep01–04 + derivados; línea base de métricas tras el ep04; refactor de cues y *stills*. |
| 2 · Ritmo | 5–8 | Subir a 2 episodios por semana si el pipeline lo permite | Ep05–08; escenas comunes; primera prueba A/B de gancho (2 portadas, mismo cuerpo). |
| 3 · Activo | 9–12 | Convertir la serie en activo | Ep09–12; «La libreta de criterio» (PDF con las 11 preguntas) ⚠︎; primer caso real P4 ⚠︎; revisión de temporada. |

Calendario y guiones: `planeacion/temporada-1/`.

---

## 12. Lo que no haremos

- Hype, miedo o promesas («duplica tus ventas con IA»).
- Atribuir datos a negocios o personas reales sin permiso.
- Usar rojo o verde como correcto o incorrecto.
- Robots, terminales, pixel art o presentador recortado (regla vigente del canal).
- Copiar ideas de otros creadores. De los referentes se toman principios, nunca ideas ni tomas.
- Afirmar comprensión o retención sin medirlas.
