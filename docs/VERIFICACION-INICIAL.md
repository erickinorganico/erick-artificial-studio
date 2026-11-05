# Verificación de consolidación · 4 noviembre 2026

- doctor: dependencias, FFmpeg y FFprobe disponibles, sin nuevas instalaciones.
- check: configuración e inputs locales presentes; voz privada con SHA esperado.
- unittest: tres pruebas pasan (traversal de ID, ruta externa y duración inválida).
- stills: seis cuadros generados por el renderer consolidado, fuentes cargadas, Chromium sin errores de página.
- sound: 63 cues reconstruidos; mezcla con voz idéntica, delta máximo por frase0.14dB, cero muestras en clipping, pico verdadero estimado−1.32dBTP.
- verify: decode completo44.8s/1080×1920/30fps y esencia visual igual antes/después del mux.
- Git: audio privado, fuentes TTF, builds y medios generados excluidos del índice.

Alcance: se probó render de muestras y reconstrucción sonora completa. El video visual de prueba se importó de V14 a build/ como fixture local no versionado; no se repitió el render de los1344cuadros. No se comprobó instalación limpia en otra máquina ni hubo escucha/visionado perceptivo en este cierre. La copia de build es resultado de desarrollo, sin recibo de limpieza para publicación. Ninguna prueba es aprobación estética.

La voz nivelada mono mide−16.02LUFS; duplicada L=R mide−13.01; mezcla estéreo−12.99 y suma mono−16.00. Es disposición de canales, no una ganancia nueva aplicada a la voz. Los reportes completos están en build/chilaquiles/, excluidos de Git.
