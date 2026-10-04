# Memoria Técnica y Documento Explicativo del Proyecto
## BookList SPA — Gestor de Libros Interactivo con Vue.js

---

### 1. Ficha del Proyecto y Datos Generales

| Campo | Detalle |
| :--- | :--- |
| **Proyecto** | BookList SPA – Gestor de Libros Interactivo |
| **Programa** | Evaluación del Módulo #6: Desarrollo de Interfaces Interactivas con Framework Vue |
| **Institución** | Alkemy |
| **Unidad Solicitante** | Área de Desarrollo Frontend — Editorial Nova |
| **Estudiante / Rol** | Tania Cariz — Frontend Developer |
| **Año** | 2026 |

---

### 2. Decisiones Técnicas y Arquitectura

#### Justificación del Tooling
Siguiendo las pautas académicas y técnicas requeridas para el módulo, el proyecto fue inicializado y configurado mediante **Vue CLI 5** (`@vue/cli-service`), integrando de forma nativa **Vue 3** y **Vue Router 4**. Esta decisión garantiza una compatibilidad completa con el ecosistema de Webpack, gestión optimizada de dependencias y soporte para transpilación con Babel.

#### Paradigma: Composition API con `<script setup>`
Se adoptó exclusivamente la sintaxis moderna de **Composition API** a través de la etiqueta `<script setup>`, descartando la sintaxis clásica de Options API y el uso manual de `setup(props, context)`. Esta arquitectura aporta:
- **Mayor concisión y legibilidad:** Menor código boilerplate al declarar estados y funciones.
- **Rendimiento superior en compilación:** Las variables y métodos declarados quedan expuestos automáticamente al template.
- **Macros de compilación nativas:** Uso de `defineProps()` para la recepción de propiedades tipadas y `defineEmits()` para la emisión declarativa de eventos personalizados.

#### Gestión del Estado y Persistencia
Para desacoplar la lógica de datos de la capa visual, se diseñó un módulo composable centralizado ([`src/composables/useLibros.js`](file:///C:/Users/bloer/Desktop/proyecto-06/src/composables/useLibros.js)). El estado global de los libros se almacena en una referencia reactiva (`ref`) sincronizada automáticamente con la API de **LocalStorage** (`editorial_nova_libros_v1`), asegurando que las modificaciones (altas o bajas) persistan ante recargas de página.

#### Enfoque de UX y Estilos
Se implementó un diseño sobrio, responsivo y adaptado a la identidad de una casa editorial. Los estilos están organizados mediante CSS Scoped en cada vista y componente, aplicando una paleta de colores otoñales basada en tonalidades café tostado (`#4a2822`, `#5c3a33`), rosas empolvados (`#b76e79`) y fondos cálidos pergamino (`#fbf8f5`), garantizando contraste, jerarquía visual y accesibilidad.

---

### 3. Desglose de Implementación por Lecciones (Hitos)

#### Lección 1: Introducción a Vue.js & Patrón MVVM
- **Componente raíz (`App.vue`):** Define la estructura estructural con barra de navegación institucional, contenedor dinámico `<router-view>` y pie de página con créditos autorales.
- **Patrón MVVM en `InicioView.vue`:** Demostración de enlace bidireccional reactivo vinculando la variable `nombreUsuario` mediante `v-model` con proyección instantánea del saludo al lector.
- **Contador reactivo:** En el Panel del Lector se implementó un contador interactivo gestionado con estado reactivo (`ref`) y métodos dedicados (`incrementar`, `decrementar`, `reiniciar`).

#### Lección 2: Templates y Rendering
- **Componente modular (`Libro.vue`):** Tarjeta desacoplada que recibe los datos de la obra vía `defineProps()` y los renderiza haciendo uso de `v-bind` (`:class`, `:to`, `:title`).
- **Directiva `v-for`:** Iteración reactiva sobre la colección de libros garantizando identificación única con `:key="libro.id"`.
- **Directivas `v-if` y `v-show`:**
  - `v-if`: Control del estado vacío (*empty state*) que despliega una alerta amigable cuando no existen libros registrados, ofreciendo la restauración del catálogo inicial.
  - `v-show`: Control de visibilidad condicional sin destruir nodos del DOM para el totalizador del catálogo y la caja de datos en vivo.

#### Lección 3: Binding de Formularios
- **Formulario reactivo en `ListaLibros.vue`:** Dispone de los controles solicitados: `<input type="text">` para Título, `<input type="text">` para Autor, `<select>` para Categoría (Ficción, Ensayo, Ciencia, Historia, etc.) y `<textarea>` para Descripción o Reseña.
- **Enlace bidireccional (`v-model`):** Sincronización instantánea de los campos con el estado reactivo (`reactive`).
- **Visualización en tiempo real:** Bloque reactivo que proyecta al instante los datos que el usuario va tipeando antes de procesar el guardado, confirmando la reactividad en tiempo real del modelo.

#### Lección 4: Manejo de Eventos
- **Eventos `@click`:** Disparadores para el envío del formulario y para la eliminación de libros desde la tarjeta hija hacia la vista contenedora.
- **Comunicación hijo-padre:** `Libro.vue` emite el evento `@eliminar` mediante `defineEmits(['eliminar'])`, preservando el principio de responsabilidad única.
- **Modificadores de eventos:**
  - `@submit.prevent="manejarSubmit"`: Evita el refresco tradicional de la página al registrar un libro.
  - `@click.once="restaurarLibrosIniciales"`: Asegura la ejecución por única vez del disparador de restauración en el estado vacío.
- **Eventos de teclado:** `@keyup.enter` habilitado en los campos de entrada para permitir el registro ágil mediante el teclado.

#### Lección 5: Enrutamiento con Vue Router
- **Rutas configuradas en `src/router/index.js`:**
  1. `/` -> `InicioView.vue`: Pantalla de bienvenida y presentación editorial.
  2. `/libros` -> `ListaLibros.vue`: Gestión de catálogo y formulario.
  3. `/libros/:id` -> `DetalleLibro.vue`: Vista de detalle dinámico.
- **Rutas dinámicas y paso de Props:** La vista de detalle consume el parámetro `:id` tanto por ruta como por propiedad directa (`props: true`), consultando la obra correspondiente y facilitando un botón de retorno a la lista de libros.
- **Soporte HTML5 History:** Inclusión de `devServer: { historyApiFallback: true }` en [`vue.config.js`](file:///C:/Users/bloer/Desktop/proyecto-06/vue.config.js) para permitir navegación directa y recargas de página sin errores 404.

---

### 4. Instrucciones de Despliegue y Ejecución Local

#### Prerrequisitos
- Node.js (versión 16 o superior recomendada).
- Gestor de paquetes npm.

#### Pasos para la puesta en marcha

```bash
# 1. Clonar o descomprimir el proyecto en tu equipo
cd C:\Users\bloer\Desktop\proyecto-06

# 2. Instalar dependencias del proyecto
npm install

# 3. Iniciar el servidor de desarrollo
npm run serve
```

Una vez iniciado el servidor, acceder desde el navegador a:
👉 **`http://localhost:8080/`**

#### Compilación para producción (Opcional)
```bash
npm run build
```
Generará el bundle optimizado y minificado dentro del directorio `dist/`.

---

### 5. Conclusiones y Aprendizajes Clave

El desarrollo de **BookList SPA** consolida las capacidades fundamentales del desarrollo frontend moderno con Vue.js:
1. **Modularidad y Desacoplamiento:** La separación entre vistas (`views`), componentes reutilizables (`components`) y lógica de datos compartida (`composables`) permite un código mantenible, ordenado y escalable.
2. **Flujo Unidireccional de Datos (*Props Down, Events Up*):** La tarjeta `Libro.vue` recibe información de forma inmutable a través de props y notifica intenciones de cambio mediante eventos emitidos, garantizando una arquitectura predecible.
3. **Experiencia de Usuario Fluida (SPA):** La integración de Vue Router 4 permite transiciones instantáneas entre pantallas sin recargas de página, optimizando los tiempos de respuesta y la interacción del usuario.
4. **Dominio de la Reactividad Moderna:** La adopción de la Composition API (`ref`, `reactive`, `<script setup>`) demuestra el estándar actual recomendado por el equipo oficial de Vue.js para proyectos profesionales en producción.
