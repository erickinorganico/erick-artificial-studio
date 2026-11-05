---
name: mono-volumetrico
description: Autoría de explicadores verticales en motion design minimalista volumétrico con presets de paleta (default blanco monocromo; preset local erick-artificial-negro con fondo negro y acentos semánticos), un objeto protagonista, plano de puntos en perspectiva, cámara virtual continua, morphs, zoom-through, números sans + conceptos serif itálica, inversiones a negro con glow). Usar al crear o rehacer un video "estilo referencia blanca minimalista" sobre una narración ya existente; incluye motor Canvas 3D ligero (assets/engine.js) y render determinista Playwright→ffmpeg con audio copiado sin recodificar.
---

# Motion mono-volumétrico (autoría)

Lenguaje derivado de observar tres reels de referencia (DfNcyobtoWE, DeuYyrdNq8n, DeeMfY7tEbS; hojas cada 2 s en
`evidence/observacion-v12/` del proyecto Soy-imparcial V12). No es plantilla de marca: no usar logo, guion,
metraje ni música del referente. Se reconstruye el *lenguaje* con objetos propios del tema.

## 1. Reglas visuales medibles (1080×1920)

| Rasgo | Observado → regla |
|---|---|
| Fondo | Blanco puro al centro, viñeta radial a ~#E8E8E8 en bordes (Deu 10–30 s, DfN 14 s). Nunca gris medio ni oscuro salvo inversión. |
| Paleta | Negro #0B0B0B, blanco y 3–4 grises (#9A9A9A líneas secundarias, #BDBDBD puntos, #EDEDED sombras). Sin color. Categorías = relleno negro vs contorno/gris + etiqueta. |
| Protagonista | 1 objeto por idea, centrado (x 50 %, y 42–55 %), 25–45 % del ancho; ≥55 % del cuadro vacío. |
| Volumen | Esfera negra brillante con especular blanco arriba-izquierda y sombra de contacto difusa (Deu 2 s, 12 s). Objetos de línea (teléfono, plato) = relleno blanco + contorno negro + sombra suave abajo (DeeM 0–30 s). |
| Línea | Contorno principal 6–9 px; secundaria 1.5–2.5 px gris; vectores 4–5 px negro. Círculo grueso con punto central = motivo recurrente (DfN 2–46 s). |
| Plano | Retícula de puntos/guiones grises en perspectiva, horizonte al 12–25 % de altura, se funde a blanco con la distancia (Deu 2–8 s, 72 s). Curvas de nivel finas para "terreno" (Deu 10–50 s). |
| Números | Sans semibold negro 64–96 px, coma decimal ("3,1"), rótulo mono gris 26–30 px debajo ("pérdida"). Se interpolan contando. |
| Conceptos | Serif itálica (Instrument Serif Italic) 72–110 px, 1–3 palabras, tercio superior (y≈18–30 %), entran con desenfoque 12→0 px en 0.3–0.5 s. |
| Inversión | Negro total para la frase-tesis (Deu 52–55 s, DeeM 60–78 s): sans blanca ~56 px + serif itálica blanca ~110 px con glow (shadowBlur≈18). Motivada por un giro del guion, 1–2 por pieza. |
| Texto | ≤1 bloque visible; nunca subtítulos completos, títulos de canal ni numeración. |

## 2. Gramática de movimiento

- **Sostener + derivar:** cada idea dura 1.5–5 s con deriva lenta de cámara (2–6 % escala/s). Nada queda inmóvil.
- **Transición rápida:** 0.2–0.5 s, easing expo y desenfoque de movimiento (Deu 3.4–3.8 s). Cortes duros reales ~3–6 por 80 s (DfN: 20.4, 21.7, 59.9 s); lo demás es transformación continua.
- **Morph explicativo:** círculo→plato, pila→cilindro de anillos (DfN 12 s), punto→esfera, cenital→perspectiva (Deu 0–4 s).
- **Zoom-through:** la cámara entra en el objeto hasta que su borde sale del cuadro; el interior es la escena siguiente (DfN 30–34 s, DeeM 4–6 s).
- **Match cut por forma:** misma silueta en igual posición une ideas (DfN 38→40 s).
- **Repetición = volumen de datos:** mosaico de iconos iguales que llena el cuadro dejando un hueco al protagonista (DfN 50–58 s).
- Curvas: `ioc` (inOutCubic) cámara, `ob` (outBack ≤1.1) apariciones, `ie`/`oe` (expo) en transiciones rápidas.

## 3. Componentes (`assets/engine.js`)

`createEngine(ctx,W,H)` → `cam(pos,target,fov)`, `bg(invert)`, `dotPlane`, `ringOnPlane`, `contours`, `sphere`,
`plate`, `cup`, `box`, `ringStack`, `quad`/`ticket`, `iconGrid`, `arrow`, `number`, `label`, `concept`, `card`, `iris`,
`motionBlur`, utilidades `ease.*`, `lerp`, `seg(t,a,b)`, `rng(seed)`, `P(x,y,z)` (proyección).
Mundo con y arriba y plano en y=0; perspectiva propia y determinista (sin dependencias externas).

## 4. Flujo

1. Leer narración/tiempos (`timeline.json`, `palabras.json`). Asignar a cada frase UNA acción de objeto (transformación que explica, no ilustración literal ni personaje).
2. Escribir `escenas.js` (`window.SCENES=[{t0,t1,draw(E,t,lt,d)}]`), sólo con componentes.
3. Muestra: `python scripts/render.py --project <dir> --from 0 --to 6 --out muestra.mp4`; hoja con `scripts/hoja.py`.
4. Revisar con la skill `revision-fidelidad-mono` y corregir antes de extender.
5. Completo: `python scripts/render.py --project <dir> --audio voz.aac --out final.mp4` (audio `-c:a copy`).

`<dir>` debe contener `escenas.js` y opcionalmente `fonts/` (Instrument Serif Italic, Montserrat SemiBold; OFL).

## 5. Ejemplo mínimo (escenas.js)

```js
window.SCENES=[{t0:0,t1:3,draw(E,t,lt,d){ E.bg();
  E.cam([0,9-3*E.ease.ioc(lt/d),-14],[0,0,0],38); E.dotPlane({step:1,extent:24});
  E.plate([0,0,0],2.2,{sauce:'black'}); E.sphere([0,1.2,0],0.6);
  E.number(540,560,'30','días',1); E.concept(540,420,'un mes',E.seg(lt,0.4,0.8)); }}];
```

## 6. v13 · materiales, relieve y presets

Archivos: `assets/engine.js` (núcleo + presets + suelo `E.floor` + sombra de contacto), `assets/engine-material.js`
(`sphere` esmaltada con difuso/terminador/rebote/especular doble; `plate` de cerámica con canto, ala biselada, pared
interior en contraluz, fondo hundido, brillo de ala, salsa con degradado y totopos facetados con grosor; `cup` cilíndrico),
`assets/engine-relieve.js` (`box` con caras Lambert y filo biselado; `ringStack` = pila de fichas con canto y cara;
`terrain` = campo de alturas teselado con Lambert+especular, desvanecido a negro, curvas de nivel por marching squares en
orden de pintor; `field` = suma de gaussianas), `engine-tipo.js` (colores desde el preset; rótulos ≥30 px; papel con canto).
Misma luz clave `E.LIGHT` en todo. `render.py` carga `presets/*.js`, luego `<proyecto>/preset.js`, materiales, núcleo, tipo y escenas.

**Presets.** `window.MONO_PRESETS[nombre] = {dark, bg, ink, ink2, line, dot, paper, floor, groundBase, groundLine, tile, accents}`.
El proyecto elige con `preset.js`: `window.MONO_PRESET='…'`. Sin preset = `blanco` (lenguaje V12). No imponer el preset de un
canal a otro.

**Preset `erick-artificial-negro` (sólo canal Erick Artificial, decisión de Erick en V13):** fondo negro casi puro en todas las
escenas (sin inversiones blancas); blanco/gris para objetos y texto; acentos con significado fijo: `rojos` #e5484d,
`verdes` #3fb950, `duda` #f2b640 (dato que hay que preguntar). Usar `E.col('rojos')`, `{tone:'verdes'}`, `{color:'duda'}`.
Nunca color decorativo. Sin glow universal: sólo `concept({glow:true})` en la frase-tesis.

**Errores aprendidos en V13:** cámara demasiado cerca corta platos/tarjetas (calcular semiancho visible ≈ d·tan(fov/2)·0,5625);
objetos que entran desde fuera del encuadre; texto conceptual en la zona por donde pasa el protagonista; cuadros vacíos al
inicio de un iris o al arrancar un mosaico; contenido de papel que desborda al reescalar el ticket.

## 6b. v14 · claridad argumental (aprendido en «¿Respondió bien?», Erick Artificial)

Genérico (cualquier preset):
- **Una relación por objeto.** Antes de escribir una escena, completar «objeto → qué relación explica». Si al quitar la voz
  no se entiende qué es, simplificar. V14: pila = conteo; esfera perla = un cliente; línea discontinua = intención no
  registrada; línea continua = compra registrada; papel sólido = dato que sí queda en el Excel; contorno discontinuo =
  dato que NO queda registrado.
- **No tachar un dato correcto** para mostrar un error de razonamiento: el dato se mantiene estable (✓) y se corta el
  *vínculo* dato→conclusión (línea interrumpida + duda).
- **Hipótesis ≠ hecho:** cuando la voz dice «Imagina», el texto en pantalla también lo dice y el objeto hipotético usa el
  color de «información faltante», no el de la categoría ganadora.
- **Frase reutilizable:** entra de una en una, grande (≥ 90 px serif), y al pasar al remate se compacta arriba (≥ 0,7×)
  y permanece legible hasta el final; el remate va debajo, nunca encima.
- **Dos preguntas, dos fuentes:** mitad superior = pregunta que el dato sí responde (✓); mitad inferior = pregunta que
  necesita más fuentes (fichas que se suman) y respuesta abierta.
- **Tiempo desde la toma real:** sin ASR local, segmentar frases por pausas medidas (`silencedetect` −34 dB/80 ms) y
  anclar cada entrada a su frase; documentar que eso no verifica palabras pronunciadas.
- `scripts/nivelar_voz.py`: nivelación por frase (± 4 dB hacia la mediana, rampas en pausas), compresión 2:1 suave y
  loudnorm lineal de 2 pasadas a −16 LUFS / −1,5 dBTP, con mediciones BS.1770 por frase antes/después.

Errores V14 detectados en hojas de secuencia y corregidos: objeto que desaparece en un corte y reaparece 0,5 s después
(ticket), platos que aparecen de golpe durante un cambio de cámara, 1,7 s de pantalla con sólo una pregunta, plato del
remate cruzando la frase fija, encabezado que desaparecía en seco en un corte, objeto recortado por el borde al acercar la
cámara. Comprobar cada corte con cuadros a ±0,1 s, no sólo cada 0,5 s.

Preset `erick-artificial-negro` (sólo Erick Artificial): ámbar `duda` también marca disponibilidad/«agotados» y la
pregunta a clientes (información que el Excel no contiene). Rojo/verde nunca se usan para «correcto/incorrecto».

## 6c. v15 · diseño sonoro opcional (módulo `sonido/`)
Si el expediente pide efectos: leer `sonido/DISENO-SONORO-Y-MEZCLA.md`. Cues tomados del código de escenas (contacto/ápice),
vocabulario por significado, SFX procedurales declarados (`sonido/sfxlib.py`), voz intacta a ganancia unidad, ducking sólo
sobre SFX (`sonido/mezclar.py`), mux con `-c:v copy`. Opcional por proyecto; no impone sonido a otras piezas.

## 7. Prohibido

Personajes/robots/presentador recortado, terminal, pixel-art, paletas de canales descartados (salvo preset explícito del canal), subtítulos continuos,
diapositivas estáticas, dos conceptos de texto a la vez, color decorativo o que cambie de significado, metraje del referente.
