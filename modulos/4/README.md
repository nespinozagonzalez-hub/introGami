# La consagración del Orbe · RPG 3.0.0

Actualización del 20 de octubre de 2026. La dirección de Moodle se conserva:
https://nespinozagonzalez-hub.github.io/introGami/modulos/4/

## Alcance y continuidad

Solo cambian los archivos del módulo 4 y las pruebas del curso que recorren su nueva interfaz. El Centro de Comando, los módulos 1–3, el backend y los estilos compartidos se conservan.

Se mantiene `consagracion_orbe_v11_all_questions_proto`. Las victorias históricas `g1`–`g4`, los fragmentos y la identidad local se migran sin reiniciar el curso. ORBE2026 continúa como logro sin XP adicional. No se hacen solicitudes de cuentas ni escrituras a Google Sheets.

## Contenidos

100 casos, 25 por guardián. La fuente curricular son los archivos y las actividades vigentes de los tres módulos anteriores, consultados durante esta actualización.

| Guardián | Correspondencia | Demanda principal |
|---|---|---|
| Valle | Módulo 1: elementos, reglas, dinámicas, componentes, propósito y experiencia | Distinguir qué cambia en una experiencia y justificar la alineación |
| Forja | Módulo 2: unplugged/plugged, herramientas, IA, Octalysis, recompensas y errores de diseño | Elegir recursos bajo condiciones de acceso, interacción y evidencia |
| Flow | Módulo 3: Bartle, HEXAD, Lazzaro, 6D, Werbach, PET, autonomía, autoimagen y flow | Comparar decisiones de diseño según jugadores, reto y apoyo |
| Caos | Integración de los módulos 1–3 | Resolver dilemas docentes y evaluar ajustes con evidencia |

Se revisaron los criterios usados en AulaDex · La Liga Invertida (`Eleccion-tipo-de-actividad/docs/content.js`): casos con condiciones relevantes, distractores plausibles y extensión comparable; la respuesta no destaca sistemáticamente por ser la más larga. Las posiciones se mezclan al presentar cada pregunta. Cada alternativa tiene una explicación propia. Tras confirmar, se debe pulsar «Continuar combate»: leer la devolución no tiene límite de tiempo.

El banco se recorre sin repeticiones hasta agotarlo. El repaso prioriza dificultades, y los nuevos intentos ponen primero los casos que todavía requieren revisión. Una victoria no exige responder las 25 preguntas. La bitácora de dificultades y una reflexión de transferencia quedan en la cámara.

## Reglas del duelo

- Iniciativa: una pregunta inicial; acertar permite elegir quién comienza.
- Ataque: 12, salvo el patrón del Flow.
- Habilidad: 18; atraviesa la protección del Flow. Tras usarla, debe transcurrir una ronda completa de recarga.
- Defender en turno propio: prepara guardia, que deja el próximo impacto en el 45%. Un bloqueo reactivo correcto con guardia activa también contraataca con 4.
- Recuperar en turno propio: hasta 16 de vida con respuesta correcta.
- Defensa reactiva acertada: deja el golpe en el 25%, con mínimo 1; puede combinarse con la guardia.
- Recuperación reactiva acertada: restaura hasta 8 antes del impacto; se recibe el daño anunciado, modificado por guardia si corresponde.
- Valle anuncia ataques de 8–10. Forja anuncia una carga de 18 cada tercera ronda. Flow alterna protección (espada 7) y apertura (espada 15). Caos cambia su patrón al llegar a media vida.

Los talentos usan los atributos existentes, con umbrales 3/5/8 y 1/2/3 usos por intento. Narrativa es consulta libre a partir de nivel 3. Los usos se conservan al pausar o recargar y se renuevan al iniciar un intento distinto. No se modifican los atributos ni los puntos del personaje.

## Narrativa y arte

Cada guardián dispone de escenario y atlas de seis poses. El protagonista conserva el atlas aprobado: reposo, preparación, ataque, defensa, daño y victoria. La ficha inferior muestra nombre, clase, nivel y retrato elegido en el Centro de Comando.

El rival habla al iniciar, cada tres rondas, al llegar a media vida y al resolver el encuentro. Sus diálogos no interrumpen preguntas. Sonido opcional, ritmo ajustable y reducción de movimiento. Los textos largos usan tipografía del sistema; los títulos y controles cortos usan una fuente monoespaciada legible.

Los archivos `assets/*-sprites.webp` y `assets/*-bg.webp` se generaron con la herramienta integrada de imágenes y se codificaron en WebP para la web. El Valle y el aventurero proceden de la muestra aprobada. Los prompts nuevos especificaron: JRPG de 16 bits con píxeles nítidos, paleta limitada, sin texto ni interfaz; atlas transparente de tres columnas por dos filas con reposo, preparación, ataque hacia la izquierda, defensa, daño y derrota; y escenario lateral despejado con terraza en su tercio inferior. Identidades: forjador de hierro negro con horno ámbar y martillo; arquitecto de runas azul y cian con bastón y escudo geométrico; custodio de obsidiana y amatista con hacha. Escenarios: forja subterránea; observatorio cristalino; santuario flotante del Caos. Los recortes de los atlas están definidos explícitamente en `renderer.js`.

## Guardado y recuperación

El motor aplica el resultado una sola vez antes de animarlo. Una recarga durante la explicación conserva la respuesta y su devolución. Una recarga durante la animación recupera la transición ya aplicada y no repite el daño. La victoria se registra antes de la animación final. Se pueden pausar vida, ronda, pregunta, orden de alternativas, selección, recarga, guardia y usos de talentos.

Se usa la misma frontera de almacenamiento y la misma transferencia de vista amplia que el curso. Si el navegador bloquea el guardado, se informa del modo temporal. El módulo puede pausar el duelo antes de abrir la vista amplia o volver a Moodle. Una aplicación externa cerrada o un navegador que borre su almacenamiento sigue requiriendo la copia de partida del Centro de Comando.

## Verificación reproducible

```sh
node scripts/check.mjs
node modulos/4/tests/combat.cjs
node modulos/4/tests/browser.cjs
node modulos/4/tests/resilience.cjs
node tests/browser.cjs
```

Resultado local: 56 comprobaciones aprobadas (14 del motor, 12 de interfaz del módulo, 4 de recuperación y 26 del curso completo), sin errores JavaScript ni escrituras externas. La revisión de sintaxis y enlaces locales también pasó: 29 scripts, 73 referencias locales y 16 recursos originales conservados.

Las pruebas de navegador requieren Playwright y un ejecutable Chromium compatible; se admite `PLAYWRIGHT_EXECUTABLE_PATH`. `GAMI_QA_OUTPUT` define la carpeta temporal de resultados y capturas.

- Pruebas puras: calidad estructural de los 100 ítems, claves y explicaciones después de mezclar, cancelación, aplicación única del resultado, restauración, defensa/curación, recargas, patrones, repaso, victorias sin talentos obligatorios, derrota y assets.
- Navegador: migración histórica, retrato/clase, preguntas y devoluciones, recarga y pausa, talentos, cuatro victorias mediante respuestas y comandos, repeticiones sin recompensas duplicadas, bitácora y modo temporal dentro de iframe.
- Recuperación: derrota y reintento, navegación de alternativas por teclado, vista amplia desde una batalla con almacenamiento bloqueado, regreso al iframe y copia manual sin portapapeles.
- Anchuras comprobadas: 240, 280, 315, 390, 768, 1366 y 1920 px. Sin cuentas reales ni escrituras externas.

Límite de validación: simulaciones de escritorio y móvil en Chromium. No certifican un iPhone/Safari físico ni una matrícula real de Moodle.
