# Dirección de animación · Erick Artificial

Resumen operativo del tipo de animación del canal. El detalle técnico vive en `skills/mono-volumetrico/SKILL.md` (§1–7) y el vocabulario de objetos en `skills/mono-volumetrico/VOCABULARIO-VISUAL.md`. Este documento no los reemplaza: los junta en una página para dirección y revisión.

## 1. El tipo de animación

**Motion design volumétrico minimalista sobre negro, con color semántico, hecho con código** (motor Canvas propio + render determinista Playwright → FFmpeg).

| Es | No es |
|---|---|
| Un objeto protagonista por idea, con volumen, luz y sombra de contacto | Personajes, robots, presentador recortado, avatar |
| Cámara virtual continua que deriva y transforma | Diapositivas o cortes cada 3 s |
| Relaciones visibles (pilas, trayectorias, vínculos que se cortan) | Ilustración decorativa o íconos de stock |
| Texto esencial (≤ 1 bloque a la vez) | Subtítulos continuos |
| Color con significado fijo | Color decorativo, neón o degradados de plantilla |
| Hecho con código, reproducible y versionado | Video generativo (Kling, Veo, Runway, Higgsfield) |

## 2. Especificaciones

| Parámetro | Valor |
|---|---|
| Formato | 1080×1920, 30 fps, H.264; 45–60 s (máx. 90) |
| Fondo | Negro casi puro con leve elevación central (`#0b0b0b` → `#000`), preset `erick-artificial-negro`, sin inversiones blancas |
| Objetos y texto | Blanco `#f2f2f0`, gris `#a6a6a2`, línea `#8a8a86`, papel `#f2f1ec` |
| Acentos | **rojo `#e5484d`** y **verde `#3fb950`** = las dos categorías del episodio · **ámbar `#f2b640`** = lo que el dato no contiene, la hipótesis o la pregunta abierta |
| Tipografía | Números y titulares: Montserrat SemiBold/Bold (sans) · conceptos y frase para copiar: Instrument Serif Italic · rótulos: mono ≥ 30 px |
| Tamaños | Número héroe 84–96 px · concepto serif 72–110 px · frase para copiar ≥ 90 px (se compacta a ≥ 0.7×) |
| Luz | Una luz clave común (`E.LIGHT`) arriba-izquierda-frente; sombra de contacto en todo objeto apoyado |
| Plano | Retícula de puntos en perspectiva que se funde con la distancia |
| Movimiento | Sostener 1.5–5 s con deriva lenta (2–6 % de escala por segundo) · transiciones de 0.2–0.5 s con easing expo · apariciones `outBack ≤ 1.1` · cámara `inOutCubic` |
| Glow | Solo en la frase-tesis (`concept({glow:true})`), nunca universal |
| Zonas | Concepto en el tercio superior (y ≈ 18–30 %); protagonista en el centro (y 42–55 %); el texto nunca en la ruta del protagonista |

## 3. Plantilla visual por bloque del formato

| Bloque | Plantilla de animación | Reutiliza |
|---|---|---|
| 1 · Pregunta | El objeto o las dos opciones aparecen en ≤ 0.5 s; arco discontinuo de la pregunta | ep01 escena 01 |
| 2 · Cuenta | Las cantidades crecen como pilas o números que cuentan; la IA conecta el dato con la conclusión mediante un vínculo | `stacks`, `counts` |
| 3 · Grieta | ✓ junto al dato (intacto) → el vínculo dato → conclusión se corta → «?» ámbar | `grieta` (por extraer) |
| 4 · Imagina | Rótulo «imagina:» + objeto ámbar; trayectoria visible de una persona o un caso | vocabulario §2 |
| 5 · Regla | Pantalla partida: arriba la pregunta que el dato responde (✓); abajo la que necesita fichas ámbar y queda abierta | `dosPreguntas`, `chip` |
| 6 · Frase para copiar | Negro sin utilería, serif grande, de una en una, barra de comillas a la izquierda | `phrase` / `fraseCopiar` |
| 7 · Remate | La frase se compacta arriba y sigue legible; el objeto del callback entra por abajo | ep01 escena 10 |

## 4. Objetos nuevos que pide la temporada 1

Todos deben construirse **reutilizables** (`assets/` o `escenas-comunes.js`), no dentro de un episodio:

| Componente | Episodio(s) | Base |
|---|---|---|
| `E.balance` (balancín) | ep02 | `box` + `ringStack` |
| `E.door` (puerta) | ep03 | `box` |
| `E.ramp` (mesa inclinada) | ep04 | `box` rotado |
| `E.calendarCard` | ep05 | `ticket` |
| Pantalla delgada + columna fantasma | Especial Buen Fin, ep06 | `box` + contorno discontinuo |
| Papel doblado que se abre | ep10 | `ticket` |
| Rosca | ep08 | `plate` / `ringStack` |
| Libreta | ep12 | `box` + `ticket` |

## 5. Control de calidad (antes de pedir visionado)

1. Muestra de 0–6 s antes de escribir el resto (cámara, escala, color).
2. Hojas cada 0.5 s y cuadros a ±0.1 s en cada corte (`scripts/hoja.py`).
3. **Prueba sin voz:** por escena, «objeto → relación que se entiende en mudo».
4. Fondo y color: `revision-fidelidad-mono/scripts/fondo_color.py` (mediana de borde ≤ 40/255; píxeles blancos ≤ 35 %).
5. Errores ya conocidos: cámara que corta objetos, objetos que aparecen de golpe en un corte, texto en la ruta del protagonista, cuadros vacíos en iris o mosaicos, papel que desborda su contenido.
6. Máximo 2 rondas visuales; si una tercera parece necesaria, el problema suele ser de guion o de objeto: se revisa el storyboard, no se pule el render.
