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
│   ├── InicioView.vue       # Bienvenida, saludo MVVM y contador reactivo
│   ├── ListaLibros.vue      # Formulario reactivo y listado de libros
│   └── DetalleLibro.vue     # Detalle dinámico del libro por ID
├── App.vue                  # Layout base, barra de navegación y router-view
└── main.js                  # Inicialización de la aplicación Vue
```

---

## 📋 Cumplimiento de Lecciones

- **Lección 1 (Introducción y MVVM):** Estructura base en `App.vue`; en `InicioView.vue` se implementa el patrón MVVM con vinculación de nombre (`v-model`) y un contador reactivo con métodos (`+`, `-`, reiniciar).
- **Lección 2 (Templates y Directivas):** Componente modular `Libro.vue` con `v-bind`; uso de `v-for` para iterar el catálogo, `v-if` para el estado vacío y `v-show` para visibilidad condicional.
- **Lección 3 (Binding de Formularios):** Formulario en `ListaLibros.vue` con `<input>`, `<select>` y `<textarea>` enlazados con `v-model`, junto a visualización en tiempo real de los datos ingresados.
- **Lección 4 (Eventos y Modificadores):** Manejo de eventos `@click` (agregar y eliminar), modificador `@submit.prevent`, modificador `@click.once` en restauración y evento de teclado `@keyup.enter`.
- **Lección 5 (Rutas y Vistas):** Configuración de rutas (`/`, `/libros`, `/libros/:id`) con Vue Router 4 y vista dinámica `DetalleLibro.vue` que recibe `:id` como prop.

---

**Autora:** Tania Cariz — 2026
