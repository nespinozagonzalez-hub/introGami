# Pruebas de Academia del Orbe 2.0.4

Resultado: **20 grupos aprobados y cero errores de JavaScript**. Revisión estática: 22 scripts, 69 referencias locales y 16 recursos originales.

La batería de navegador se ejecuta con perfiles ficticios en Chromium local. El resultado automático actual está en QA_RESULT.json. La versión 2.0.4 modifica pantalla completa y navegación, conservando actividades, recompensas y almacenamiento.

## Verificación funcional

- Cinco clases y bonificaciones; retrato independiente y guardado.
- Centro dedicado al personaje, inventario, atributos y códigos, sin accesos a módulos.
- Recuperación de fragmentos desde la actividad Centro y ausencia de crédito duplicado.
- Partidas anteriores, alias de códigos, atributos, XP, talentos y auditoría de decisiones.
- Cinco NPC y modales accesibles mediante teclado.
- Catálogo completo: nueve videos, seis documentos y programa oficial; dos lecturas complementarias. El programa se encuentra en el archivo del módulo 1 y las lecturas en el archivo del módulo 3.
- Módulos 1–3: evaluaciones, actividades secundarias, bitácoras, ayudas por atributo y límite de descartes.
- Navegación anterior/siguiente dentro del módulo; ausencia de enlaces al Centro o al módulo siguiente, incluso después de completar las tres misiones.
- Copia de fragmentos con alternativa manual cuando el portapapeles está bloqueado.
- Exportación y recuperación de personaje, módulos y bitácoras; modo temporal si el almacenamiento está bloqueado.
- Iframe de ensayo: el contenedor que representa Moodle cambia la actividad, conservando el perfil.
- Pantalla completa: entrada y salida reales en Centro y cuatro módulos; permiso concedido y rechazo controlado por Permissions Policy en un iframe.
- Pantalla completa disponible durante el combate; cuatro guardianes vencidos respondiendo preguntas mediante controles. Se aceleran animaciones, sin forzar victoria ni modificar respuestas.
- ORBE2026 requiere los cuatro guardianes y no duplica XP.
- Cinco vistas a seis anchos: 390, 480, 768, 1024, 1366 y 1920 px; ausencia de desbordamiento horizontal y de imágenes ausentes.

## Límites externos

El ensayo de iframe no sustituye la prueba en el Moodle real, Safari y Firefox. Moodle debe conservar allowfullscreen y allow="fullscreen; clipboard-write" en los marcos. El botón de pantalla completa muestra un aviso cuando el navegador o Moodle rechaza la solicitud y no cambia la ruta de la actividad como alternativa.

La sincronización con Google Sheets permanece desactivada. Las comprobaciones HTTP de salud anteriores no prueban registro ni escrituras autenticadas. También faltan permisos de recursos con cuenta estudiante. Los códigos y el estado de victoria son progreso lúdico local; no prueban identidad institucional ni aprendizaje.

Referencia técnica: https://developer.mozilla.org/en-US/docs/Web/API/Element/requestFullscreen.
