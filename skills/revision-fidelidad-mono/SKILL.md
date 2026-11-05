---
name: revision-fidelidad-mono
description: Revisión de fidelidad visual y de errores para videos hechos con mono-volumetrico (o cualquier pieza que deba parecerse a una referencia minimalista blanca/volumétrica). Compara fotogramas propios con los del referente a la misma escala, mide fondo/paleta/espacio negativo/texto, revisa secuencias consecutivas, cortes, recortes y legibilidad, y rechaza regresiones (terminal, robot, pixel, fondo oscuro, "V11 maquillada"). Usar antes de entregar y tras cada render completo.
---

# Revisión de fidelidad mono-volumétrica

La revisión no aprueba la pieza: produce evidencia y una lista de defectos. La valoración final es humana.

## 1. Evidencia mínima (scripts/)

| Paso | Comando | Produce |
|---|---|---|
| Lado a lado a igual escala | `python scripts/lado_a_lado.py --pair R.mp4@12.0=V.mp4@3.6 --pair R2.mp4@54.5=V.mp4@23.9 --out lado.jpg` | Columnas: referencia arriba / propio abajo, 270 px de ancho cada cuadro |
| Métricas de lenguaje | `python scripts/metricas.py --video V.mp4 --every 0.5 [--ref R.mp4]` | JSON: luminancia de fondo, % píxeles casi blancos, % negro, saturación media, cuadros invertidos |
| Secuencias consecutivas | `python ../mono-volumetrico/scripts/hoja.py --video V.mp4 --every 0.5 --from A --to B` | Hoja para revisar continuidad (todo el video, no sólo cuadros bonitos) |
| Técnica | `ffprobe -count_frames`, decode completo `ffmpeg -v error -i V.mp4 -f null -`, SHA del AAC extraído con `-c:a copy -f adts` | Formato, cuadros, duración, audio idéntico |

## 2. Criterios medibles (rechazar si falla)

- **Fondo:** percentil 10 de la mediana de luminancia de bordes ≥ 200 (0–255) en cuadros no invertidos; invertidos (mediana < 30) ≤ 30 % de la duración.
  Calibrado con los reels (muestreo 1 s): DeuYyrdNq8n p10≈223 e inversión 3,9 %; DfNcyobtoWE 2,5 %; DeeMfY7tEbS 26,2 % (tramo final negro) y fondos grises puntuales.
- **Paleta:** saturación media HSV < 0.05; ningún cuadro con saturación media > 0.10 (sin color de canal anterior).
- **Espacio negativo:** mediana de % píxeles casi blancos (≥ 235) ≥ 45 % en cuadros no invertidos (referencias: 81–96,5 %); si un mosaico llena el cuadro, debe ser transitorio (< 3 s) y dejar hueco al protagonista.
- **Texto:** ≤ 1 concepto serif a la vez; ninguna frase completa de la narración en pantalla; tamaños: serif ≥ 72 px, rótulos mono ≥ 24 px a 1080 de ancho.
- **Volumen:** al menos un objeto con sombreado (esfera/caja/sombra de contacto) visible en ≥ 60 % de las escenas.
- **Movimiento:** ningún tramo > 1.0 s con diferencia entre cuadros ≈ 0 (imagen congelada) salvo tarjetas de inversión con texto entrando; cambio visual de idea cada ≤ 3 s.

## 3. Pruebas de errores (mirar las hojas, no suponer)

1. **Recortes:** ningún protagonista, número o texto cortado por el borde salvo zoom-through intencional (dura < 0.5 s).
2. **Contacto:** esferas apoyadas tienen sombra bajo ellas; objetos que caen tocan el plano o el plato sin atravesarlo.
3. **Continuidad:** el estado final de una escena coincide con el inicial de la siguiente (posición, tamaño, cámara) o hay corte motivado (iris/inversión/zoom-through).
4. **Legibilidad:** texto sobre zona limpia (no sobre mosaicos ni líneas densas); contraste ≥ 7:1.
5. **Espejado/orientación:** texto de papeles no aparece invertido ni de espaldas; izquierda/derecha de categorías se mantiene en todo el video.
6. **Sincronía:** cada concepto aparece dentro de ±0.25 s de su palabra (`palabras.json`).

## 3b. Presets oscuros y color semántico (v13)

- **Fondo negro (preset `dark`):** `python scripts/fondo_color.py --video V.mp4 --every 0.5 --out fondo.json`. Rechazar si alguna
  muestra tiene mediana de borde > 40/255 o % de píxeles > 200 de luminancia > 35 % (un papel u objeto blanco no puede leerse
  como fondo blanco). Los umbrales de fondo blanco de §2 aplican sólo al preset `blanco`.
- **Color:** el script sólo mide área roja/verde. El significado se revisa a mano con una tabla escena → acento → qué explica;
  rechazar acentos decorativos o que cambien de significado.
- **Materiales:** comparar lado a lado relieve/esfera/plato contra el referente; un degradado plano no equivale a relieve.
- **Nuevos errores a buscar:** papel que desborda su contenido, cámara que corta objetos al alejarse, protagonista que pasa
  bajo un concepto, cuadros vacíos en iris/mosaicos.
- **Visionado 1x:** las hojas y los cuadros densos NO son visionado. Si no hay capacidad real de ver/escuchar en tiempo real,
  registrarlo como pendiente; no sustituirlo por `ended=true`, decode o hojas.

## 3c. Claridad argumental y voz (v14)

- **Prueba sin voz:** por cada escena, escribir qué relación debe entenderse sólo mirando (p. ej. «quería verde → compró
  rojo»). Si la hoja de secuencia no lo muestra sin la narración, es defecto.
- **Dato correcto intacto:** si la enseñanza es «el cálculo está bien, la pregunta no», ningún cuadro puede tachar o
  alterar el dato. Revisar que los números se mantienen iguales en todas sus apariciones.
- **Hipótesis marcada:** lo introducido por «imagina/supón» aparece como hipótesis en pantalla, con el color de duda.
- **Frase práctica:** se ve y se oye, y sigue legible al final (tamaño ≥ 0,7 de su entrada, sin objetos encima).
- **Cortes:** cuadros a ±0,1 s de cada corte para ver objetos que desaparecen/reaparecen o entran de golpe.
- **Voz:** volumen por frase con BS.1770 antes/después (no basta un loudnorm global); SHA del AAC del MP4 = pista nivelada.
  Coincidencia texto↔voz sin ASR local independiente queda como **pendiente de escucha humana**; segmentar por pausas sólo
  prueba estructura (número/orden de frases), no palabras.
- No afirmar comprensión del público sin prueba de audiencia real.

## 3d. Audio y SFX (v15)
- Vídeo: SHA de la esencia (`ffmpeg -i X -map 0:v -c copy -f hash -hash sha256 -`) igual a la versión aprobada si sólo cambia audio.
- Voz: stem bit-idéntico al aprobado y recuperable de la mezcla (mezcla − SFX = voz); Δ por frase ≤ 0,5 dB.
- Comparar loudness con el MISMO medidor y disposición de canales (mono vs L=R difiere 3 LU sin cambio real).
- Pico ≤ −1 dBTP, 0 clipping, suma mono sin pérdida de datos clave, cola final completa, duración exacta.
- Sincronía: registrar onset/ápice medidos vs contacto visual por cue; acentos en huecos con `bajo_voz_pct` bajo.
- Rechazar: voz recomprimida/limitada, SFX que tapan frases (voz/SFX por frase < ~12 dB), metralleta sin reposo,
  música no pedida, sonidos de origen desconocido. Medir no es escuchar: declarar el límite.

## 4. Regresiones prohibidas (rechazo inmediato)

Terminal o UI de consola, robot/humanoide/presentador recortado, pixel-art, paleta de canal anterior (un preset oscuro sólo si el canal lo pidió),
subtítulos continuos, reutilizar escenas/archivos de una versión rechazada cambiando sólo textos/transiciones,
metraje/logo/música del referente dentro del video, afirmar "estilo idéntico" sin la hoja lado a lado.

## 5. Informe

Escribir `revision/REVISION-FIDELIDAD.md`: tabla escena → rasgo del referente (reel+tiempo) → elección propia → archivo/función → cuadro propio;
métricas JSON; defectos encontrados y corregidos; límites honestos (p. ej. render Canvas 2D sin iluminación global, no visionado 1x si no ocurrió).
