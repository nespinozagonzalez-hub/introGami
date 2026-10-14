# Continuidad · GamiAula / Academia del Orbe

El 13 de octubre de 2026 el usuario decidió **actualizar el repositorio introGami existente**. La creación de un repositorio independiente deja de ser un requisito para publicar el curso.

## Fuente y destino

- Fuente del remaster recuperado: introGami, rama remaster-gamiaula-2-2026, carpeta academia-orbe-remaster, commit 8f8928d8099f079b5ebb77c8fc01751efb63571f.
- Base de main revisada antes de esta actualización: d8935a9c8b79fdc6c95f042121c4437768078247.
- Destino vigente: raíz de introGami, rama main.
- Entrada principal: https://nespinozagonzalez-hub.github.io/introGami/.
- Versión publicada: 2.0.4, con pantalla completa y navegación limitada al ámbito de cada actividad.
- Commit de la aplicación anterior publicada (2.0.3): 3c17c546d8761a9926c2ac3e07335347d052c6b4. GitHub Pages completó el despliegue; portada, módulos e ilustraciones se comprobaron en la web pública.

Los archivos históricos adicionales del repositorio se conservan. El historial de Git permite recuperar la entrada anterior. El iframe que apunta a la entrada principal de introGami conserva su dirección; las páginas nuevas de módulos se encuentran dentro de este mismo repositorio.

## Identidad y reglas

Guías: Maestro Orión, Lira, Kael, Nexo y Valen. Clases: Narrador, Arquitecto, Alquimista, Guardián y Estratega. Atributos: Narrativa, Diseño, Creatividad, Motivación y Estrategia. Talentos en niveles 3, 5 y 8. La elección de retrato no cambia las bonificaciones.

Una misión principal entrega 60 XP y cinco puntos; una secundaria, 25 XP y dos puntos. Los nueve pares de códigos equivalentes acreditan una única misión. El cierre actual consta de cuatro guardianes; ORBE2026 registra un logro local sin XP adicional. Las claves históricas ARC419, NEB264 y CYR905 no generan recompensas nuevas hasta definir una correspondencia pedagógica.

La partida g0100_v8 y sus atributos se conservan dentro del mismo origen. Se puede descargar y recuperar personaje, módulos, bitácoras y usos de ayudas. Si el navegador bloquea el almacenamiento, la interfaz avisa que la partida es temporal.

El curso GamiAula y la tesis Ludaria son proyectos distintos. GamiAula conserva su marca, recursos y contexto de formación docente.

## Evidencia y pendientes

Consultar CHECKLIST_REMASTER.md, QA.md, QA_RESULT.json y ESTADO.json. No tratar un pendiente como terminado.

La configuración de Apps Script ya está en integration/google-sheets/connection-config.json; no hay que pedir su URL otra vez. La comprobación HTTP de salud GET y POST ping respondió ok:true en la etapa anterior. No certifica registro ni escrituras autenticadas desde la página publicada. La sincronización automática permanece desactivada hasta realizar esas pruebas.

Faltan pruebas externas con una invitación ficticia autorizada, permisos de los materiales desde una cuenta estudiante, Moodle real, Safari y Firefox. Los códigos y el estado local de victoria documentan el recorrido lúdico; no prueban identidad ni aprendizaje.

La versión 2.0.3 añade presentación propia por territorio, navegación de estaciones y cierre con enlaces e iframes completos. Las pruebas de esa versión constaban de 18 grupos, sin errores de JavaScript.

## Decisión vigente: Moodle controla el recorrido

El 13 de octubre de 2026 a las 22:11 (Chile), el usuario pidió pantalla completa y separar la navegación. El Centro de Comando queda dedicado al personaje, atributos, inventario y canje. No abre módulos. Los módulos solo permiten moverse por sus propias estaciones: no enlazan al Centro ni a otros módulos. La navegación entre las cinco actividades se realiza en Moodle mediante los iframes existentes. Los códigos se pueden copiar y luego registrar desde la actividad Centro de Comando de Moodle.

El programa oficial permanece en el archivo del módulo 1; las dos lecturas complementarias están en el archivo del módulo 3. Se conserva la partida y no se modifica la lógica de las recompensas.

La versión 2.0.4 pasó 20 grupos de pruebas en Chromium local, incluida pantalla completa real, iframe con permiso y con rechazo, navegación delimitada y cuatro combates completos.

Commit de la aplicación 2.0.4 publicada y verificada: 6ab1231c7fea6232f14c56eba78fb69727055780. El registro de HTTP, archivos y comprobación pública está en PUBLICACION_VERIFICADA.json.
