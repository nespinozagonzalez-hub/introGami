# GamiAula 2.0 — Integración Google Sheets (beta)

**Hoja verificada el 13/10/2026:** 11 pestañas, 13 registros del catálogo de misiones y 60 reglas de ventajas. La hoja original permanece privada.

## Estado real
- Apps Script Code.gs instalado por el propietario; falta validar el despliegue real de la API.
- Falta la URL original de la aplicación web que termina en /exec.
- gami-api-client.js está preparado y desactivado: no modifica el Hub, no envía información, no contiene tokens.
- Sigue sin haber migración automática del progreso local g0100_v8.

## Próximo paso para el propietario
1. Abrir el Google Sheet, ir a Extensiones > Apps Script.
2. Ejecutar la función verificarSistema; en el registro debería aparecer OK.
3. Revisar Implementar > Nueva implementación > Aplicación web. Para un piloto público debe reforzarse el control antiabuso; no generar invitaciones para participantes hasta probar.
4. Entregar únicamente la URL /exec. No enviar invitaciones ni tokens.
5. Probar GET y POST desde el origen exacto del Centro de Comando en GitHub Pages. Activar la sincronización solo cuando ambas llamadas se completen.

## Precaución
Las Web Apps de Apps Script pueden tener restricciones CORS y problemas de incrustación en iframe. La URL del Google Sheets NO sirve de API. Si GET o POST fallan desde GitHub Pages, habrá que establecer un puente HTTPS autorizado y comprobado, sin abrir los datos de otros participantes.

**No fusionar esta integración con main hasta completar pruebas.**