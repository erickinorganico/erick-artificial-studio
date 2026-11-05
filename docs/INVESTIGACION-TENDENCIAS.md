# Investigación de tendencias · 5 nov 2026

Documento de respaldo de `ESTRATEGIA-CONTENIDO.md §12`. Registra qué se buscó, con qué herramientas, qué se encontró, qué tan confiable es y qué decisiones cambió.

## 1. Método

| Paso | Herramienta | Resultado |
|---|---|---|
| Revisión del repo completo (42 archivos: motor, escenas, sonido, revisiones V14/V15, backlog) | lectura directa | Diagnóstico de fortalezas y cuellos de botella (`ESTRATEGIA §1`) |
| Calibración del ritmo de voz | `episodes/chilaquiles/frases.json` | **117 palabras en 42.2 s = 2.77 palabras/s**, la base para estimar la duración de todos los guiones |
| Inventario de skills disponibles (repo + PC de Erick + plugins) | descripciones de las skills sincronizadas | `MAPA-DE-SKILLS.md` |
| Búsqueda web (8 consultas) | WebSearch | Hallazgos de §2 |
| Filtro de tendencias | `social-media-skills:trend-jacking` (encaje → seguridad → momento) | §3 |
| Método de estrategia | `estrategia-contenido` (4 preguntas de marca, ángulos, empaque, hooks) | Estructura de la estrategia |
| Método de guion | `escritura-guiones-ai-lab` (gancho, un solo juego, diagnóstico del remate, autocrítica) | `skills/guion-erick-artificial` |

**Consultas realizadas:**

1. Tendencias de contenido de IA en español en TikTok, Instagram y Reels en 2026.
2. Video corto educativo a fines de 2026: retención, ganchos, guardados y compartidos.
3. Alfabetización en IA y pensamiento crítico: IA complaciente y alucinaciones.
4. Uso de IA en pymes de México en 2026.
5. Creadores en español sobre pensamiento crítico, IA y datos.
6. Fechas del Buen Fin 2026.
7. Verificación del estudio de Cheng et al. (2026) en *Science*.
8. Motion design minimalista y canales educativos sin presentador.

## 2. Hallazgos

Confiabilidad: **A** = fuente primaria o académica · **B** = prensa con datos de un estudio · **C** = blog de agencia o vendedor (orientativo).

### Audiencia y mercado (México)

| Hallazgo | Conf. | Fuente |
|---|---|---|
| 48 % de las empresas en México usa IA (38 % el año anterior); pymes 47 % | B | [Fast Company MX · AWS/Strand Partners](https://fastcompany.mx/2026/08/14/mexico-aposto-todo-ia-ahora-tiene-aprender-usarla-aws/) |
| **46 % no tiene una forma confiable de medir si su IA le funciona** | B | [Ecosistema Startup](https://ecosistemastartup.com/ia-en-mexico-2026-48-empresas-usan-ia-pero-46-no-sabe-si-funciona/) |
| 57–64 % de las mipymes usa alguna IA (encuesta Microsoft a 300 decisores); la cifra varía por metodología | B | [u-GOB / Microsoft](https://u-gob.com/inteligencia-artificial-en-las-pymes-mexicanas-el-impulso-que-ya-no-pueden-ignorar-microsoft/) |
| Solo una minoría llega a adopción avanzada | B/C | [Inmobiliare](https://inmobiliare.com/borrador-automaticoadopcion-ia-mexico-empresas-2026/), [Agentik](https://agentik.mx/blog/ia-en-los-negocios-mexicanos-en-2026-la-brecha-entre-los-que-la-tienen-y-los-que-la-usan-de-verdad) |

**Lectura:** la audiencia ya usa IA. El dolor no es «¿cómo empiezo?», sino «¿le creo?». Eso confirma el posicionamiento.

### Comportamiento de los modelos (pilar P2)

| Hallazgo | Conf. | Fuente |
|---|---|---|
| *Science* (Cheng et al., mar 2026): 11 modelos; la IA afirmó las acciones del usuario **49 % más que las personas**; la gente calificó a la IA aduladora como **más confiable** y dijo que volvería a ella. DOI 10.1126/science.aec8352 | A | [EBSCO](https://www.ebsco.com/articles/psychology/b97e12e3-f8f7-57bb-b906-7956732ee30e/sycophantic-ai-decreases-prosocial-intentions-and-promotes-dependence), [Fortune](https://dc.fortune.com/2026/03/31/ai-tech-sycophantic-regulations-openai-chatgpt-gemini-claude-anthropic-american-politics) |
| La complacencia sesga qué información ves sin decir nada falso; es distinta de la alucinación | A | [arXiv 2602.14270](https://arxiv.org/html/2602.14270v1) |
| En 2026 los modelos siguen alucinando; los estudiantes piden transparencia sobre límites | A/B | [Duke University Libraries](https://blogs.library.duke.edu/blog/2026/01/05/its-2026-why-are-llms-still-hallucinating/) |

**Lectura:** P2 tiene respaldo científico y está en la conversación pública. Por eso ep04 sube a la semana 3 y cita el estudio.

### Formato y plataformas

| Hallazgo | Conf. | Fuente |
|---|---|---|
| El video vertical corto sigue dominando; el educativo de 30–90 s funciona | C | [Klap](https://klap.app/blog/short-form-video-trends), [Hoy](https://hoy.com.do/vivir/tecnologia/inteligencia-artificial-2026-ig-tiktok-clics-mueven-tecnologia_1074047.html) |
| Guardados y compartidos pesan más que los likes para explicadores; el final es donde ocurren | C | [Terra Market Group](https://www.terramarketgroup.com/blog/short-form-video-retention-hooks-2026-30-tested-opening-patterns-for-reels-tiktok-and-shorts), [Jetfuel](https://jetfuel.agency/how-to-optimize-short-form-video-content-for-success/) |
| Ganchos de brecha de curiosidad superan a los instructivos | C | [Klap · hooks](https://klap.app/blog/hook-examples) |
| Carruseles educativos «guardables» al alza | C | [Vilma Núñez](https://vilmanunez.com/como-crear-contenidos-con-ia-para-tu-marca-personal-en-2026/), [Accio](https://es.accio.com/business/reel-trends-on-instagram) |
| Las redes funcionan como buscador: un reel educativo bien titulado sigue trayendo tráfico durante meses | C | [Content Society](https://contentsociety.co/blog/tendencias-instagram-2026) |
| Fatiga del contenido repetitivo y auge de las voces reconocibles | C | [Clipiku](https://clipiku.com/blog/tendencias-de-tiktok-en-2026-lo-que-debes-saber), [HICARI](https://hicari.io/tendencias-redes-sociales-2026/) |
| El motion minimalista sin presentador se está abaratando con IA (cursos de «motion graphics a $0») | C | [AI Fire (podcast)](https://metacast.app/podcast/ai-fire-daily/YfRCG9xp/335-max-the-0-motion-graphics-empire-viral-dan-koe-style-in-20-mins/89HBMZ1V), [videoexplainers](https://videoexplainers.com/?p=17425) |

**Lectura:** el formato del canal (45–60 s, frase para copiar al final y carrusel derivado) va con lo que hoy premian las plataformas. Pero **la estética minimalista dejó de ser diferencial**: el foso es el rigor, el código de color y la persona de Erick.

### Competencia

| Hallazgo | Conf. | Fuente |
|---|---|---|
| No aparecieron creadores en español centrados en criterio o pensamiento crítico con IA; los rankings de «tiktokers de IA» son comerciales y sin metodología | C | [Upliora](https://www.upliora.es/comparativas/mejores-tiktokers-ia-espana-2026), [UNIR](https://vidasdigitalesunir.org/material/ia-6-estrategias-de-uso-critico-como-entender-la-ia-en-tiktok/) |

**Lectura:** es un indicio de hueco, **no una prueba**. Hay que confirmarlo con una revisión manual (ver §5).

### Calendario México

| Hallazgo | Conf. | Fuente |
|---|---|---|
| Buen Fin 2026: viernes 13 a martes 17 de noviembre; lunes 16 es puente | B | [UnoTV](https://www.unotv.com/negocios/el-buen-fin-2026-durara-cinco-dias-la-edicion-16-sera-del-13-al-17-de-noviembre/), [Bloomberg Línea](https://www.bloomberglinea.com/latinoamerica/mexico/proximo-puente-en-mexico-coincidira-con-el-buen-fin-estos-son-los-festivos-que-quedan-en-2026/) |

## 3. Filtro de tendencias (`trend-jacking`)

| Tendencia | Encaje | Seguridad | Momento | Decisión |
|---|---|---|---|---|
| Buen Fin (13–17 nov) | ✅ «¿contra qué comparo?» | ✅ (sin acusar tiendas) | ✅ subiendo; ventana corta | **Especial Buen Fin** con plan B en carrusel |
| IA complaciente (*Science* 2026) | ✅ P2 | ✅ | ⚠︎ estudio de marzo, pero tema vigente y perenne | Ep04 sube a la semana 3 y cita la fuente |
| Aguinaldo / diciembre | ✅ | ✅ | ✅ | Ep06 (contexto faltante) |
| Propósitos de año nuevo | ✅ fuente inventada | ✅ | ✅ última semana de diciembre | Ep07 |
| Día de Reyes | ✅ muestra chica | ✅ (tradición, sin religión ni marcas) | ✅ 6 ene | Ep08 |
| «AI psychosis» / salud mental | ⚠︎ | ❌ tema sensible, riesgo de explotación | — | **No se toca** |
| Noticias de lanzamientos de modelos | ❌ fuera del posicionamiento (caducan) | — | — | No |

## 4. Decisiones que cambiaron por la investigación

1. Nuevo **especial Buen Fin** (5.º guion) con carril rápido y plan B en carrusel.
2. **Ep04 sube a la semana 3** y cita el estudio de *Science*.
3. **Ep06 cambia** de estacionalidad a contexto faltante, para no repetir la lección del Buen Fin.
4. **Primera línea del caption con frase de búsqueda** en todos los guiones nuevos («¿La IA inventa datos?», «¿Cómo saber si un producto nuevo gusta?»).
5. **Fuentes primarias** en los episodios P2 (ep04, ep07).
6. **Transparencia sobre la voz con IA** como recomendación (decisión de Erick, ver `DIRECCION-VOZ.md`).
7. **El diferencial pasa de la estética al rigor, el código de color y la persona.**

## 5. Límites y pendientes

- **`hypit` y `watch` no se usaron:** viven en la PC de Erick (`C:\Users\erick\Documents\Ai Lab School OS\.agents\skills\`) y la sesión no tenía acceso a esa computadora ni a esas herramientas. Pendiente: analizar con `hypit` y `watch` 3 creadores medianos del nicho (`estrategia-contenido §4`) y los 3 reels de referencia de `mono-volumetrico` (DfNcyobtoWE, DeuYyrdNq8n, DeeMfY7tEbS).
- **Métricas propias:** el canal aún no publica. Línea base después de 4–6 episodios con `auditoria-redes-ai-lab` o Windsor (`windsor-ai:social-report`) si se conectan las cuentas.
- **Cifras de blogs (C):** orientativas; las plataformas no publican sus pesos de ranking.
- **Cifras de pymes:** varían por estudio y metodología (47–64 %); al citarlas, nombrar el estudio.
