# Checklist · introGami / Academia del Orbe 2.0.3

El objetivo vigente es actualizar **introGami**, conservando su dirección principal y el progreso existente. Esta checklist registra implementación y comprobación por separado.

## 1. Preparación y continuidad

- [x] Recuperar el remaster y sus acuerdos del chat anterior.
- [x] Revisar la rama main y trabajar sobre una copia de ese estado.
- [x] Conservar la clave de progreso g0100_v8, sus atributos y las equivalencias de códigos.
- [x] Llevar Centro de Comando, módulos, recursos y backend preparado a la raíz de introGami.
- [x] Conservar los archivos históricos adicionales del repositorio.

## 2. Ilustración e interfaz

- [x] Crear una ilustración panorámica de la Academia y su recorrido.
- [x] Crear retratos de Orión, Lira, Kael, Nexo y Valen con transparencia real.
- [x] Optimizar las seis imágenes como WebP, conservando la transparencia de los personajes.
- [x] Incorporar imágenes a portada, mapa, tarjetas, diálogos, entradas de módulos y combate.
- [x] Crear un mapa con accesos a los cuatro territorios y mantener tarjetas legibles en móvil.
- [x] Incorporar elección de retrato independiente de la clase.
- [x] Mostrar progreso global de nueve misiones y cuatro guardianes.
- [x] Mostrar un botón que permite continuar la aventura o registrar fragmentos descubiertos.
- [x] Mostrar dónde se guarda la partida y distinguir el modo temporal.
- [x] Mantener foco de teclado, Escape, texto alternativo y reducción de movimiento.

## 3. Aprendizaje y funcionamiento

- [x] Mantener los criterios y actividades de los módulos 1–3.
- [x] Conservar nueve videos, seis documentos y el programa oficial.
- [x] Mantener dos lecturas complementarias y bitácoras por territorio.
- [x] Mantener ayudas de los cinco atributos y sus umbrales 3, 5 y 8.
- [x] Evitar recompensas duplicadas entre códigos originales y canónicos.
- [x] Mantener cuatro guardianes y el logro ORBE2026 sin XP adicional.
- [x] Recuperar en una copia JSON personaje, módulos, bitácoras y usos de ayudas.

## 4. Verificación antes de publicar

- [x] Completar y registrar la batería de pruebas de navegador de esta versión.
- [x] Inspeccionar las capturas finales de escritorio, móvil y combate.
- [x] Revisar sintaxis, rutas, imágenes CSS y catálogo de recursos.

## Mejoras de cada módulo

- [x] Incorporar una entrada ilustrada y un propósito de aprendizaje en los cuatro territorios.
- [x] Mostrar acceso directo a los otros territorios y la continuación de ruta.
- [x] Añadir botones de estación anterior y siguiente, con foco de teclado.
- [x] Añadir cierre de los módulos 1–3 y acceso al siguiente módulo.
- [x] Incorporar copia de fragmentos y alternativa manual.
- [x] Abrir la bóveda de Nexo desde los enlaces de cierre.
- [x] Incorporar el cierre del RPG únicamente tras vencer a los cuatro guardianes.
- [x] Preparar cinco bloques iframe completos para Moodle.

## 5. Publicación 2.0.3

- [x] Guardar la versión en main con una actualización que preserve los cambios ajenos.
- [x] Comprobar la publicación en https://nespinozagonzalez-hub.github.io/introGami/.
- [x] Comprobar los cuatro módulos y las seis imágenes publicadas.
- [x] Verificar que el enlace principal carga la nueva versión.

GitHub Pages completó correctamente la publicación del commit 3c17c546d8761a9926c2ac3e07335347d052c6b4. La portada se inspeccionó en la web pública; los módulos, imágenes, estilos y scripts seleccionados devolvieron HTTP 200 y coincidieron con los archivos probados. Evidencia: PUBLICACION_VERIFICADA.json.

## Pendientes externos que no deben confundirse con tareas terminadas

- [ ] Probar registro, canje y asignación autenticados en Google Sheets desde la página publicada.
- [ ] Activar sincronización únicamente después de comprobar esos flujos.
- [ ] Validar permisos de los recursos con una cuenta de estudiante.
- [ ] Completar prueba en el Moodle real, Safari y Firefox.

Consultar QA.md y ESTADO.json para la evidencia y las limitaciones. El estado local de las misiones y los códigos es progreso lúdico; no certifica aprendizaje ni identidad institucional.
