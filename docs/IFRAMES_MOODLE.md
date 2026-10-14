# Enlaces e iframes para Moodle · GamiAula

La dirección principal de introGami se conserva. Las cinco rutas respondieron HTTP 200 al publicar la versión 2.0.5 el 13 de octubre de 2026. La prueba de iframe local conservó el perfil durante la navegación; falta comprobar la configuración concreta del Moodle real.

Copia cada bloque en la vista HTML del editor de Moodle. La altura de 900 px evita un marco demasiado pequeño; puede ajustarse según el espacio de tu aula. El enlace que acompaña cada iframe permite abrir el curso en una pestaña independiente.

## Centro de Comando

[ Abrir Centro de Comando ](https://nespinozagonzalez-hub.github.io/introGami/)

```html
<iframe src="https://nespinozagonzalez-hub.github.io/introGami/"
  title="Academia del Orbe · Centro de Comando"
  style="width:100%;height:900px;border:0;border-radius:16px;"
  loading="lazy" allow="fullscreen; clipboard-write" allowfullscreen>
</iframe>
<p><a href="https://nespinozagonzalez-hub.github.io/introGami/" target="_blank" rel="noopener noreferrer">Abrir Centro de Comando en una nueva pestaña</a></p>
```

## Módulo 1 · El Primer Despertar

[ Abrir Módulo 1 · El Primer Despertar ](https://nespinozagonzalez-hub.github.io/introGami/modulos/1/)

```html
<iframe src="https://nespinozagonzalez-hub.github.io/introGami/modulos/1/"
  title="Academia del Orbe · Módulo 1"
  style="width:100%;height:900px;border:0;border-radius:16px;"
  loading="lazy" allow="fullscreen; clipboard-write" allowfullscreen>
</iframe>
<p><a href="https://nespinozagonzalez-hub.github.io/introGami/modulos/1/" target="_blank" rel="noopener noreferrer">Abrir Módulo 1 · El Primer Despertar en una nueva pestaña</a></p>
```

## Módulo 2 · La Forja de Herramientas

[ Abrir Módulo 2 · La Forja de Herramientas ](https://nespinozagonzalez-hub.github.io/introGami/modulos/2/)

```html
<iframe src="https://nespinozagonzalez-hub.github.io/introGami/modulos/2/"
  title="Academia del Orbe · Módulo 2"
  style="width:100%;height:900px;border:0;border-radius:16px;"
  loading="lazy" allow="fullscreen; clipboard-write" allowfullscreen>
</iframe>
<p><a href="https://nespinozagonzalez-hub.github.io/introGami/modulos/2/" target="_blank" rel="noopener noreferrer">Abrir Módulo 2 · La Forja de Herramientas en una nueva pestaña</a></p>
```

## Módulo 3 · Arquitectura y Flow

[ Abrir Módulo 3 · Arquitectura y Flow ](https://nespinozagonzalez-hub.github.io/introGami/modulos/3/)

```html
<iframe src="https://nespinozagonzalez-hub.github.io/introGami/modulos/3/"
  title="Academia del Orbe · Módulo 3"
  style="width:100%;height:900px;border:0;border-radius:16px;"
  loading="lazy" allow="fullscreen; clipboard-write" allowfullscreen>
</iframe>
<p><a href="https://nespinozagonzalez-hub.github.io/introGami/modulos/3/" target="_blank" rel="noopener noreferrer">Abrir Módulo 3 · Arquitectura y Flow en una nueva pestaña</a></p>
```

## Módulo 4 · La Consagración del Orbe

[ Abrir Módulo 4 · La Consagración del Orbe ](https://nespinozagonzalez-hub.github.io/introGami/modulos/4/)

```html
<iframe src="https://nespinozagonzalez-hub.github.io/introGami/modulos/4/"
  title="Academia del Orbe · Módulo 4"
  style="width:100%;height:900px;border:0;border-radius:16px;"
  loading="lazy" allow="fullscreen; clipboard-write" allowfullscreen>
</iframe>
<p><a href="https://nespinozagonzalez-hub.github.io/introGami/modulos/4/" target="_blank" rel="noopener noreferrer">Abrir Módulo 4 · La Consagración del Orbe en una nueva pestaña</a></p>
```

## Comprobación en tu aula

- Verificar con una cuenta de estudiante que el iframe aparece y se pueden recorrer las estaciones.
- Si Moodle elimina etiquetas iframe o permisos del editor, usar el enlace directo mientras se ajusta el recurso con administración.
- El avance reside en el almacenamiento de ese navegador. Algunos navegadores separan el almacenamiento dentro de un iframe del de una pestaña independiente: comprobar ese recorrido y descargar una copia antes de cambiar de entorno.
- La copia de fragmentos tiene una alternativa manual si Moodle o el navegador bloquean el portapapeles.
- La sincronización autenticada con Google Sheets continúa desactivada; estos iframes no activan una conexión con la matrícula de Moodle.

## Navegación y pantalla completa (2.0.5)

El Centro de Comando solo permite gestionar personaje, atributos, inventario, códigos y copia de partida. No contiene accesos a módulos. Cada módulo conserva sus estaciones y no permite salir al Centro o a otro módulo. El docente organiza estos cinco iframes como actividades de Moodle; los códigos se copian en el módulo y se registran en el Centro desde Moodle.

Todos los marcos incluyen el botón Pantalla completa; el RPG lo conserva también durante el combate. Mantener los atributos allowfullscreen y allow="fullscreen; clipboard-write" de estos bloques. Si la pantalla completa nativa no está disponible, el botón permite abrir la misma actividad en vista amplia, sin accesos a otros módulos.

Referencia técnica: https://developer.mozilla.org/en-US/docs/Web/API/Element/requestFullscreen. La pantalla completa requiere una pulsación del usuario y autorización del iframe.

## iPhone y vista amplia

La captura del 13 de octubre de 2026 muestra que el navegador no dispone de la API para pantalla completa de páginas. Es una limitación documentada de WebKit en iPhone; el permiso allowfullscreen por sí solo no añade esa API. Referencia: https://bugs.webkit.org/show_bug.cgi?id=310661.

Abrir vista amplia abre solo esta actividad en otra pestaña y transfiere la partida desde el iframe. Los cambios se devuelven a la actividad original y Volver al curso regresa a ella. Mantener abierta la pestaña original de Moodle. La vista amplia conserva las barras del navegador. No cambia la navegación del curso entre módulos.

En el RPG, abrir la vista amplia antes de empezar el combate. Un combate ya iniciado no se transfiere a otra ventana; se puede continuar en su marco actual. Si la apertura o la transferencia se bloquea, la interfaz lo informa y mantiene la partida original.
