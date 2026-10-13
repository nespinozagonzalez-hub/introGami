# GamiAula · Academia del Orbe — Remaster

**Estado:** prototipo funcional y visual en rama de preparación. **No apto todavía para uso con estudiantes**, pendiente de pruebas de interfaz, compatibilidad Moodle y API.

## Objetivo

Unificar los componentes de Gamificación de 0 a 100 en una experiencia inmersiva y responsive inspirada en Ludaria, sin perder los videos, guías, actividades ni códigos de la versión original.

## Ya construido

- `index.html` — nuevo Centro de Comando: portada ilustrada, mapa de cuatro territorios, cinco NPCs conversacionales, personaje, cinco clases, atributos, XP, puntos, inventario, códigos y biblioteca.
- `assets/npc/*.svg` — Orión, Lira, Kael, Nexo y Valen, ilustraciones SVG originales.
- `assets/world-academy.svg` — paisaje vectorial de la Academia.
- `modulos/1/index.html`, `modulos/2/index.html`, `modulos/3/index.html` — copia completa de las tres actividades originales, con sus bancos de preguntas, enlaces a videos y documentos, códigos y guardado local.
- `modulos/4/index.html` — RPG final La Consagración del Orbe, recuperado de la versión 11, cuatro guardianes y clave ORBE2026.
- `shared/` — tema responsive compartido, nuevos diálogos NPC, funciones de progresión y ventaja por atributo.
- `data/recursos-originales.json` — **9 videos + 6 documentos + 1 programa oficial**, enlazados a sus direcciones originales.
- `docs/IFRAMES_MOODLE.md` — futura estructura de inserción.

## Tecnología y continuidad

Sitio estático HTML, CSS, JavaScript, SVG. Compatible con GitHub Pages. Usa `localStorage g0100_v8` para cargar el personaje de la edición anterior cuando se ejecuta **dentro del mismo origen** y el navegador lo permite. Las otras actividades mantienen sus guardados específicos. No se borra el progreso original.

La nueva versión aún **no realiza sincronización con Google Sheets**; la URL de Apps Script está documentada pero GET, POST, CORS, cookies e identidad requieren pruebas. Los códigos son públicos en el HTML: sirven como mecanismo lúdico, no como validación segura de aprendizaje.

## Instalación en un repositorio independiente

1. Crear repositorio público vacío `nespinozagonzalez-hub/gamiaula-academia-del-orbe` (sin README, .gitignore ni licencia inicial). Este paso necesita la interfaz de GitHub de la cuenta, porque el conector disponible no permite crear repositorios.
2. Copiar **el contenido de esta carpeta al nivel raíz** del nuevo repositorio, manteniendo las rutas relativas (index.html, assets/, shared/, modulos/, data/, docs/).
3. En Settings > Pages elegir *Deploy from a branch > main > /(root)*.
4. Verificar enlace, recursos de Google Drive y YouTube, todas las actividades, iFrame Moodle y guardado de progreso antes de matrícula.

## Antes de lanzar

- Probar a 390, 480, 768, 1024, 1366, 1920 px.
- Validar NPC, mapa, modales, misiones, recursos y códigos.
- Probar las cuatro batallas con clases y ventajas diferentes, y accesibilidad por teclado.
- Revisar los tres códigos anteriores de módulo 4 frente a la estructura real de cuatro guardianes.
- Evaluar funcionamiento de `localStorage` dentro de un iframe Moodle. Preparar guardado servidor si no funciona.
- Validar explícitamente que los materiales pueden publicarse en GitHub Pages: **aunque el acceso a Moodle esté restringido, las páginas de un repositorio público siguen siendo accesibles por URL directa**.
- Para seguimiento de estudiantes reales: consentimiento, minimización y controles de acceso antes de conectar Sheets.

## Historial original preservado

Fuentes: `introGami`, `modulo-1-GamiV2`, `modulo-2-gami`, `modulo-3-gami` y HTML de `La Consagración del Orbe`. La versión remaster no sustituye los proyectos anteriores.

GamiAula · Aprender es jugar.
