# Don Flores — Sitio Web Institucional

Sitio web de una página (landing page) para venta de frutas y verduras, con catálogo interactivo y pedidos por WhatsApp.

---

## Pendiente de completar (buscar TODO en el código)

| Campo | Dónde | Valor actual |
|---|---|---|
| Monto mínimo envío gratis | Barra anuncio + modal de pedido | `$XXXXX` |
| Dirección del local | Sección Contacto | `Av. Ejemplo 1234` |
| Mapa de ubicación | Sección Contacto | OpenStreetMap genérico |
| Horarios reales | Sección Contacto | Lun–Sáb 7–18 / Dom 7–13 |
| Imágenes de productos | Carpeta `/image/` | SVG placeholder |

### Cómo actualizar el mapa
1. Ir a [maps.google.com](https://maps.google.com) y buscar la dirección
2. Clic en **Compartir** → **Insertar un mapa** → copiar el `src` del iframe
3. Pegarlo en el `src` del `<iframe>` en la sección de contacto

### Cómo agregar imágenes de productos
Guardar las fotos en la carpeta `/image/` con estos nombres exactos:

```
naranjas.jpg | mandarinas.jpg | frutillas.jpg | limones.jpg
bananas.jpg  | uvas.jpg       | tomates.jpg   | papas.jpg
cebollas.jpg | zanahorias.jpg | lechugas.jpg  | morrones.jpg
zapallos.jpg
```

Formato recomendado: JPG o WebP, proporción 4:3 o cuadrada, mínimo 600×600 px.  
Si el archivo no existe, la tarjeta muestra el ícono SVG de color automáticamente.

---

## Estructura del proyecto

```
donflores/
├── index.html          # Sitio completo (HTML + CSS + JS en un solo archivo)
├── image/
│   ├── logo.png        # Logo de la empresa
│   └── Frescura del campo y la cosecha.png  # Foto del hero
└── README.md
```

---

## Funcionalidades incluidas

- **Hero** con imagen de fondo y degradado
- **Catálogo** con 13 productos, selector de unidad (kg / cajón / bolsa) y contador de cantidad
- **Modal de confirmación** de pedido antes de abrir WhatsApp
- **Mensaje automático** a WhatsApp con el detalle completo del pedido
- **Barra de anuncio** de envíos y envío gratis
- **Sección de contacto** con datos, horarios y mapa embebido
- **Diseño responsive** para móvil, tablet y escritorio
- **Menú hamburguesa** en móvil con animación

### Seguridad en el sistema de pedidos
- Validación de cantidades (solo enteros 1–99)
- Rate limiting: un pedido cada 60 segundos
- Verificación de longitud de mensaje
- Sanitización de datos antes de enviar
- `rel="noopener noreferrer"` en todos los links externos

---

## Tecnologías

- HTML5 semántico
- CSS3 con variables custom (sin frameworks)
- JavaScript vanilla (sin librerías)
- Google Fonts: Sora + Inter

---

## Despliegue

El sitio es estático. Se puede subir directamente a:
- **Netlify** (arrastrar la carpeta al panel)
- **GitHub Pages** (repo público + Pages activado)
- **Hosting compartido** (subir por FTP con FileZilla)

No requiere servidor, base de datos ni backend.
