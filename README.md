# La Choza

Sitio web estático para La Choza Hotel & Hospedaje.

Sitio construido con HTML, CSS y JavaScript nativos, sin Bootstrap ni dependencias de framework.

## Estructura

- `index.html`: página principal.
- `explorar.html`: catálogo de habitaciones y carrusel.
- `eventos.html`: información de eventos.
- `servicios.html`: opciones de alojamiento y experiencias.
- `contacto.html`: información y vías de contacto.
- `components/`: componentes compartidos de encabezado y pie de página.
- `assets/css/`: hojas de estilo.
- `assets/js/`: módulos JavaScript de las páginas (`script.js` carga los componentes compartidos).
- `assets/images/`: imágenes locales.

## Ejecución local

Abre la carpeta del proyecto con un servidor estático, como la extensión **Live Server** de Visual Studio Code, y visita `index.html`. El servidor es necesario para cargar correctamente los módulos JavaScript.

El formulario del pie valida los datos en el navegador y prepara un enlace de WhatsApp; no envía información ni recarga la página automáticamente.
