# Dirección de voz y sonido · Erick Artificial

Reúne en un solo lugar las reglas de voz y sonido. Las reglas de seguridad de créditos vienen de la skill `voz-elevenlabs`; la nivelación, de `skills/mono-volumetrico/scripts/nivelar_voz.py`; el sonido, de `skills/mono-volumetrico/sonido/DISENO-SONORO-Y-MEZCLA.md`.

## 1. La voz

| Aspecto | Regla |
|---|---|
| Quién | La voz de **Erick Inorgánico**, generada con su autorización mediante su conexión de ElevenLabs (`docs/PROCEDENCIA.md`). No se concede licencia pública de la voz. |
| Persona | Erick en primera persona: alguien que usa la IA en su negocio y su vida, curioso, con humor seco. **No es profesor ni presentador**: cuenta lo que le pasó. |
| Tono por bloque | Pregunta: curiosidad genuina · Cuenta: neutral, cita a la IA · **Grieta: pausa breve antes de «Pero» y subida suave en «¿respondió bien?»** · Imagina: narrativo, más lento · Regla: claro, sin sermón · Frase para copiar: pausada, como dictando · Remate: seco, sin reírse del propio chiste |
| Ritmo | **2.8 palabras/s** (medido en ep01). Guiones de 120–160 palabras → 45–58 s |
| Pausas | Las marca la puntuación del guion: punto = pausa; «…» = suspenso; el remate va después de una pausa de ~0.5 s |
| Números | Escritos como se pronuncian en el texto para TTS («ochenta», «ciento ochenta pesos»); en pantalla, en cifra |
| Etiquetas de emoción | No van dentro del texto a pronunciar. En V14 se usaron etiquetas automáticas y quedó pendiente confirmar que no se oyeran. Si se usan, verificar con escucha o transcripción. |
| Marcas | La voz nunca nombra productos (ChatGPT, Gemini…). Dice «la IA». |

## 2. Generación (puerta G2)

Una voz nueva requiere **guion aprobado (G1) + autorización vigente de Erick (G2)**. Ninguna herramienta local genera voz por sí sola. Al generar, se sigue la skill `voz-elevenlabs`:

1. Revisar el manifiesto (`voz-elevenlabs.json`) y el candado (`voz-lock.json`). Si ya existe una toma para el mismo `guion_sha256`, **no se genera**.
2. Escribir el candado **antes** de llamar a ElevenLabs.
3. **Una sola toma** (`generations_count = 1`). Nunca repetir una llamada para «reintentar»: cobra otra vez.
4. Guardar el audio en `episodes/<id>/private/` (excluido de Git), registrar `generation_id`, créditos y SHA, y liberar el candado.
5. Transcripción con tiempos por palabra: una vez por toma, si hace falta.

## 3. Post-producción de voz

| Paso | Herramienta | Valor objetivo |
|---|---|---|
| Nivelación por frase | `nivelar_voz.py` | ±4 dB hacia la mediana; rampas en pausas |
| Compresión | `nivelar_voz.py` | 2:1 suave |
| Loudness | loudnorm lineal en 2 pasadas | **−16 LUFS mono / −1.5 dBTP** (equivale a −13 LUFS en L=R: es la disposición de canales, no una ganancia) |
| Frases | `silencedetect` −34 dB / 80 ms → `frases.json` | Número y orden de tramos = puntuación del guion |
| Verificación | BS.1770 por frase, antes y después | Documentar que segmentar por pausas no verifica las palabras: hace falta escucha humana |

## 4. Sonido

| Regla | Valor |
|---|---|
| Música | **No**, salvo que el expediente la pida |
| SFX | Procedurales y declarados como tales (`sfxlib.py`, semillas fijas). Sin SFX de ElevenLabs (gastan créditos) |
| Vocabulario | Una familia por significado: clink = objeto cerámico · ratchet + clunk = conteo · 2 notas de mallet = confirmación · snap seco = grieta · drain + blip = vacío · papel/sello/impresora = registro · par sólido/hueco = contraste A ≠ B · arpegio corto = remate |
| Cantidad | Ep01 tiene 63 sonidos en ~48 eventos; está pendiente el A/B para saber si distrae. **Episodios nuevos: menos eventos** hasta que el A/B diga lo contrario |
| Mezcla | Voz bit-exacta a ganancia unidad, sin limitador · ducking de 6 dB solo sobre SFX · muesca de 2–4.5 kHz bajo la voz · voz ≥ 12–15 dB sobre SFX en cada frase |
| Entrega | AAC 256k estéreo 48 kHz · pico ≤ −1 dBTP · 0 clipping · mux con `-c:v copy` |

## 5. Transparencia (decisión pendiente de Erick) ⚠︎

La voz es una **clonación autorizada**. Recomendación:

- Declararlo en la bio («Voz: Erick, generada con IA») y activar la etiqueta de contenido con IA de cada plataforma cuando aplique.
- Motivo: un canal que enseña criterio con IA gana confianza siendo transparente con su propio uso de IA, y las plataformas piden etiquetar contenido realista generado con IA.

## 6. Lo que la medición no cubre

Ninguna medición sustituye la **escucha humana a 1x** (puerta G3). En particular: que las cifras se oigan correctas, que no se oigan etiquetas, la naturalidad de frases niveladas al límite (+4 dB) y si los SFX distraen en el teléfono, con audífonos y en mono.
