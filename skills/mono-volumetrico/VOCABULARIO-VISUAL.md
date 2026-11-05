# Vocabulario visual · Erick Artificial (preset `erick-artificial-negro`)

Complemento de `SKILL.md` (§6b «una relación por objeto»). Objetivo: que cada concepto de criterio ya tenga su objeto y su relación, para que un episodio nuevo no requiera inventar el lenguaje desde cero. Lo marcado ✅ ya existe en el motor o en las escenas de chilaquiles; 🔧 es un componente nuevo que debe hacerse **reutilizable** (en `assets/` o en `escenas-comunes.js`), no dentro de un episodio.

## 1. Gramática fija del canal

| Significado | Representación | Estado | Origen |
|---|---|---|---|
| Persona / cliente | Esfera perla (`E.sphere`) con sombra de contacto | ✅ | ep01 13.6–20 s |
| Cantidad / conteo | Pila de fichas (`E.ringStack`), altura proporcional, número sans encima con rótulo mono | ✅ | ep01 `stacks`, `counts` |
| Dato registrado | Papel sólido (`E.ticket`), sombra real | ✅ | ep01 ticket/hoja |
| Dato que NO queda registrado | Mismo objeto con contorno discontinuo, sin relleno | ✅ | ep01 «1.ª opción» |
| Intención | Línea discontinua | ✅ | ep01 trayecto verde |
| Acción registrada | Línea continua | ✅ | ep01 trayecto rojo |
| Conclusión | Vínculo (línea) dato → concepto | ✅ | ep01 «prefieren» |
| Cuenta correcta | ✓ en círculo junto al dato; el dato no se toca | ✅ | ep01 8.4 s |
| Falla de razonamiento | El vínculo se interrumpe + «?» ámbar | ✅ | ep01 9.8 s |
| Hipótesis («imagina») | Rótulo «imagina:» + objeto en ámbar | ✅ | ep01 11–13 s |
| Información que falta | Ficha/chip ámbar que se suma (`chip`) | ✅ | ep01 escena 08 |
| Frase para copiar | Negro sin utilería, serif ≥ 90 px, barra de comillas, de una en una | ✅ | ep01 `phrase()` |
| Remate | La frase se compacta arriba (≥ 0.7×) y sigue legible; objeto del callback abajo | ✅ | ep01 escena 10 |

**Color (no negociable):**

- Rojo/verde = las dos categorías del episodio; nunca correcto o incorrecto.
- Ámbar = lo que el dato no contiene, la hipótesis o la pregunta abierta.
- Blanco = lo registrado.
- Si el episodio no tiene dos categorías, no se usa rojo ni verde.

## 2. Objetos por error de criterio (temporada 1)

| Concepto | Objeto → relación | Componentes | Estado |
|---|---|---|---|
| Promedio ≠ caso típico (ep02) | **Balancín**: tablón (`E.box` rotado) sobre un fulcro; los tickets son fichas a lo largo del tablón, en su precio. El promedio es el punto donde se equilibra. Un ticket ámbar muy lejos arrastra el fulcro. Luego las fichas se ordenan en fila y se resalta **la de en medio**. | `box`, `ringStack`, `number` | 🔧 `E.balance(x, pos[], {fulcrum})` |
| Quién no aparece (ep03) | **Puerta** (marco con `E.box`): las esferas que regresan cruzan y llegan al papel de encuesta; la esfera ámbar se va y su lugar en la encuesta queda como contorno discontinuo. El 95 % se calcula solo sobre las que cruzaron. | `box`, `sphere`, `ticket` | 🔧 `E.door(c, w, h)` |
| Te da la razón (ep04) | **Plano inclinado**: la pregunta (texto) inclina la mesa; la esfera-respuesta rueda hacia donde se inclina. Pregunta neutral = mesa plana; la esfera se queda en medio y se suman fichas ámbar (datos que faltan). | `box` (rot), `sphere`, `chip` | 🔧 `E.ramp(c, w, ang)` |
| Juntos ≠ causa (ep05) | **Tercer objeto**: tarjeta de calendario «quincena» detrás; dos líneas salen de ella hacia «post» y hacia «ventas»; la flecha directa post → ventas se vuelve discontinua (ámbar). | `ticket`, `arrow`, `label` | 🔧 `E.calendarCard(c, txt)` |
| ¿Contra qué? (ep06) | Columna de diciembre junto a una **columna fantasma** (contorno discontinuo) del diciembre anterior; noviembre se aparta. | `ringStack`, contorno | ✅ (variación) |
| Fuente inventada (ep07) | Papel «estudio» sin sello; al acercar la cámara, el texto es contorno discontinuo y se desvanece. | `ticket`, contorno | ✅ (variación) |
| Muestra chica (ep08) | Mosaico (`E.iconGrid`) del tamaño de la clientela con solo 3 piezas iluminadas; el 100 % flota sobre 3. | `iconGrid` | ✅ |
| % ≠ cantidad (ep09) | Número «+200 %» enorme que se **desinfla** hasta 3 fichas reales junto a una pila de 300 del mostrador. | `number`, `ringStack` | ✅ |
| Normalizar (ep11) | Dos pilas que se reparten en columnas por turno; la comparación se hace por columna. | `ringStack` | ✅ |

## 3. Escenas comunes a extraer (backlog técnico)

Funciones parametrizables en `assets/escenas-comunes.js`, sacadas de `episodes/chilaquiles/visual/`:

- `grieta(E, t, {dato, conclusion, t0})`: ✓ sobre el dato, vínculo que se traza y se corta, «?» ámbar (ep01 escena 03).
- `fraseCopiar(E, t, {lineas, t0, colorUltima:'duda'})`: frase grande, de una en una, que se compacta al remate (ep01 `phrase`).
- `dosPreguntas(E, t, {arriba, abajo, chips})`: mitad que el dato responde ✓ / mitad con fichas que faltan y respuesta abierta (ep01 escena 08).
- `chip`, `miniBars`, `stacks`, `counts`, `camLerp`, `drift`: utilidades ya escritas en ep01.

## 4. Reglas aprendidas que aplican a todos los episodios

Ver `SKILL.md` §6–6b. Resumen operativo:

- La cámara no corta objetos.
- Nada entra de golpe en un corte.
- Comprobar cada corte a ±0.1 s.
- Ningún texto en la zona por donde pasa el protagonista.
- Ningún cuadro vacío al inicio de un iris o de un mosaico.
- Si al quitar la voz no se identifica qué representa un objeto, simplificarlo.
