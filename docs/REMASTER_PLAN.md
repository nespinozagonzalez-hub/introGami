# GamiAula 2.0 — Especificación de remasterización (borrador)

## Estado
Rama: `remaster-gamiaula-2-2026`. **No publicar en main** hasta superar pruebas en navegador, móvil e iframe.

## Código fuente revisado
- Hub actual `introGami/index.html`, versión de almacenamiento `g0100_v8` (más reciente que `g0100_v5`).
- Primer módulo: `modulo-1-GamiV2/index.html`.
- Segundo módulo: `modulo-2-gami/index.html`.
- Tercer módulo: `modulo-3-gami/index.html`.
- Cierre: `introGami/modulo-4/index.html` recuperado de `consagracion-orbe-v11-g3-g4-preguntas.html`; conserva 4 guardianes y código final `ORBE2026`. Los sprites originales aún requieren verificación y/o restauración.
- Bienvenida: `bienvenida-curso-Gami/index.html`, sin cambios en esta primera iteración.

## Lo implementado en rama beta
1. Panel de ventajas en el hub, conservando código y estado existentes; exportación JSON de progreso.
2. Nueve equivalencias de códigos desde las actividades al registro del Centro de Comando. Un alias y su código canónico dan **una sola** recompensa.
3. Tres módulos reconocen los cinco atributos del personaje creado en el hub; cada uno incluye una orientación conceptual contextualizada. Estrategia permite descartar una alternativa incorrecta de una pregunta no respondida (1, 2 o 3 usos por módulo según niveles 3, 5 y 8).
4. La Consagración incorpora cinco talentos: orientación narrativa, escudo de Diseño, recarga de Creatividad, curación de Motivación y descarte de Estrategia; cada acción se registra localmente.
5. Los módulos agregan un registro local de eventos pseudónimo (`gamiaula_v2_events`) destinado a la futura integración con Sheets.

## Precauciones
- Las rutas de repositorios GitHub Pages comparten origen bajo `nespinozagonzalez-hub.github.io` pero **Genially puede restringir almacenamiento en iframes**. Aún no existe backend ni sincronización remota.
- El código de los módulos, las respuestas y los códigos son visibles en cliente: las verificaciones locales no constituyen evidencia segura de finalización.
- Las recompensas no modifican el criterio de aprobación, pero sí el apoyo ofrecido. Se debe evaluar equidad y accesibilidad.
- El Módulo 4 usa sprites relativos en `assets/`, que todavía necesitan incorporarse o sustituirse. Hay una alternativa gráfica de respaldo en rama beta.
- El hub contiene tres códigos heredados del Módulo 4 aún **no conectados** a los cuatro guardianes. Debemos decidir la correspondencia pedagógica antes de acreditar XP por su victoria.

## Pruebas de aceptación pendientes
- [ ] Crear personaje y revisar atributos en cada módulo usando misma URL de dominio.
- [ ] Confirmar que códigos heredados y equivalentes se activan solo una vez.
- [ ] Probar que el aumento de atributo desbloquea ventajas a niveles 3, 5 y 8.
- [ ] Verificar descartes con preguntas seleccionadas, reintentos y cambio de estación.
- [ ] Completar el combate de los cuatro guardianes con cada clase, equilibrar recursos.
- [ ] Inspeccionar errores de consola, recursos gráficos, móviles y teclado.
- [ ] Probar integración de iframes y persistencia en navegadores Safari, Chrome y Firefox.
- [ ] Diseñar autenticación y consentimientos para el backend antes de enviar datos personales.
- [ ] Integrar Google Sheets / Apps Script, controlar duplicados y sincronización multi-dispositivo.
- [ ] Revisar rol narrativo de las tres misiones del cuarto módulo frente al RPG final.

## Criterios para publicar
No modificar las URLs actuales, conservar copia de versiones previas, completar pruebas de no regresión y validar recompensas con el equipo GamiAula.
