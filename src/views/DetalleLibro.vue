<template>
  <div class="detalle-libro-view">
    <!-- Navegación de regreso superior -->
    <div class="navegacion-superior">
      <router-link to="/libros" class="btn-volver">
        <span class="icono">←</span> Volver al catálogo de libros
      </router-link>
    </div>

    <!-- Si el libro existe -->
    <article v-if="libro" class="detalle-card">
      <header class="detalle-header">
        <div class="meta-row">
          <span class="badge-categoria" :class="'categoria-' + normalizarClase(libro.categoria)">
            {{ libro.categoria }}
          </span>
          <span class="id-tag">ID: #{{ libro.id }}</span>
        </div>
        <h1 class="detalle-titulo">{{ libro.titulo }}</h1>
        <div class="autor-row">
          <span class="autor-nombre">Autor: <strong>{{ libro.autor }}</strong></span>
        </div>
      </header>

      <div class="detalle-cuerpo">
        <h2 class="seccion-subtitulo">Descripción / Reseña</h2>
        <div class="descripcion-box">
          <p class="descripcion-texto">{{ libro.descripcion }}</p>
        </div>
      </div>

      <!-- Botón para regresar a /libros -->
      <footer class="detalle-footer">
        <router-link to="/libros" class="btn btn-volver-catalogo">
          Volver
        </router-link>
      </footer>
    </article>

    <!-- Estado si el libro no existe (ID erróneo o eliminado) -->
    <div v-else class="not-found-card">
      <div class="not-found-icon">📚</div>
      <h2>Libro no encontrado</h2>
      <p>No se encontró ningún libro registrado con el identificador <code>#{{ libroId }}</code>.</p>
      <router-link to="/libros" class="btn btn-primario">
        Volver a la lista de libros
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useLibros } from '../composables/useLibros'

const props = defineProps({
  id: {
    type: String,
    default: ''
  }
})

const route = useRoute()
const { obtenerLibroPorId } = useLibros()

// Obtenemos el ID ya sea por prop o por parámetro de ruta
const libroId = computed(() => props.id || route.params.id)

// Obtenemos el libro reactivamente según su ID
const libro = computed(() => obtenerLibroPorId(libroId.value))

const normalizarClase = (categoria) => {
  if (!categoria) return 'general'
  return categoria.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, '-')
}
</script>

<style scoped>
.detalle-libro-view {
  max-width: 800px;
  margin: 0 auto;
  padding: 1.5rem 1rem 3.5rem;
}

.navegacion-superior {
  margin-bottom: 1.5rem;
}

.btn-volver {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: #6d4c41;
  text-decoration: none;
  font-weight: 600;
  font-size: 1rem;
  transition: color 0.15s ease, transform 0.15s ease;
}

.btn-volver:hover {
  color: #4a2822;
  transform: translateX(-3px);
}

.detalle-card {
  background-color: #ffffff;
  border: 1px solid #eedfd5;
  border-radius: 16px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 6px -1px,
    rgba(0, 0, 0, 0.06) 0px 2px 4px -1px;
  overflow: hidden;
}

.detalle-header {
  background: linear-gradient(to bottom right, #fdfaf7, #f6eee9);
  padding: 2.25rem 2.5rem 1.85rem;
  border-bottom: 1px solid #eedfd5;
}

.meta-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.badge-categoria {
  font-size: 0.8rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  padding: 0.35rem 1rem;
  border-radius: 20px;
}

/* Categorías en tonos otoñales */
.categoria-ficcion { background-color: #f7eceb; color: #964955; }
.categoria-ciencia { background-color: #eef3ec; color: #435b3e; }
.categoria-ensayo { background-color: #f5ede6; color: #6e4635; }
.categoria-historia { background-color: #fceede; color: #9c4c23; }
.categoria-filosofia { background-color: #f3ebf2; color: #723e6b; }
.categoria-tecnologia { background-color: #fcf1df; color: #8a5719; }
.categoria-general { background-color: #f3ece6; color: #5d4037; }

.id-tag {
  font-size: 1rem;
  color: #a1887f;
  font-family: monospace;
}

.detalle-titulo {
  font-size: 2.2rem;
  font-weight: 800;
  color: #3e2723;
  margin: 0 0 0.75rem;
  line-height: 1.25;
}

.autor-row {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 1.1rem;
  color: #6d4c41;
}

.detalle-cuerpo {
  padding: 2.25rem 2.5rem 2rem;
}

.seccion-subtitulo {
  font-size: 1.15rem;
  color: #4a2822;
  margin: 0 0 1rem;
  font-weight: 700;
}

.descripcion-box {
  background-color: #fdfaf7;
  padding: 1.35rem 1.5rem;
  border-radius: 8px;
}

.descripcion-texto {
  font-size: 1.05rem;
  line-height: 1.75;
  color: #4e342e;
  margin: 0;
  white-space: pre-line;
}

/* Footer de acciones */
.detalle-footer {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 1.35rem 2.5rem;
  background-color: #fcf9f6;
  border-top: 1px solid #eedfd5;
}

.btn {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.7rem 1.3rem;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  text-decoration: none;
  transition: all 0.15s ease;
  border: none;
}

.btn-volver-catalogo {
  background-color: #726266;
  color: #ffffff;
}

.btn-volver-catalogo:hover {
  background-color: #5a4d51;
  transform: translateY(-1px);
}

/* Not Found */
.not-found-card {
  text-align: center;
  background-color: #ffffff;
  border: 2px dashed #d7ccc8;
  border-radius: 16px;
  padding: 3rem 1.5rem;
}

.not-found-icon {
  font-size: 3rem;
  margin-bottom: 0.5rem;
}

.not-found-card h2 {
  color: #4a2822;
  margin-bottom: 0.5rem;
}

.not-found-card p {
  color: #795548;
  margin-bottom: 1.5rem;
}

.not-found-card code {
  background-color: #f8eee8;
  color: #8c3b47;
  padding: 0.2rem 0.4rem;
  border-radius: 4px;
}

.btn-primario {
  background-color: #726266;
  color: #ffffff;
}

.btn-primario:hover {
  background-color: #5a4d51;
}

@media (max-width: 600px) {
  .detalle-header, .detalle-cuerpo, .detalle-footer {
    padding: 1.25rem;
  }
}
</style>
