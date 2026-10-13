# GamiAula Remaster — Nuevos iframes para Moodle

> **La entrada principal conserva su dirección; verificar las rutas publicadas antes de actualizar páginas de módulos.** No usar como enlace activo todavía.

Repositorio vigente: `nespinozagonzalez-hub/introGami`.

## URLs previstas (pendientes de comprobar tras esta actualización)

- Centro de Comando: `https://nespinozagonzalez-hub.github.io/introGami/`
- Módulo 1: `https://nespinozagonzalez-hub.github.io/introGami/modulos/1/`
- Módulo 2: `https://nespinozagonzalez-hub.github.io/introGami/modulos/2/`
- Módulo 3: `https://nespinozagonzalez-hub.github.io/introGami/modulos/3/`
- RPG final: `https://nespinozagonzalez-hub.github.io/introGami/modulos/4/`

## Código modelo

```html
<iframe
  src="https://nespinozagonzalez-hub.github.io/introGami/"
  title="Academia del Orbe — Centro de Comando"
  style="width:100%;height:min(86vh,900px);min-height:660px;border:0;border-radius:14px;"
  loading="lazy"
  allow="fullscreen"
  allowfullscreen>
</iframe>
```

Para módulos, sustituir el `src` por la URL del módulo y actualizar el título. Evitar un iframe sin altura explícita, particularmente en Moodle móvil. Ofrecer además el enlace para abrir la actividad en nueva pestaña.

Las URL son **rutas previstas, no enlaces verificados**. GitHub Pages debe estar habilitado. Las políticas de iframe, bloqueo de cookies y separación de almacenamiento pueden variar en Moodle y Safari: probar con un estudiante de prueba antes de publicarlo.
