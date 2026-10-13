# Pruebas de Academia del Orbe 2.0.3

Resultado: **18 grupos aprobados y cero errores de JavaScript** en Chromium local. Fecha: 13 de octubre de 2026. Detalle automático: `QA_RESULT.json`.

## Comprobado

- Creación y persistencia de las cinco clases, con su bonificación correcta.
- Recuperación de una partida anterior: XP y atributos conservados; alias de misión normalizados sin crédito duplicado.
- Nueve recompensas: 330 XP y 27 puntos; rechazo de duplicados, códigos desconocidos y nuevas recompensas heredadas del módulo 4.
- Coste de mejoras de atributo, talentos desbloqueados y registro de valor anterior/nuevo.
- Cinco NPCs con diálogo que avanza, Escape y foco de teclado dentro del modal.
- Biblioteca: 16 enlaces originales y dos lecturas complementarias.
- Módulos 1–3: quizzes con respuestas incorrectas y correctas; pareados, aplicación, verdadero/falso, crucigrama y dos memorices completados mediante sus controles.
- En el memorice fallido se ven las dos cartas antes de ocultarse.
- Bitácoras guardadas, ayudas de Narrativa diferenciadas hasta nivel 8 y límite de descartes de Estrategia.
- Exportación y recuperación conjunta de personaje, progreso de módulos y bitácoras.
- Personaje y módulos siguen cargando cuando se bloquea localStorage; el aviso distingue la partida temporal.
- Iframe de ensayo: perfil compartido y navegación de ida/vuelta.
- Cuatro guardianes vencidos respondiendo sus preguntas y usando los comandos de combate. La prueba acelera los temporizadores de animación; no modifica las respuestas ni fuerza la victoria.
- ORBE2026 requiere cuatro guardianes y registra un logro sin XP repetida.
- Cinco vistas y pantalla de combate a 390, 480, 768, 1024, 1366 y 1920 px: sin desbordamiento horizontal. Las imágenes visibles de las vistas cargaron correctamente.
- Revisión estática: sintaxis de 21 scripts y 72 referencias locales; catálogo original intacto.
- Endpoint Apps Script: GET de salud y POST `ping` por HTTP devolvieron `ok:true`.

## Alcance y pendientes

Las capturas del ensayo se inspeccionaron durante la implementación. El iframe local no sustituye una prueba real de Moodle. Faltan permisos de Drive/YouTube con cuenta estudiante, Moodle real, Safari y Firefox.

La prueba de navegador hacia Apps Script no logró completar la comunicación desde este entorno. No se atribuye la causa exclusivamente a CORS. Los resultados HTTP de salud no prueban operaciones autenticadas, persistencia de alumnos ni sincronización entre dispositivos. La sincronización automática permanece desactivada hasta realizar estas pruebas con una invitación ficticia autorizada y desde el origen publicado.

Los códigos y la victoria se validan localmente; no constituyen autenticación institucional ni evidencia segura de aprendizaje. La dificultad y el equilibrio de los apoyos deben observarse en un pilotaje con el grupo real.

## Comprobaciones nuevas de esta versión

- Retrato independiente de la clase, guardado y visible en el HUD.
- Botón de continuación y recuperación explícita de un fragmento descubierto, sin doble crédito.
- Seis ilustraciones integradas; transparencia de los cinco personajes conservada en WebP.
- Imágenes de guías, tarjetas de territorios y sprites de combate inspeccionadas en escritorio y móvil.
- Iconos vectoriales para las estaciones, sin depender de fuentes emoji.

## Publicación comprobada (2.0.3)

GitHub Pages publicó correctamente el commit 3c17c546d8761a9926c2ac3e07335347d052c6b4. La portada, los cuatro módulos, el manifiesto y los archivos de navegación respondieron HTTP 200; sus bytes coincidieron con la copia probada mediante comparación SHA-256. El manifiesto público indicó la versión 2.0.3. La portada del módulo 1 se inspeccionó visualmente en la web pública. El ajuste final de encuadre mantiene visible el rostro de los guías. Evidencia: PUBLICACION_VERIFICADA.json.

## Mejoras de los cuatro módulos (2.0.3)

- Entradas ilustradas con guía, propósito, progreso y acceso a los cuatro territorios.
- Texto inicial más breve y acceso de inicio antes de la descripción de la ruta.
- Navegación anterior/siguiente por las seis estaciones y foco en el título de destino.
- Continuación de la estación guardada; cierre con acceso al módulo siguiente tras superar las tres misiones.
- Copia de fragmentos con alternativa manual si el portapapeles está bloqueado.
- Enlace directo a la bóveda de Nexo mediante #codigos.
- Etiquetas para palabras y asociaciones; estación actual identificada para tecnologías de asistencia.
- Bienvenida ilustrada del RPG y cierre final visible solo tras vencer a los cuatro guardianes.

La batería de 18 grupos incluye el nuevo recorrido, copia manual, enlaces entre módulos y cierre del RPG. Las 24 entradas finales se comprobaron en seis anchos; los cambios finales de texto y posición del botón de inicio no cambian las actividades.
