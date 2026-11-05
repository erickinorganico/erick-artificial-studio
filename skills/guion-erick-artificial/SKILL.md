---
name: guion-erick-artificial
description: Úsala al idear, escribir, reescribir o evaluar un guion del canal Erick Artificial (serie «¿Respondió bien?»: criterio para usar la IA con datos). Entrega guion + storyboard «objeto → relación» listo para mono-volumetrico, más empaque. No sirve para otros canales (Casi Terrícolas, Labi & Beto, El Hubiera, comerciales AI Lab).
---

# Guion · Erick Artificial

Formato fijo del canal, derivado del episodio aprobado de chilaquiles (`episodes/chilaquiles/GUION-STORYBOARD.md`). Estrategia y audiencia: `docs/ESTRATEGIA-CONTENIDO.md`. Catálogo de temas: `referencias/catalogo-criterio.md`. Vocabulario visual: `../mono-volumetrico/VOCABULARIO-VISUAL.md`.

Un guion escrito con esta skill es una **propuesta para revisión humana**. Antes de generar voz se necesita la aprobación de Erick y una autorización vigente.

## 0. Antes de escribir

1. Lee `planeacion/temporada-*/CALENDARIO.md` y los guiones ya aprobados. No repitas enseñanza, negocio, objeto protagonista ni remate.
2. Elige un tema del catálogo o propón uno nuevo con su ficha completa (§1).
3. Define en una línea cada uno:
   - **Enseñanza:** qué debe poder decir el espectador al final. Ejemplo: «las ventas muestran compras; para preferencias necesito más contexto».
   - **Pregunta a la IA:** una pregunta de negocio que alguien sí haría.
   - **Cuenta correcta:** el cálculo que la IA hace bien.
   - **Grieta:** por qué esa cuenta no responde esa pregunta.
   - **Hipótesis:** el «imagina» con una persona concreta.
   - **Frase para copiar:** una pregunta corta para pegar en el prompt.
   - **Remate:** humor personal de Erick con callback.
4. Genera 3 ángulos (negocio + hipótesis + remate distintos). Elige uno y justifícalo con tres criterios: identificable, novedoso y simple de dibujar con el vocabulario visual.

## 1. Ficha del tema (obligatoria)

| Campo | Regla |
|---|---|
| Pilar | P1 ¿Respondió bien? · P2 Te dio por tu lado · P3 Pregúntale mejor · P4 Caso real |
| Error de criterio | Uno solo del catálogo (o uno nuevo, nombrado) |
| Negocio / escena | Cotidiano en México; sin marcas ni negocios reales |
| Cifras | Ilustrativas, redondas, coherentes entre sí (verifica la aritmética) y declaradas como ejemplo |
| Objeto protagonista | Del vocabulario visual o componente nuevo **reutilizable** (anótalo) |
| Colores | Rojo/verde = las dos categorías comparadas (si las hay) · ámbar = lo que el dato no contiene o la hipótesis · blanco = dato registrado |

## 2. Estructura (7 bloques, 45–60 s, 120–160 palabras)

Ritmo de la voz medido en ep01: **2.8 palabras/s**. Cuenta las palabras y anota la duración estimada.

1. **Pregunta (0–3 s).** «Le pregunté a la IA: «…»». La pregunta tiene que verse en pantalla en ≤ 0.5 s, con el objeto o las dos opciones. Nada de saludos, definiciones ni «¿sabías que…?».
2. **Cuenta (3–9 s).** «Revisó mi [fuente]: [dato]. «[Conclusión]», respondió.» Un número héroe.
3. **Grieta (9–12 s).** «[Contó/Calculó/Comparó] bien. Pero ¿respondió bien?». Es la frase firma: no la cambies salvo en P2, donde se permite «Las dos suenan bien. ¿Cuál respondió bien?».
4. **Imagina (12–25 s).** «Imagina que…». Una sola persona o un solo caso que hace visible lo que el dato no registra. Usa una trayectoria visible, no una abstracción.
5. **Regla (25–35 s).** Dos preguntas, dos fuentes: «Si quieres saber X, [lo que el dato sí da]. Si quieres saber Y, [lo que falta]». Sin sermón ni «es importante que…».
6. **Frase para copiar (35–42 s).** «Antes de pedirle conclusiones a la IA, agrega: «…»». Una o dos preguntas cortas (≤ 8 palabras cada una), que funcionen pegadas tal cual en cualquier prompt.
7. **Remate (42–45 s).** Erick como persona, con callback al objeto o la escena del inicio, humor seco y la palabra clave al final. Puede romper la cuarta pared. No repitas la forma del remate del episodio anterior.

## 3. Reglas de redacción

- Español de México, frases cortas para el oído. Una idea por línea.
- «La IA», nunca el nombre de un producto (ni ChatGPT ni Gemini). No se acusa a una herramienta real.
- **La cuenta de la IA siempre es correcta.** No se tacha ni se altera el número en ningún momento.
- Lo hipotético se dice: «Imagina…». No se afirma que en la realidad pasó.
- No se promete aprendizaje, ventas ni resultados.
- Ningún término técnico sin traducir. Ejemplos: «mediana» → «el de en medio»; «sesgo de supervivencia» → «quién no aparece». El nombre técnico, si aparece, va en el caption, no en la voz.
- Números: en la voz, escritos como se pronuncian («ochenta», «ciento ochenta pesos»); en pantalla, en cifra.
- Sin etiquetas de emoción dentro del texto destinado a TTS (riesgo detectado en V14: que se oigan).
- Sin CTA dentro de la voz. El CTA va en el caption.

## 4. Storyboard (formato de entrega)

Tabla con estas columnas: `Tiempo estimado | Voz | Objeto → relación que explica | Texto esencial en pantalla | Color y su significado`.

- Por cada fila, completa «objeto → qué relación explica». Si al quitar la voz no se entiende, simplifica (prueba sin voz, `revision-fidelidad-mono §3c`).
- ≤ 1 bloque de texto visible a la vez; nunca subtítulos completos.
- Microcambios cada 2–3 s dentro de cada bloque, sin obligar a leer algo nuevo cada 3 s.
- Tiempos provisionales: se ajustan a la toma real de voz, nunca estirando audio.

## 5. Empaque (va en el mismo archivo)

- 3 variantes de portada (texto de 3–6 palabras + concepto visual) con checklist: curiosidad · payoff · específico · plataforma.
- Caption: gancho de 1 línea → la frase para copiar literal → pregunta de comprensión → CTA de la fase vigente → 3–5 hashtags (#ErickArtificial #CriterioIA …).
- **Pregunta de comprensión** con su respuesta correcta esperada (sirve para medir aprendizaje en comentarios o en una encuesta de historia).
- Carrusel derivado: 6 láminas (pregunta · cuenta · grieta · imagina · regla · frase).

## 6. Autocrítica (antes de entregar)

Califica de 1 a 10. Reescribe todo lo que quede por debajo de 8, con un máximo de 3 pasadas.

| Criterio | Pregunta |
|---|---|
| Gancho | ¿La pregunta inicial es algo que alguien de verdad le preguntaría a la IA? ¿Se ve en 0.5 s? |
| Cuenta correcta | ¿El cálculo de la IA es irreprochable y la aritmética cuadra? |
| Grieta | ¿Se entiende por qué la cuenta no responde la pregunta, sin jerga? |
| Imagina | ¿Hay una persona concreta y una trayectoria dibujable? |
| Regla sin sermón | ¿Dice qué hacer, no qué pensar? |
| Frase para copiar | ¿Se puede pegar tal cual en un prompt? ¿≤ 8 palabras por pregunta? |
| Remate | ¿Sorprende, tiene callback y suena a Erick? |
| Prueba sin voz | ¿El storyboard se entiende en mudo? |
| Duración | ¿120–160 palabras? |
| Novedad | ¿No repite enseñanza, negocio, objeto ni remate de la temporada? |

## 7. Qué NO tomar de otras skills

- De `escritura-guiones-ai-lab` sí: gancho en el segundo 0, un solo juego, diagnóstico del remate y autocrítica. **No:** CTA «AGENTE», marca hablada «Ei Ai Lab Skul», 3 gags mínimos ni el tono de comedia de personajes.
- De `guion-animacion-educativa`, `guion-casi-terricolas` y `guiones-labi-beto`: nada. Son otro tono y otro público.
- De `estrategia-contenido`: ángulos (§5), empaque (§7) y hooks (§8).
