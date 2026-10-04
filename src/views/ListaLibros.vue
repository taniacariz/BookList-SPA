<template>
  <div class="lista-libros-view">
    <!-- Encabezado de la Sección -->
    <header class="page-header">
      <div>
        <h1 class="page-title">Catálogo de Libros</h1>
        <p class="page-subtitle">
          Gestiona y registra los títulos disponibles en Editorial Nova.
        </p>
      </div>
      <div class="header-badge" v-show="totalLibros > 0">
        <span>Total: <strong>{{ totalLibros }}</strong> libros</span>
      </div>
    </header>

    <div class="layout-grid">
      <!-- Columna Izquierda: Formulario Reactivo para Añadir Libro -->
      <section class="form-container">
        <div class="panel-card">
          <h2 class="panel-title">Registra un Nuevo Libro</h2>
          <p class="panel-subtitle">
            Completa el formulario para incorporar un nuevo libro al listado.
          </p>

          <!-- Formulario de registro -->
          <form @submit.prevent="manejarSubmit" class="formulario-libro">
            <!-- Campo Título -->
            <div class="form-group">
              <label for="titulo">
                Título del Libro <span class="requerido">*</span>
              </label>
              <input
                id="titulo"
                v-model.trim="nuevoLibro.titulo"
                type="text"
                placeholder="Ej: Rayuela"
                required
                class="form-control"
                @keyup.enter="manejarSubmit"
              />
            </div>

            <!-- Campo Autor -->
            <div class="form-group">
              <label for="autor">
                Autor <span class="requerido">*</span>
              </label>
              <input
                id="autor"
                v-model.trim="nuevoLibro.autor"
                type="text"
                placeholder="Ej: Julio Cortázar"
                required
                class="form-control"
                @keyup.enter="manejarSubmit"
              />
            </div>

            <!-- Campo Categoría (Select) -->
            <div class="form-group">
              <label for="categoria">
                Categoría <span class="requerido">*</span>
              </label>
              <select
                id="categoria"
                v-model="nuevoLibro.categoria"
                required
                class="form-control"
              >
                <option value="" disabled>Selecciona una categoría</option>
                <option v-for="cat in categorias" :key="cat" :value="cat">
                  {{ cat }}
                </option>
              </select>
            </div>

            <!-- Campo Descripción (Textarea) -->
            <div class="form-group">
              <label for="descripcion">Descripción:</label>
              <textarea
                id="descripcion"
                v-model.trim="nuevoLibro.descripcion"
                rows="4"
                placeholder="Breve sinopsis, temática o resumen de la obra..."
                class="form-control textarea"
              ></textarea>
            </div>

            <!-- Botón de Envío del Formulario -->
            <div class="form-actions">
              <button type="submit" class="btn btn-submit" @click="manejarClickSubmit">
                Guardar Libro
              </button>
            </div>
          </form>

          <!-- Visualización en tiempo real de los datos ingresados -->
          <div
            v-show="nuevoLibro.titulo || nuevoLibro.autor || nuevoLibro.descripcion"
            class="datos-tiempo-real"
          >
            <h3 class="tiempo-real-titulo">Datos en tiempo real (v-model):</h3>
            <div class="tiempo-real-cuerpo">
              <p><strong>Título:</strong> {{ nuevoLibro.titulo || '—' }}</p>
              <p><strong>Autor:</strong> {{ nuevoLibro.autor || '—' }}</p>
              <p><strong>Categoría:</strong> {{ nuevoLibro.categoria }}</p>
              <p v-show="nuevoLibro.descripcion">
                <strong>Descripción:</strong> {{ nuevoLibro.descripcion }}
              </p>
            </div>
          </div>
        </div>
      </section>

      <!-- Columna Derecha: Catálogo de Libros -->
      <section class="catalogo-container">
        <!-- Estado vacío cuando no hay libros registrados -->
        <div v-if="libros.length === 0" class="empty-state">
          <h3>No hay libros registrados en la lista</h3>
          <p>
            Utiliza el formulario para añadir un nuevo libro al catálogo de
            Editorial Nova.
          </p>
          <button
            type="button"
            class="btn btn-restaurar"
            @click.once="restaurarLibrosIniciales"
          >
            Restaurar catálogo inicial
          </button>
        </div>

        <!-- Listado de libros -->
        <div v-else class="libros-grid">
          <Libro
            v-for="libro in libros"
            :key="libro.id"
            :libro="libro"
            @eliminar="manejarEliminarLibro"
          />
        </div>

        <!-- Conteo del catálogo -->
        <div v-show="libros.length > 0" class="catalogo-footer">
          <span class="catalogo-conteo">
            Total registrados: <strong>{{ libros.length }}</strong> libros.
          </span>
          <button
            type="button"
            class="btn-link-restaurar"
            @click="restaurarLibrosIniciales"
            title="Restablece la lista a los libros de muestra iniciales"
          >
            Restaurar catálogo inicial
          </button>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import Libro from '../components/Libro.vue'
import { useLibros } from '../composables/useLibros'

// Consumir el estado y métodos centralizados con persistencia
const {
  libros,
  totalLibros,
  categorias,
  agregarLibro,
  eliminarLibro,
  restaurarLibrosIniciales
} = useLibros()

// Estado reactivo del formulario con `reactive` vinculado con v-model
const nuevoLibro = reactive({
  titulo: '',
  autor: '',
  categoria: 'Ficción',
  descripcion: ''
})

// Manejo del envío del formulario con @submit.prevent y Enter
const manejarSubmit = () => {
  if (!nuevoLibro.titulo.trim() || !nuevoLibro.autor.trim()) {
    return
  }

  agregarLibro({
    titulo: nuevoLibro.titulo,
    autor: nuevoLibro.autor,
    categoria: nuevoLibro.categoria,
    descripcion: nuevoLibro.descripcion
  })

  // Limpiar campos tras guardar
  nuevoLibro.titulo = ''
  nuevoLibro.autor = ''
  nuevoLibro.categoria = 'Ficción'
  nuevoLibro.descripcion = ''
}

// Disparador opcional de click en el botón de submit
const manejarClickSubmit = () => {
  // El formulario procesa vía @submit.prevent
}

// Manejo de eliminación mediante evento emitido por componente hijo Libro.vue
const manejarEliminarLibro = (id) => {
  eliminarLibro(id)
}
</script>

<style scoped>
.lista-libros-view {
  max-width: 1200px;
  margin: 0 auto;
  padding: 1.5rem 1rem 3.5rem;
}

/* Header de la Página en tonos otoñales */
.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 2.5rem;
}

.page-title {
  font-size: 2.1rem;
  font-weight: 800;
  color: #4a2822;
  margin: 0 0 0.25rem;
  letter-spacing: -0.02em;
}

.page-subtitle {
  margin: 0;
  font-size: 1rem;
  color: #795548;
}

.header-badge span {
  background-color: #f7ece8;
  color: #726266;
  border: 1px solid #ebd4cb;
  padding: 0.45rem 1.1rem;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 600;
}

/* Layout Grid */
.layout-grid {
  display: grid;
  grid-template-columns: 360px 1fr;
  gap: 2rem;
  align-items: start;
}

@media (max-width: 920px) {
  .layout-grid {
    grid-template-columns: 1fr;
  }
}

/* Panel Izquierdo */
.panel-card {
  background-color: #ffffff;
  border: 1px solid #eedfd5;
  border-radius: 14px;
  padding: 1.5rem;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 6px -1px,
    rgba(0, 0, 0, 0.06) 0px 2px 4px -1px;
}

.panel-title {
  font-size: 1.25rem;
  font-weight: 700;
  color: #4a2822;
  margin: 0 0 0.35rem;
}

.panel-subtitle {
  font-size: 0.9rem;
  color: #8d6e63;
  margin: 0 0 1.25rem;
  line-height: 1.45;
}

/* Formulario */
.formulario-libro {
  display: flex;
  flex-direction: column;
  gap: 1.1rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.form-group label {
  font-size: 1rem;
  font-weight: 600;
  color: #4e342e;
}

.requerido {
  color: #b74a58;
}

.form-control {
  width: 100%;
  box-sizing: border-box;
  padding: 0.7rem 1rem;
  border: 1px solid #d7ccc8;
  border-radius: 8px;
  font-size: 1rem;
  color: #3e2723;
  background-color: #ffffff;
  transition: border-color 0.15s ease, box-shadow 0.15s ease;
}

.form-control:focus {
  outline: none;
  border-color: #b76e79;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 6px -1px,
    rgba(0, 0, 0, 0.06) 0px 2px 4px -1px;
}

.textarea {
  resize: vertical;
  min-height: 90px;
  font-family: inherit;
}

.form-actions {
  display: flex;
  margin-top: 0.5rem;
}

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.7rem 1.1rem;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.15s ease;
  border: none;
}

.btn-submit {
  width: 100%;
  background-color: #726266;
  color: #ffffff;
}

.btn-submit:hover {
  background-color: #5a4d51;
  transform: translateY(-1px);
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 6px -1px,
    rgba(0, 0, 0, 0.06) 0px 2px 4px -1px;
}

/* Datos en tiempo real */
.datos-tiempo-real {
  margin-top: 1.5rem;
  padding: 1rem 1.1rem;
  background-color: #fdfaf7;
  border: 1px dashed #d7ccc8;
  border-radius: 10px;
}

.tiempo-real-titulo {
  margin: 0 0 0.5rem;
  font-size: 0.85rem;
  color: #8d6e63;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  font-weight: 700;
}

.tiempo-real-cuerpo p {
  margin: 0.25rem 0;
  font-size: 0.85rem;
  color: #726266;
  line-height: 1.4;
  word-break: break-word;
}

/* Columna Derecha: Catálogo */
.catalogo-container {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

/* Grid de Libros */
.libros-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.25rem;
}

/* Empty State Otoñal */
.empty-state {
  background-color: #ffffff;
  border: 2px dashed #d7ccc8;
  border-radius: 14px;
  padding: 3rem 1.5rem;
  text-align: center;
}

.empty-icon {
  font-size: 3rem;
  margin-bottom: 0.75rem;
}

.empty-state h3 {
  font-size: 1.2rem;
  color: #4a2822;
  margin: 0 0 0.5rem;
}

.empty-state p {
  font-size: 1rem;
  color: #795548;
  max-width: 450px;
  margin: 0 auto 1.25rem;
}

.btn-restaurar {
  background-color: #726266;
  color: #ffffff;
}

.btn-restaurar:hover {
  background-color: #5a4d51;
}

/* Footer Catálogo */
.catalogo-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.75rem;
  padding-top: 1.5rem;
  font-size: 1rem;
  color: #795548;
}

.btn-link-restaurar {
  background: none;
  border: none;
  color: #b76e79;
  font-size: 1rem;
  font-weight: 700;
  cursor: pointer;
  text-decoration: underline;
  padding: 0;
}

.btn-link-restaurar:hover {
  color: #8c3b47;
}
</style>
