# V14 · Revisión de fidelidad, claridad y errores

Revisión hecha por Claude (perfil Cliente) sobre `renders/erick-artificial-v14-pregunta-correcta.mp4`
(SHA-256 `5685db629e1a4a42e36023706ab8ea938c67d3814c998c9345101f17d1041aad`). No aprueba la pieza: la valoración es de Erick.

## 1. Guion producido = guion aprobado (sin cambios de palabras)

La locución es la toma V14 (`audio/tts_[curi_20261102_115434.mp3`). El texto enviado al proveedor (audio/intento-voz-v14.json)
coincide palabra por palabra con GUION-STORYBOARD-APROBADO.md; las etiquetas de AutoTag ([curious], [explaining]…) no se pronuncian
como texto según el proveedor, pero **sin ASR local no pude comprobarlo de forma independiente** (ver §6).
Tiempos de cada frase: `source/audio_v14/frases.json` (32 tramos medidos con silencedetect −34 dB/80 ms; el número y orden de
pausas coincide con la puntuación del guion).

## 2. Escena → idea → relación visual (prueba «sin voz»)

| Tiempo | Voz | Lo que se ve y qué relación explica | Color |
|---|---|---|---|
| 0–3,5 | Pregunta a la IA | Dos platos; arco discontinuo «¿qué prefieren?» los une y cae en la hoja de ventas | rojo/verde = categorías |
| 3,5–8,4 | 80 rojos / 50 verdes; «Los rojos» | Pedidos salen de la hoja y forman pilas proporcionales; conteo sube a 80/50; la pila roja avanza = la IA la elige | — |
| 8,4–11,1 | Contó bien. ¿Respondió bien? | ✓ «cuenta correcta» sobre 80/50 (no se tachan); el vínculo «prefieren»→conteo se corta y aparece «?» | ámbar = duda |
| 11,1–13,6 | Imagina… agotados | «imagina…» en pantalla; plato verde se vacía, «disponibles hoy 3→0», sello AGOTADOS | ámbar = hipótesis/disponibilidad |
| 13,6–16,4 | Quería verdes… pidió rojos | Esfera perla = un cliente. Trayecto verde discontinuo al plato vacío, se detiene, trayecto rojo continuo al rojo; nace ticket rojo | verde = intención, rojo = compra |
| 16,4–20,0 | Ticket registra rojos; primera opción era otra | Mismo cliente con dos huellas: papel sólido «ticket rojos» («queda en el Excel») y contorno discontinuo «1.ª opción verdes» («no queda registrada»); «preferencia ≠ compra» | — |
| 20,0–25,2 | Ventas = qué se compró con lo que había; no bastan | Vuelven 80/50 (mismos números, rótulo «comprados»); tarjeta ámbar «disponibilidad · verdes: agotados» los acompaña; «¿qué preferían?» queda abierta. No se recalcula ganador | ámbar |
| 25,2–32,9 | Vendió más → contar; preferencias → disponibilidad + preguntar | Arriba «¿Qué vendió más?» → barras 80/50 + ✓. Abajo «¿Qué prefieren?» → fichas ventas + disponibilidad + preguntar a clientes → «?» respuesta abierta; «vender más ≠ gustar más» | ámbar |
| 32,9–38,7 | Frase para copiar | Negro sin utilería: «¿Estos datos responden mi pregunta?» y luego «¿Qué información falta?», grandes y de una en una | ámbar en «falta» |
| 38,7–44,8 | Remate | La frase se compacta arriba y **permanece legible hasta el final**; plato verde llega con etiqueta «mi gusto»; hoja Excel aparte, atrás; «por gusto. / no por Excel.» | verde = su gusto |

Preguntas de claridad del brief, respondidas mirando las hojas (no es prueba de audiencia):
- ¿Se ve «quería verde → compró rojo»? Sí: dos trayectos de color distinto del mismo objeto (revision/seq-a.jpg 14,0–16,0 s).
- ¿Queda claro que ventas no bastan para preferencias? Se muestra con «preferencia ≠ compra», la tarjeta de disponibilidad junto a 80/50 y la mitad inferior de la escena 8 con respuesta abierta.
- ¿La frase útil se puede copiar? Se ve completa 35,5–44,8 s (9,3 s), primero a 92 px y luego ≈64 px.
- 80/50 nunca se tachan ni cambian; el agotamiento sólo aparece después de «imagina».

## 3. Métricas

- Fondo negro (`evidence/verificacion/fondo-color-v14.json`, 90 muestras): mediana de borde máx. 12/255 (umbral 40); % píxeles blancos máx. 4,99 % (umbral 35 %). Acento rojo/verde en 73/90 muestras, área máx. 5,76 %.
- Técnica (`evidence/verificacion/tecnica-v14.txt`): H.264 1080×1920, 30 fps, 1344 cuadros, 44,800 s; AAC 48 kHz mono 44,800 s; decode completo sin errores; seek OK en 0,5/12,3/25/38/44,5 s; SHA del AAC en el MP4 = SHA de la pista nivelada.
- Voz: ver `evidence/audio/nivelacion-v14.json` y ENTREGA.md.

## 4. Lado a lado con referentes Alyxia (`revision/lado-a-lado-v14.jpg`)

Se comparte: un objeto volumétrico por idea con sombra de contacto, plano de puntos en perspectiva, números sans grandes con
rótulo mono, conceptos serif itálica, cámara continua, tarjeta de tesis sobre fondo liso. Diferencias honestas: fondo negro y
color semántico por decisión de Erick (los referentes son blancos/monocromos); V14 usa **más elementos por cuadro** que los
referentes (dos platos + pilas + números + rótulos) porque la enseñanza es comparativa; los referentes tienen trazo más
grueso y más espacio negativo. No es «estilo idéntico».

## 5. Defectos encontrados y corregidos (r1→r3)

| Tiempo | Defecto | Causa | Corrección | Evidencia |
|---|---|---|---|---|
| 3,3–4,2 | Hoja de ventas tocaba rótulos de platos | hoja muy cerca | hoja más atrás y menor | hoja-a.jpg → seq-a.jpg |
| 13,6–16,4 | Platos en el tercio superior y trayecto del cliente cortado abajo | cámara WIDE mal apuntada | nuevo objetivo de cámara | hoja-b.jpg |
| 16,4–20,0 | Esfera y tarjetas mal compuestas | objetivo de cámara | cliente arriba, huellas abajo | hoja-b.jpg |
| 16,44 | Ticket rojo desaparecía en el corte y reaparecía 0,5 s después | entrada de la tarjeta tardía | tarjeta empieza antes del corte | seq-r2.jpg |
| 20,0 | Platos aparecían de golpe en el cambio de cámara | sin fundido | alfa 0,15–0,5 s | seq-r2.jpg |
| 25,2–26,9 | 1,7 s sólo con una pregunta | barras ligadas a «cuenta las ventas» | barras crecen desde 25,9 s | seq-r2.jpg |
| 38,7–39,6 | Plato del remate cruzaba la frase fija; plato en zona del texto final | entrada desde la derecha/arriba; cámara | entra desde abajo; cámara ajustada | hoja-c2.jpg, seq-r2.jpg |
| 38,71 | «Antes de pedirle…/agrega:» desaparecía en seco | sin salida | fundido 38,1–38,6 s | seq-r3.jpg |
| 33–35,3 | Pantalla casi estática | sin deriva | deriva de escala lenta | seq-c.jpg |

## 6. Pendientes y límites (no resueltos)

- **Coincidencia texto↔voz no verificada de forma independiente:** no hay ASR local instalado y no se instaló ninguno ni se usó API. Sólo se verificó la estructura (32 tramos en el orden del guion). Requiere escucha humana completa, en especial cifras «ochenta/cincuenta», «Imagina» y que las etiquetas AutoTag no se oigan.
- **Visionado 1x con audio no realizado:** revisé hojas cada 0,5 s y cuadros alrededor de cortes; eso no es visionado ni escucha en tiempo real. La naturalidad de la nivelación (frase f06 «respondió» subió +4 dB, límite) también requiere escucha.
- 13,6–14,7 s: el rótulo «cliente» queda pequeño y cerca de la esfera al llegar al plato verde; transiciones de 0,3–0,5 s en 16,4 s y 20,0 s muestran tarjetas y platos superpuestos durante el cambio de cámara.
- Rótulos mono de 30–36 px: legibles a 1080 px; en teléfono pequeño son el texto más débil.
- Sincronía: entradas ancladas a inicios de frase medidos (±0,1–0,35 s por diseño); sin tiempos por palabra.
- Ninguna prueba de audiencia: no se afirma comprensión del público.
