# GamiAula 2.0 · Academia del Orbe

Remaster de **Gamificación de 0 a 100**. Curso estático con mapa, personaje, cinco guías, nueve misiones activas y cuatro guardianes finales. Esta carpeta está preparada para ser la raíz del repositorio `nespinozagonzalez-hub/gamiaula-academia-del-orbe`.

## Qué incluye

- Centro de Comando: personaje, cinco clases, atributos, XP, inventario, biblioteca y códigos compatibles con la edición anterior.
- Módulos 1–3: evaluaciones y actividades originales, ayudas por atributo y bitácora para conectar el curso con el aula.
- Cierre RPG: cuatro guardianes y 25 preguntas por guardián; ORBE2026 registra la Consagración sin XP adicional.
- Biblioteca: nueve videos, seis documentos y programa oficial, con sus enlaces conservados; dos lecturas complementarias de 2024 y 2026.
- Partidas: recuperación de `g0100_v8` dentro del mismo origen, copia JSON de personaje/módulos/bitácora y modo temporal si el navegador bloquea el almacenamiento.
- Google Sheets: instalador `backend/Code.gs`, configuración existente y diagnóstico de salud. La sincronización con participantes permanece desactivada hasta su prueba autenticada.

Los proyectos y las URLs originales permanecen disponibles. El remaster de GamiAula y la tesis Ludaria tienen implementaciones distintas.

## Continuar este trabajo

Leer `docs/CONTINUIDAD.md`, `docs/ESTADO.json` y `docs/QA.md`. Ahí se distinguen las decisiones recuperadas, los cambios implementados, las pruebas realizadas y los pendientes reales. La URL de Apps Script ya está guardada en `integration/google-sheets/connection-config.json`.

## Probar localmente

Abrir el directorio mediante un servidor HTTP:

```bash
python3 -m http.server 8080
```

Visitar `http://localhost:8080/`. Para revisar código y ejecutar las pruebas de navegador:

```bash
npm ci
npm run check
npx playwright install chromium
npm test
```

`PLAYWRIGHT_EXECUTABLE_PATH` permite usar un Chromium instalado y `GAMI_QA_OUTPUT` define la carpeta de resultados. Las pruebas utilizan perfiles locales de prueba, sin escribir en cuentas de estudiantes.

## Repositorio independiente y publicación

1. Crear `gamiaula-academia-del-orbe` en la cuenta `nespinozagonzalez-hub`. Se puede inicializar con README para disponer de una rama `main`.
2. Llevar **el contenido de esta carpeta a la raíz** del repositorio, manteniendo `index.html`, `assets/`, `shared/`, `modulos/` y `data/`.
3. En Settings → Pages elegir **GitHub Actions**. El flujo `.github/workflows/pages.yml` empaqueta solo el curso público.
4. Comprobar la publicación y usar sus URLs verificadas para los nuevos iframes. `docs/IFRAMES_MOODLE.md` contiene una plantilla; sus URLs previstas no se deben presentar como activas antes del despliegue.

No se incluye una licencia abierta: la publicación del código no modifica por sí sola la titularidad de los materiales de GamiAula o de terceros.

## Alcance de las pruebas

Consultar `docs/QA.md` para el resultado concreto. Una prueba local en Chromium e iframe de ensayo no certifica Safari, Firefox, permisos de Drive/YouTube ni la configuración real de Moodle. Los códigos y el estado de la batalla residen en el cliente; constituyen progreso lúdico local, sin validación segura de aprendizaje.

GamiAula · Aprender es jugar.
