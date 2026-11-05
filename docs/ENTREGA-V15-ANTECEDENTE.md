# ENTREGA V15 · diseño sonoro sobre V14 «La IA contó bien. ¿Respondió bien?»

Para revisión de Erick. **No es aprobación humana.** Sin publicación, sin cuentas, sin otra TTS, sin otros modelos ni servicios
pagos, sin música. Producido por Claude (perfil Cliente). Sólo se escribió dentro de `produccion-v15`; BASE V14 sólo se leyó.

## Qué cambió
Sólo el audio: la voz V14 aprobada, **intacta**, más **63 sonidos procedurales en ~48 eventos** sincronizados con las acciones
de la imagen (los tiempos salen del código de escenas `escenas-a/b/c.js` y se contrastaron con `seq-a/b/c.jpg`).
Imagen, guion y voz sin cambios. Pista: AAC 256k **estéreo** 48 kHz (V14 era mono).

Vocabulario (una familia por significado, con variación de tono/duración/intensidad; detalle en `audio/cues-v15.json`):
- Entrada: clinks cerámicos de los dos platos (L/R) → aire pequeño al aparecer «¿qué prefieren?» → trazo aireado del arco
  con paneo L→R → caída y la hoja de ventas se despliega (papel) y asienta.
- Conteo 80/50: aleteo de salida + **ratchet ascendente** por grupo (rojo 16 clicks más grave, verde 10 más agudo) y
  **cierre clunk** por grupo (G3/B3, timbres emparentados). Selección «los rojos»: golpe + burbuja.
- «Contó bien»: confirmación de 2 notas de marimba sintética. «¿respondió bien?»: zip del vínculo + **quiebre seco**
  (chasquido + díada desafinada, corto).
- Agotados: aire descendente, blip 3 → 2 → 1 con tono descendente, indicador que se vacía, **stop limpio** en 0 y sello de goma.
- Cliente: rodado con paneo centro→der, golpe hueco contra el plato vacío, rodado der→izq, contacto, **impresora térmica**
  y corte de papel del ticket.
- Preferencia ≠ compra: ticket = papel sólido a la izquierda; 1.ª opción = aire hueco a la derecha; **par L sólido / R hueco**
  (+70 ms, distinto timbre: se distingue también en mono). Eco del par en «vender más ≠ gustar más».
- Gráficas/disponibilidad: ratchet corto, par de clicks, impacto ligero ámbar, aire interrogativo.
- Dos preguntas: swish en el corte a negro (hueco de voz), confirmación variada, divisor L→R, **chips con slot-in en
  3 notas ascendentes**, díada suspendida en «respuesta abierta».
- Frase para copiar: exhalación en el corte, tick en «agrega:», **un acento limpio por pregunta** (C5, luego E5) y reposo.
- Remate: aire ascendente, clink del plato verde que llega, papel del Excel aparte, pin de «mi gusto», tick seco y
  **arpegio verde G-B-D-G** con cola completa hasta ~44,5 s.
- Sin cama ni textura continua: se evaluó y se descartó para no fatigar.

## Archivos
| Qué | Ruta |
|---|---|
| Video V15 (trabajo) | `renders/erick-artificial-v15-diseno-sonoro.mp4` |
| Video V15 copia limpia + recibo | `delivery/limpios/erick-artificial-v15-diseno-sonoro.mp4` (+`.limpieza.json`; verificar → `metadata_gate_pass=true`, código 0) |
| Portada (reutilizada, byte-idéntica a V14 limpia) | `delivery/limpios/portada-v14.png` + recibo original `portada-v14.png.limpieza-V14-original.json` |
| Stem voz intacta | `audio/stems/voz-v15-stem-intacta.wav` (SHA = BASE `voz-v14-nivelada-48k.wav`, `4acdeb71…9d89`) |
| Stem SFX (final, con ducking) / previo | `audio/stems/sfx-v15-stem.wav` / `sfx-v15-preduck.wav` (float 32) |
| Mezcla | `audio/stems/mezcla-v15.wav` (24 bit) y `audio/mezcla-v15.m4a` (la del MP4) |
| Biblioteca SFX propia | `audio/biblioteca-sfx/c01…c63.wav` (procedurales; SHA en el manifiesto) |
| Manifiesto de cues | `audio/cues-v15.json`: id, contacto, inicio, acción, sonido, ganancia, pan, variación, origen, onset/ápice medidos |
| Fuentes | `source/sfx/sfxlib.py` (síntesis), `cues.py` (hoja), `mezclar.py` (mezcla+medición), `source/mezcla-v15.sh` |
| Evidencia | `evidence/audio/*.json|txt`, `evidence/verificacion/*`, `revision/REVISION-SONORA.md`, `revision/AB-v14-luego-v15.wav` |
| Skills | `skills/` → `delivery/skills-v15.zip`; paquete completo `delivery/entrega-v15.zip`; hashes `delivery/SHA256SUMS.txt` |

## Medido (no es escucha)
| Medida | V14 | V15 |
|---|---|---|
| SHA esencia vídeo (`-map 0:v -c copy -f hash`) | `1ef72c46…0710` | **igual** (trabajo y limpia) |
| Duración / cuadros | 44,800 s / 1344 | 44,800 s / 1344 |
| ffmpeg ebur128, archivo tal cual | −16,0 LUFS (mono) | −13,0 LUFS (estéreo L=R) |
| ffmpeg ebur128, mismo formato | V14 en L=R: −13,0 | V15 L=R: −13,0 · suma mono V15: −16,0 |
| LRA | 1,7 LU | 1,7 LU |
| Pico (ebur128 peak) | −1,7 dBFS | −1,3 dBFS; pyloudnorm/×4: −1,32 dBTP; 0 muestras en clip |

La diferencia −16/−13 es **conteo de canales** (mono vs L=R en BS.1770), no un cambio de volumen; con el mismo medidor y
disposición, V14 y V15 dan lo mismo. No se ajustó ganancia por ello. Explica también la discrepancia Claude −16 / Earshot −13.

- Voz dentro de la mezcla = stem intacto (mezcla − SFX = voz, tolerancia 1e-7), ganancia unidad, **sin limitador ni compresión**.
- Δ de nivel por frase (mezcla en mono vs voz sola): máx. **0,14 dB** en 32 frases. Voz sobre SFX por frase: mín. **14,9 dB** (f07).
- SFX stem −27,8 LUFS. Ducking 6 dB + muesca 2–4,5 kHz sólo bajo voz. Un ajuste local de SFX por pico a 13,04 s (sello).
- Sincronía: 52 transientes con onset a ≤ 15 ms del contacto visual; los que tienen ápice tardío lo tienen por diseño
  (ratchets crecen hacia el cierre, rodados/trazos duran lo que dura el movimiento). 11 aires con preparación: ápice entre
  −24 y +261 ms del contacto. Correlación L/R 0,9995 (estéreo moderado); la suma mono no pierde ningún dato.
- Balance espectral: SFX con menos energía relativa que la voz por encima de 8 kHz (−21,4 vs −17,4 dB).
- Cola final: el arpegio termina antes de 44,8 s (últimos 30 ms en silencio digital): no hay cola cortada.
- Reproducibilidad: dos renders → muestras idénticas; mezcla/AAC/MP4 bit-idénticos al re-ejecutar.

## Límites (declarados)
- **No hubo escucha.** No tengo capacidad perceptiva de audio en esta sesión: todo lo anterior es medición y análisis
  (niveles, espectro, sincronía calculada). Tampoco visionado 1x con audio. Queda para Codex/Earshot y para Erick:
  A/B en `revision/AB-v14-luego-v15.wav` (V14 en L=R, 1 s de silencio, V15).
- Las herramientas Earshot no estaban expuestas en esta sesión; no se invocaron ni se simularon.
- Juicios a confirmar al oído: si el ratchet bajo «ochenta rojos, cincuenta verdes» distrae, si el sello sobre «días»
  pesa, si la impresora suena convincente y si 14,9 dB de margen deja los SFX suficientemente presentes en el móvil.
  Palancas: `SFX_GAIN_OFFSET` (global), `gain_db` por cue en `cues.py`, `DUCK_DB` en `mezclar.py`.
- Sin prueba de audiencia: no se afirma más retención ni «dopamina».

## Reproducir
```sh
# desde produccion-v15 (Git Bash)
sh source/mezcla-v15.sh
PY=C:/Users/erick/OneDrive/Documentos/motion-toolkit/.venv/Scripts/python.exe
"$PY" -X utf8 C:/Users/erick/Documents/Respaldo/E/Canales/_compartido/publicacion/limpiar_metadatos.py preparar renders/erick-artificial-v15-diseno-sonoro.mp4 --salida delivery/limpios/erick-artificial-v15-diseno-sonoro.mp4
```
