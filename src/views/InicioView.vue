<template>
  <div class="inicio-view">
    <!-- Pantalla de Bienvenida y Presentación Institucional -->
    <section class="hero-section">
      <div class="hero-badge">Editorial Nova</div>
      <h1 class="hero-title">BookList SPA</h1>
      <p class="hero-subtitle">
        Bienvenido a la plataforma de gestión y catálogo interactivo de
        <strong>Editorial Nova</strong>. Aquí podrás explorar los títulos
        disponibles, registrar nuevas obras literarias y consultar los detalles
        de cada libro.
      </p>

      <div class="hero-actions">
        <router-link to="/libros" class="btn-primary">
          Ver Catálogo de Libros
        </router-link>
      </div>
    </section>

    <!-- Panel del Lector y Contador -->
    <section class="usuario-seccion">
      <div class="usuario-card">
        <h2 class="seccion-titulo">Panel del Lector</h2>

        <!-- Entrada y salida reactiva del nombre de usuario (MVVM) -->
        <div class="mvvm-grupo">
          <label for="nombre-usuario" class="label-mvvm">Nombre del lector:</label>
          <input
            id="nombre-usuario"
            v-model="nombreUsuario"
            type="text"
            class="form-control input-nombre"
            placeholder="Ingresa tu nombre..."
          />
          <div class="saludo-box">
            <p>
              ¡Bienvenido/a, <strong>{{ nombreUsuario.trim() || 'Lector/a' }}</strong>!
            </p>
          </div>
        </div>

        <!-- Contador básico reactivo con métodos -->
        <div class="contador-grupo">
          <div class="contador-info">
            <span class="contador-label">Contador de libros leídos:</span>
            <span class="contador-numero">{{ contador }}</span>
          </div>
          <div class="contador-acciones">
            <button
              type="button"
              class="btn btn-contador"
              @click="decrementar"
              :disabled="contador <= 0"
              title="Disminuir contador"
            >
              -
            </button>
            <button
              type="button"
              class="btn btn-contador"
              @click="incrementar"
              title="Aumentar contador"
            >
              +
            </button>
            <button
              type="button"
              class="btn btn-contador-reset"
              @click="reiniciar"
              title="Reiniciar a cero"
            >
              Reiniciar
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- Presentación de la Editorial -->
    <section class="presentacion-card">
      <h2 class="seccion-titulo">Sobre Editorial Nova</h2>
      <p class="seccion-texto">
        En Editorial Nova nos dedicamos a la divulgación, preservación y
        difusión de obras literarias, científicas y humanísticas. Nuestra misión
        es conectar lectores y autores a través de una experiencia ágil, moderna
        y accesible.
      </p>
      <div class="destacados-lista">
        <div class="destacado-item">
          <div class="icono-contenedor">
            <svg
              class="icono-svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
              <path d="M22 3h-6a4 4 0 0 1-4 4v14a3 3 0 0 1 3-3h7z"></path>
            </svg>
          </div>
          <div>
            <h3>Gestión Centralizada</h3>
            <p>
              Registra y administra obras literarias organizadas por categorías.
            </p>
          </div>
        </div>
        <div class="destacado-item">
          <div class="icono-contenedor">
            <svg
              class="icono-svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect>
              <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
              <path d="M9 12h6"></path>
              <path d="M9 16h6"></path>
            </svg>
          </div>
          <div>
            <h3>Fichas Detalladas</h3>
            <p>Accede a la sinopsis completa y autoría de cada publicación.</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue'

// Estado reactivo del usuario y contador
const nombreUsuario = ref('Tania Cariz')
const contador = ref(0)

// Métodos para controlar el contador reactivo
const incrementar = () => {
  contador.value++
}

const decrementar = () => {
  if (contador.value > 0) {
    contador.value--
  }
}

const reiniciar = () => {
  contador.value = 0
}
</script>

<style scoped>
.inicio-view {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2.5rem 1rem 4rem;
}

/* Hero Section */
.hero-section {
  text-align: center;
  padding: 3rem 2rem;
  background: #726266;
  color: #ffffff;
  border-radius: 18px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 6px -1px,
    rgba(0, 0, 0, 0.06) 0px 2px 4px -1px;
  margin-bottom: 2rem;
}

.hero-badge {
  display: inline-block;
  background-color: rgba(255, 255, 255, 0.16);
  color: #f7deda;
  font-size: 1rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  padding: 0.35rem 1rem;
  border-radius: 20px;
  margin-bottom: 1.25rem;
}

.hero-title {
  font-size: 2.8rem;
  font-weight: 800;
  margin: 0 0 1rem;
  letter-spacing: -0.02em;
}

.hero-subtitle {
  font-size: 1.15rem;
  color: #eedcd7;
  max-width: 650px;
  margin: 0 auto 2rem;
  line-height: 1.65;
}

.hero-actions {
  display: flex;
  justify-content: center;
}

.btn-primary {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background-color: #b76e79;
  color: #ffffff;
  font-size: 1.05rem;
  font-weight: 700;
  padding: 1rem 2rem;
  border-radius: 10px;
  text-decoration: none;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 6px -1px,
    rgba(0, 0, 0, 0.06) 0px 2px 4px -1px;
  transition: all 0.2s ease;
}

.btn-primary:hover {
  background-color: #9e5863;
  transform: translateY(-2px);
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 6px -1px,
    rgba(0, 0, 0, 0.06) 0px 2px 4px -1px;
}

/* Panel del Lector y Contador */
.usuario-seccion {
  margin-bottom: 2rem;
}

.usuario-card {
  background-color: #ffffff;
  border: 1px solid #eedfd5;
  border-radius: 16px;
  padding: 2rem 2.25rem;
  box-shadow: rgba(0, 0, 0, 0.08) 0px 4px 6px -1px;
}

.seccion-subtitulo {
  font-size: 1rem;
  color: #8d6e63;
  margin: 0 0 1.25rem;
}

.mvvm-grupo {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
}

.label-mvvm {
  font-size: 1rem;
  font-weight: 600;
  color: #4e342e;
}

.input-nombre {
  width: 100%;
  box-sizing: border-box;
  padding: 0.7rem 1rem;
  border: 1px solid #d7ccc8;
  border-radius: 8px;
  font-size: 1rem;
  color: #3e2723;
  background-color: #ffffff;
  outline: none;
  transition: border-color 0.15s ease, box-shadow 0.15s ease;
}

.input-nombre:focus {
  border-color: #b76e79;
  box-shadow: 0 0 0 3px rgba(183, 110, 121, 0.2);
}

.saludo-box {
  background-color: #fcf4f0;
  padding: 0.75rem 1rem;
  border-radius: 6px;
  color: #726266;
  font-size: 1rem;
}

.saludo-box p {
  margin: 0;
}

.contador-grupo {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
  background-color: #fdfaf7;
  border: 1px solid #eedfd5;
  padding: 1rem 1.25rem;
  border-radius: 10px;
}

.contador-info {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.contador-label {
  font-size: 1rem;
  color: #4e342e;
  font-weight: 600;
}

.contador-numero {
  font-size: 1rem;
  font-weight: 600;
  color: #4a2822;
  background-color: #f7ede8;
  padding: 0.25rem 0.65rem;
  border-radius: 6px;
  border: 1px solid #ebd4cb;
}

.contador-acciones {
  display: flex;
  gap: 0.5rem;
}

.btn-contador {
  width: 32px;
  height: 32px;
  border-radius: 6px;
  border: 1px solid #d7ccc8;
  background-color: #ffffff;
  color: #4a2822;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.15s ease;
}

.btn-contador:hover:not(:disabled) {
  background-color: #726266;
  color: #ffffff;
  border-color: #726266;
}

.btn-contador:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.btn-contador-reset {
  padding: 0.4rem 0.9rem;
  border-radius: 8px;
  border: 1px solid #eedfd5;
  background-color: #f7ede8;
  color: #6d4c41;
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.15s ease;
}

.btn-contador-reset:hover {
  background-color: #ebdcd3;
  color: #3e2723;
}

/* Tarjeta de Presentación */
.presentacion-card {
  background-color: #ffffff;
  border: 1px solid #eedfd5;
  border-radius: 16px;
  padding: 2.25rem;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 6px -1px,
    rgba(0, 0, 0, 0.06) 0px 2px 4px -1px;
}

.seccion-titulo {
  font-size: 1.4rem;
  color: #4a2822;
  margin: 0 0 0.85rem;
  font-weight: 800;
}

.seccion-texto {
  font-size: 1rem;
  color: #6d4c41;
  line-height: 1.7;
  margin: 0 0 1.75rem;
}

.destacados-lista {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 1.5rem;
  border-top: 1px solid #f5ede6;
  padding-top: 1.5rem;
}

.destacado-item {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
}

.icono-contenedor {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  border-radius: 10px;
  background-color: #f7ede8;
  color: #726266;
  border: 1px solid #ebd4cb;
  flex-shrink: 0;
}

.icono-svg {
  width: 24px;
  height: 24px;
  display: block;
}

.destacado-item h3 {
  margin: 0 0 0.25rem;
  font-size: 1.05rem;
  color: #4a2822;
  font-weight: 700;
}

.destacado-item p {
  margin: 0;
  font-size: 1rem;
  color: #795548;
  line-height: 1.5;
}
</style>
