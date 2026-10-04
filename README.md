# BookList SPA — Módulo 6 Alkemy

Aplicación SPA desarrollada para la gestión de catálogo de libros de Editorial Nova. Permite registrar nuevos libros mediante formularios reactivos, visualizarlos dinámicamente en el catálogo, eliminarlos y consultar sus detalles mediante rutas dinámicas.

---

## 🛠 Stack Tecnológico

- **Vue.js 3** (Composition API con sintaxis `<script setup>`)
- **Vue Router 4** (Modo historia y rutas dinámicas)
- **Vue CLI 5** (`@vue/cli-service`)
- **LocalStorage API** (Persistencia de datos)
- **CSS3 Scoped** (Diseño responsivo con paleta otoñal café y rosa)

---

## 🚀 Instalación y Ejecución

```bash
# 1. Instalar dependencias
npm install

# 2. Iniciar servidor de desarrollo
npm run serve
```

La aplicación se ejecutará en: `http://localhost:8080/`

---

## 📂 Estructura del Proyecto

```text
src/
├── assets/                  # Recursos estáticos
├── components/
│   └── Libro.vue            # Componente de tarjeta de libro (props y emits)
├── composables/
│   └── useLibros.js         # Estado reactivo global y persistencia en LocalStorage
├── router/
│   └── index.js             # Configuración de Vue Router (/, /libros, /libros/:id)
├── views/
│   ├── InicioView.vue       # Bienvenida, panel del lector y contador reactivo
│   ├── ListaLibros.vue      # Formulario reactivo y listado de libros
│   └── DetalleLibro.vue     # Detalle dinámico del libro por ID
├── App.vue                  # Layout base, barra de navegación y router-view
└── main.js                  # Inicialización de la aplicación Vue
```

---

**Autora:** Tania Cariz — 2026
