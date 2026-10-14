# Pruebas de Academia del Orbe 2.0.5

Resultado local: **26 grupos aprobados y cero errores de JavaScript**. Revisión estática: **23 scripts y 73 referencias locales**, con el catálogo de 16 recursos originales intacto. Detalle automático: QA_RESULT.json. Checklist legible: CHECKLIST_FUNCIONAMIENTO.md.

## Alcance comprobado

La batería utiliza perfiles ficticios en Chromium. Comprueba las cinco clases y sus bonificaciones, retratos, atributos, inventario, equivalencias de códigos, crédito único, recuperación de partidas, exportación/importación, modos de almacenamiento, guías y acceso por teclado.

Completa las evaluaciones y actividades secundarias de los módulos 1–3, guarda bitácoras, revisa la navegación interna y la copia manual de fragmentos. Los cinco atributos se prueban en niveles 3, 5 y 8. En un caso aislado del RPG se prepara vida perdida y enfriamiento para comprobar curación, escudo, recarga y límites de uso; ese caso no concede victorias ni recompensas.

La pantalla completa nativa entra y sale en las cinco vistas. En un iframe sin permiso se abre la alternativa de la misma actividad. La ausencia de la API se simula explícitamente en Chromium: no se presenta como una prueba en Safari ni en un iPhone físico.

La vista amplia se prueba con almacenamiento bloqueado, personaje temporal, respuestas parciales, misión completada, sincronización al iframe y retorno al curso. La transferencia se limita a las claves del juego, no coloca datos de partida en URLs y no sobrescribe otra copia de almacenamiento fuera de Moodle. También se comprueban el bloqueo de ventanas y una apertura sin actividad de origen.

Los cuatro guardianes se vencen mediante preguntas y comandos en vista amplia, devolviendo las victorias al módulo original. Se aceleran animaciones; no se modifican respuestas ni se fuerzan victorias. ORBE2026 requiere esas cuatro victorias y no duplica XP.

La presentación se revisa en cinco vistas a 390, 480, 768, 1024, 1366 y 1920 px, y en entradas estrechas a 240, 280, 315 y 340 px. No se encontró desbordamiento horizontal; las imágenes cargaron correctamente. Las capturas finales de la vista amplia y el Centro estrecho se inspeccionaron durante la implementación.

## Capturas del usuario y límite de iPhone

Las capturas aportadas muestran Centro y módulo 1 renderizados dentro de campus.gamiaula.com. El mensaje corresponde a la rama que detecta ausencia de la API para pantalla completa de páginas. La limitación está documentada en WebKit: https://bugs.webkit.org/show_bug.cgi?id=310661.

Abrir vista amplia abre únicamente la actividad actual fuera del iframe. No es pantalla completa nativa de iPhone y no oculta las barras de Safari. Mantener abierta la pestaña del curso. En el RPG se abre antes de iniciar el combate: el estado transitorio de un duelo ya en marcha no se traslada a otra ventana.

## Pendientes externos

- Probar vista amplia, transferencia y Volver al curso en el iPhone real y Moodle real; sus políticas pueden restringir ventanas o acceso a la actividad original.
- Probar Firefox y Safari reales.
- Confirmar la fecha de apertura de módulo 1 que figura en la captura: 12 de noviembre de 2026, 23:00.
- Verificar permisos de los 18 recursos con cuenta estudiante.
- Registro y escrituras autenticadas con Google Sheets. La sincronización automática permanece desactivada.

Las comprobaciones HTTP de salud anteriores no prueban operaciones autenticadas. Los códigos y victorias son progreso lúdico local; no prueban identidad institucional ni aprendizaje. La checklist no declara terminadas estas pruebas externas.
