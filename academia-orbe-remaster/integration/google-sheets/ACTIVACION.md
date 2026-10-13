# Checklist de activación GamiAula 2.0

> Estado: la hoja fue verificada y el usuario informó OK al ejecutar verificarSistema. La URL /exec la facilitó el propietario. No se ha confirmado aquí ninguna lectura GET/POST en vivo.

## Validado
- [x] Google Sheets original con 11 pestañas y catálogos de misiones/ventajas.
- [x] Endpoint /exec documentado y configurado sin secretos.
- [x] Página de diagnóstico GET y POST ping sin crear jugadores.
- [x] Curso público sin cambios; código nuevo en rama remaster-gamiaula-2-2026.

## Bloqueadores para la primera sincronización
- [ ] Abrir /exec y confirmar JSON de salud ok:true; si requiere autorización, revisar el acceso del despliegue.
- [ ] Abrir connection-test.html desde un origen web y ejecutar GET y POST ping.
- [ ] Validar si CORS impide leer las respuestas de ContentService desde GitHub Pages; usar un puente HTTPS autentificado y limitado si falla.
- [ ] Generar una invitación de prueba privada; probar register → profile → redeem → allocate → advantages con cuenta ficticia.
- [ ] Repetir redeem con alias y código canónico para descartar XP duplicados.
- [ ] Confirmar trazabilidad de event_id e integridad de credenciales; no utilizar tokens en GitHub ni en logs.
- [ ] Migración voluntaria y validada de g0100_v8: preservar XP y códigos antiguos, prevenir doble crédito.
- [ ] Verificar lectura y escritura desde iframe Genially en Chrome, Safari y Firefox.
- [ ] Evaluar consentimiento, minimización, borrado y acceso administrativo antes de invitar participantes.

## Guía de diagnóstico
1. Abrir URL /exec: debe devolver JSON con ok:true.
2. Descargar connection-test.html desde la rama beta o probarlo desde hosting temporal propio de GamiAula.
3. Pulsar Probar GET + POST y copiar el diagnóstico al chat.
4. No compartir invitaciones ni tokens de usuarios.

## Nota de seguridad
El servidor actualmente acepta códigos declarados por el cliente y los valida contra MISIONES, pero **no prueba que el usuario haya completado las actividades**. Los módulos 4 y ORBE2026 permanecen pendientes. Evitar atribuir validez de evaluación al simple canje de un código visible en HTML estático.