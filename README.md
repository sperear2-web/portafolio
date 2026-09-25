# Portafolio personal — Steven José Perea Romero

Portafolio web personal e interactivo desarrollado con **HTML5 semántico, CSS propio y JavaScript vanilla** para la materia de Desarrollo Web de la carrera de Ingeniería en Software, Universidad Estatal de Milagro (UNEMI).

🔗 **Sitio publicado:** https://sperear2-web.github.io/portafolio/
📁 **Repositorio:** https://github.com/sperear2-web/portafolio

## Secciones

- **Inicio**: presentación, perfil y llamadas a la acción.
- **Sobre mí**: descripción profesional y formación.
- **Skills**: habilidades por categoría con nivel de dominio.
- **Proyectos**: 3 proyectos en cards reutilizables, con filtro y modal de detalle.
- **Design System** (`design-system.html`): colores, tipografía, espaciado y componentes.
- **Contacto**: formulario con validación y enlaces profesionales.

## Tecnologías

- HTML5 semántico (`header`, `nav`, `main`, `section`, `article`, `aside`, `figure`, `footer`, `dialog`)
- CSS3: Custom Properties, Flexbox, CSS Grid, media queries, unidades relativas
- JavaScript (ES6+) sin librerías
- Google Fonts (Bricolage Grotesque, Atkinson Hyperlegible) y Devicon para íconos
- Git, GitHub y GitHub Pages

## Funcionalidades JavaScript

1. Tema claro/oscuro con persistencia en `localStorage`.
2. Menú responsive (hamburguesa) que se cierra con Escape o al elegir un enlace.
3. Resaltado del enlace activo al hacer scroll (`IntersectionObserver`).
4. Filtro de proyectos por tipo.
5. Modal con el detalle de cada proyecto (`<dialog>`).
6. Validación del formulario de contacto con mensajes accesibles.
7. Botón para volver al inicio.
8. El Design System muestra en vivo el valor de cada color del tema activo.

## Estructura

```
portafolio/
├── index.html
├── design-system.html
├── css/
│   └── styles.css
├── js/
│   └── main.js
├── assets/
│   └── img/
└── README.md
```

## Cómo verlo localmente

1. Clona el repositorio: `git clone https://github.com/sperear2-web/portafolio.git`
2. Abre `index.html` en el navegador, o usa la extensión **Live Server** de VS Code.

## Capturas

<!-- Agrega aquí capturas: assets/img/captura-desktop.png y assets/img/captura-movil.png -->
![Vista de escritorio](assets/img/captura-desktop.png)
![Vista móvil](assets/img/captura-movil.png)

## Autor

**Steven José Perea Romero** — Estudiante de Ingeniería en Software, UNEMI.
