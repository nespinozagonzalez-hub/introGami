# Checklist de funcionamiento · GamiAula 2.0.5

Resultado local: **26 grupos aprobados, cero errores de JavaScript**, 23 scripts y 73 referencias locales comprobados.

Esta revisión distingue comprobaciones automáticas de pruebas pendientes en el dispositivo y Moodle reales. El resultado de ejecución está en QA_RESULT.json; el detalle técnico, en QA.md. Las pruebas usan perfiles ficticios locales y no escriben datos de estudiantes en Sheets.

## Centro de Comando

- [x] Cinco clases: nombre, bonificación inicial y persistencia.
- [x] Retrato independiente de la clase y visible en el perfil.
- [x] Inventario, XP, puntos, atributos y talentos.
- [x] Códigos originales y equivalentes: recompensa única, sin duplicados.
- [x] Recuperar fragmentos descubiertos en los módulos.
- [x] Copia JSON y recuperación de personaje, módulos, bitácoras y ayudas.
- [x] Ausencia de accesos a misiones o a otros módulos.
- [x] Cinco guías: diálogo, teclado, cierre y foco.

## Módulos 1–3

- [x] Evaluaciones principales: respuestas correctas e incorrectas, resultado y código.
- [x] Pareados, clasificación, verdadero/falso, palabras clave y memorices.
- [x] En un memorice fallido se ven las dos cartas antes de ocultarse.
- [x] Ayudas de Narrativa, Diseño, Creatividad, Motivación y Estrategia.
- [x] Diferencias de ayuda en atributos 3, 5 y 8; límites de Estrategia.
- [x] Bitácoras: escritura, guardado y recuperación.
- [x] Navegación anterior/siguiente dentro del mismo módulo.
- [x] Cierre sin enlaces al Centro o al módulo siguiente; Moodle organiza el recorrido.
- [x] Copia de fragmentos con alternativa manual si el portapapeles está bloqueado.
- [x] 16 recursos originales y dos lecturas conservados en los archivos de los módulos.

## RPG final

- [x] Cuatro guardianes en orden y 25 preguntas por banco.
- [x] Cuatro combates completos con comandos y preguntas, sin forzar victorias.
- [x] Escudo de Diseño, recuperación de Motivación y recarga de Creatividad.
- [x] Estrategia descarta una alternativa incorrecta; Narrativa ofrece contexto.
- [x] Límites de uso y conservación de la respuesta correcta.
- [x] ORBE2026 exige cuatro victorias y no duplica XP.

## Pantalla completa y alternativa móvil

- [x] Pantalla completa nativa: entrada y salida en las cinco vistas.
- [x] Iframe con permiso para pantalla completa.
- [x] Iframe sin permiso: alternativa para abrir la actividad actual.
- [x] Navegador sin la API: botón Abrir vista amplia dentro del iframe.
- [x] Vista amplia del Centro: mismo personaje, códigos y retorno al curso.
- [x] Vista amplia del módulo: conserva respuestas parciales y devuelve la misión completada.
- [x] Cuatro combates en vista amplia y victorias devueltas al iframe original.
- [x] Bloqueo de ventanas: aviso que se puede cerrar, sin borrar la partida.
- [x] Apertura sin la actividad original: se impide continuar con un personaje ajeno.
- [x] Transferencia limitada a claves del juego; datos fuera de la URL.
- [x] La vista amplia no sobrescribe otra copia guardada fuera de Moodle.

La vista amplia abre únicamente la actividad actual en otra pestaña; no es pantalla completa nativa de iPhone ni oculta las barras del navegador. Mantener abierta la pestaña original de Moodle. En el RPG, abrirla desde la cámara de guardianes antes de iniciar un combate: un duelo que ya está en marcha permanece en su vista original.

## Presentación y estabilidad

- [x] Cinco vistas a 390, 480, 768, 1024, 1366 y 1920 px, sin desbordamiento horizontal.
- [x] Cinco entradas a 240, 280, 315 y 340 px para marcos estrechos de Moodle.
- [x] Seis ilustraciones cargan y conservan la identidad visual.
- [x] Modo temporal si el navegador bloquea el almacenamiento.
- [x] Sintaxis de JavaScript, rutas locales, catálogos y JSON.
- [x] Cero errores de JavaScript en la batería final.
- [x] Publicación 2.0.5: 12 archivos públicos responden HTTP 200 y coinciden con la copia probada. Evidencia: PUBLICACION_VERIFICADA.json.

## Pendientes externos

- [ ] Confirmar la apertura del módulo 1: en la captura aparece 12 de noviembre de 2026, 23:00. Es una fecha de Moodle, no un fallo del HTML.

- [ ] Probar Abrir vista amplia y Volver al curso en el iPhone real dentro de campus.gamiaula.com.
- [ ] Confirmar transferencia y retorno con las políticas reales de Safari, el campus y el bloqueo de ventanas.
- [ ] Probar Firefox y Safari reales; una simulación en Chromium no certifica esos navegadores.
- [ ] Comprobar permisos de videos/documentos con una cuenta de estudiante.
- [ ] Probar registro, canje y escrituras autenticadas de Google Sheets.
- [ ] Activar sincronización solo después de comprobar esas operaciones.

La checklist no declara terminadas las pruebas externas pendientes. Los códigos locales y las victorias documentan avance lúdico; no autentican identidad ni certifican aprendizaje.
