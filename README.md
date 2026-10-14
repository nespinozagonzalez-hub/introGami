# GamiAula · Academia del Orbe

**Gamificación de 0 a 100 · versión 2.0.4**. La entrada principal de introGami gestiona personajes; Moodle organiza el avance entre módulos.

Curso: https://nespinozagonzalez-hub.github.io/introGami/.

## Incluye

- Centro de Comando para personajes y cuatro módulos con navegación interna; seis ilustraciones originales.
- Cinco clases y retratos seleccionables, atributos, XP, inventario, códigos y progreso global.
- Nueve misiones en módulos 1–3, ayudas por atributo y bitácoras de aplicación al aula.
- Cuatro guardianes finales con 25 preguntas cada uno; Consagración del Orbe sin XP duplicada.
- Nueve videos, seis documentos y programa oficial, conservando sus enlaces; dos lecturas complementarias de investigación.
- Recuperación del progreso anterior, copia de partida y modo temporal si se bloquea el almacenamiento.
- Pantalla completa en el Centro y en los cuatro módulos, con manejo de permisos del iframe.
- Backend de Sheets preparado; sincronización automática pendiente de prueba autenticada.

## Estado y continuidad

Leer docs/CHECKLIST_REMASTER.md, docs/QA.md y docs/CONTINUIDAD.md. Las pruebas locales y la verificación de publicación se registran en docs/ESTADO.json. La configuración existente de Apps Script está en integration/google-sheets/connection-config.json.

## Probar y revisar

```bash
python3 -m http.server 8080
npm ci
npm run check
npx playwright install chromium
npm test
```

El servidor permite visitar http://localhost:8080/. Las pruebas usan perfiles ficticios locales. PLAYWRIGHT_EXECUTABLE_PATH permite seleccionar un Chromium instalado y GAMI_QA_OUTPUT define la carpeta de resultados.

La publicación conserva la configuración existente de GitHub Pages. Un commit en main actualiza el curso después de su despliegue; comprobar la dirección publicada antes de afirmar que está disponible.

No se asigna una licencia abierta a los recursos del curso o de terceros. Los códigos locales son un mecanismo lúdico; su canje no demuestra por sí solo aprendizaje. La verificación local de un iframe no sustituye la prueba en el Moodle real.

GamiAula · Aprender es jugar.
