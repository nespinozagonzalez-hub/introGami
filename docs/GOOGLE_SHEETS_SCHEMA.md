# Google Sheets — Esquema de almacenamiento (PROPUESTA, aún no creado)

La futura hoja de cálculo y Google Apps Script deben operar tras consentimiento informado y con identificador pseudónimo. No se debe enviar email, nombre real ni respuestas abiertas sin una razón pedagógica y autorización apropiada.

## Pestañas sugeridas

| Pestaña | Campos principales | Para qué sirve |
|---|---|---|
| Jugadores | player_id, fecha_creación, clase, consentimiento, versión | Identificar recorrido sin nombre público |
| Misiones | mission_id, modulo, tipo, codigo_canonico, xp, puntos, estado | Catálogo de desafíos y recompensas |
| Atributos | player_id, atributo, nivel, fecha_actualización, versión | Consultar y reconstruir habilidades |
| Ventajas | skill, nivel_requerido, modulo, efecto, límite_uso | Configuración de efectos y ayudas |
| Eventos | event_id, player_id, timestamp, type, module, station, skill, detail | Bitácora de decisiones y activaciones |
| Códigos | player_id, mission_id, fecha_validación, resultado | Evitar recompensas duplicadas |
| Auditoría | event_id, campo, valor_anterior, valor_nuevo, fecha | Historial de cambios de atributos |

## Reglas propuestas
1. `event_id` único para que reintentos de sincronización no creen duplicados.
2. El backend confirma identidad, autorización y unicidad del código antes de entregar XP.
3. No permitir al navegador asignarse arbitrariamente XP, puntos, niveles ni ventajas.
4. Los datos de las hojas privadas no deben exponerse mediante publicación web ni Apps Script anónimo que permita leer/modificar otros jugadores.
5. Si se usa Google Apps Script, autenticar y restringir acciones; un simple secreto guardado en JS público **no es seguridad**.
6. Exportación y opción de eliminación del progreso del participante; definir política de retención y permisos del equipo.
7. Migrar datos `g0100_v8` sin borrar el guardado anterior. Probar recuperaciones en Genially y sin iframe.
8. Para investigación: distinguir los eventos observables (p.ej., uso de pistas) de inferencias psicológicas como motivación o habilidad real.

La creación del Google Sheets compartido se realizará después de la estabilización de las mecánicas y del contrato de API.
