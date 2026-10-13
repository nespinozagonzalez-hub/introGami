# Academia del Orbe · continuidad del proyecto

## Acuerdos recuperados

Este es el remaster GamiAula 2.0 del curso **Gamificación de 0 a 100**. La fuente autorizada es `nespinozagonzalez-hub/introGami`, rama `remaster-gamiaula-2-2026`, carpeta `academia-orbe-remaster`.

Repositorio independiente solicitado: **nespinozagonzalez-hub/gamiaula-academia-del-orbe**. El usuario autorizó su creación pública en el chat anterior. El conector actual puede editar GitHub, pero no crear repositorios. Esa operación requiere una sesión en la interfaz de GitHub.

Se conservan los proyectos originales y los enlaces a nueve videos, seis documentos y el programa oficial. No se reemplazan sus iframes existentes. La experiencia remaster tendrá enlaces nuevos cuando se publique su repositorio independiente.

Identidad: Academia del Orbe. Guías: Maestro Orión, Lira, Kael, Nexo y Valen. Clases: Narrador, Arquitecto, Alquimista, Guardián y Estratega. Atributos: Narrativa, Diseño, Creatividad, Motivación y Estrategia. Talentos en niveles 3, 5 y 8.

El curso y la tesis Ludaria son proyectos distintos. Esta implementación se inspira en su experiencia narrativa y conserva GamiAula como marca del curso.

## Estructura actual

- `index.html`: Centro de Comando, mapa, personaje, inventario, códigos, biblioteca y recuperación de partida.
- `modulos/1/`: Valle del Primer Despertar, quiz, pareados y memorice.
- `modulos/2/`: Forja de Herramientas, quiz, aplicación y verdadero/falso.
- `modulos/3/`: Arquitectura y Flow, quiz, crucigrama y memorice.
- `modulos/4/`: Consagración del Orbe, cuatro guardianes con 25 preguntas cada uno.
- `shared/`: navegación, diálogos, almacenamiento, accesibilidad y ayudas por atributo.
- `backend/Code.gs`: instalador y API de Google Sheets recuperados del paquete entregado.
- `integration/google-sheets/`: configuración existente y diagnóstico de conexión.
- `tests/` y `scripts/`: pruebas repetibles y revisión de sintaxis/rutas.

## Reglas que deben conservarse

Una misión principal entrega 60 XP y 5 puntos; una secundaria, 25 XP y 2 puntos. Los nueve pares de códigos equivalentes acreditan una única misión. La clase suma un punto al atributo correspondiente sobre una base de nivel 1.

ORBE2026 registra un logro local cuando los cuatro guardianes figuran completados; no entrega XP adicional. ARC419, NEB264 y CYR905 conservan su función histórica y no pueden canjearse como nuevas recompensas del cierre hasta definir su correspondencia. Una partida antigua mantiene los códigos y XP ya obtenidos.

Las ayudas no cambian los criterios de aprobación. La bitácora acompaña el diseño de una propuesta aplicable al aula. El seguimiento actual permanece en el navegador y puede exportarse.

## Google Sheets

La hoja y sus once pestañas fueron verificadas en el chat anterior. El endpoint `/exec` ya está en `integration/google-sheets/connection-config.json`; no hay que pedirlo de nuevo. La comprobación de salud GET y POST ping desde HTTP respondió `ok:true` durante esta continuación.

Eso no certifica lecturas/escrituras autenticadas ni comunicación desde Moodle. La sincronización automática permanece desactivada. Falta probar registro con una invitación de prueba autorizada, recuperación del perfil, canje idempotente, asignación y lectura desde el origen publicado. No se deben guardar invitaciones o tokens de participantes en GitHub.

## Pendientes reales

1. Crear el repositorio independiente mediante una sesión autorizada de GitHub.
2. Llevar esta carpeta a su raíz y activar Pages con GitHub Actions.
3. Verificar la URL desplegada y los permisos de los materiales en una cuenta estudiante.
4. Comprobar la integración autenticada con Sheets desde ese origen.
5. Probar una página real de Moodle y completar la revisión en Safari y Firefox.

Consultar `QA.md` y `ESTADO.json` antes de afirmar que alguno de estos pasos está completo.
