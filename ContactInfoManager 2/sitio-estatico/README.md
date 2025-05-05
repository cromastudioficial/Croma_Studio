# Sitio Web de Croma Studio - Versión Estática

Esta es una versión estática del sitio web de Croma Studio que se puede abrir directamente en un navegador sin necesidad de instalación de servidores o configuración especial.

## Cómo usar este sitio

1. Para ver el sitio, simplemente abre el archivo `index.html` en tu navegador web favorito.
2. Para realizar modificaciones, sigue las instrucciones detalladas en el archivo `COMO_MODIFICAR.txt`.

## Estructura de carpetas

```
sitio-estatico/
│
├── index.html            # Archivo principal del sitio
├── COMO_MODIFICAR.txt    # Guía para realizar modificaciones
│
├── css/                  # Estilos del sitio
│   └── estilos.css       # Archivo de estilos principal
│
├── js/                   # Scripts JavaScript
│   └── script.js         # Funcionalidades interactivas
│
└── images/               # Imágenes y recursos gráficos
    ├── playera1.jpg
    ├── playera2.jpg
    ├── taza1.jpg
    └── termo1.jpg
```

## Personalizaciones comunes

### Cambiar colores
Para cambiar los colores del sitio, edita las variables en la parte superior del archivo `css/estilos.css`:

```css
:root {
  --color-bg1: rgb(20, 0, 50);     /* Color oscuro principal del gradiente */
  --color-bg2: rgb(0, 5, 20);      /* Color oscuro secundario del gradiente */
  --color1: rgb(255, 50, 150);     /* Color rosa neón (botones primarios) */
  --color2: rgb(0, 205, 255);      /* Color azul neón (detalles) */
  ...
}
```

### Cambiar datos de contacto
Modifica los datos de contacto en la sección correspondiente del archivo `index.html`:

```html
<div class="contact-info animate-on-scroll">
  <div class="contact-item">
    <i class="fas fa-phone"></i>
    <p>5542424621</p>
  </div>
  ...
</div>
```

### Cambiar mensaje de WhatsApp
Para personalizar el mensaje que se envía por WhatsApp al hacer clic en "Personalizar", edita la constante `MENSAJE_WHATSAPP` en el archivo `js/script.js`:

```javascript
const MENSAJE_WHATSAPP = 'Hola, me interesa personalizar: [PRODUCTO]. ¿Podrías darme más información?';
```

## Créditos

Diseñado y desarrollado para Croma Studio - 2024