<template>
  <div id="app" class="app-layout">
    <!-- Barra de Navegación Principal -->
    <header class="navbar-header">
      <div class="navbar-container">
        <!-- Logo y Nombre de Marca Editorial -->
        <router-link to="/" class="brand-link">
          <img
            :src="arbolLogo"
            alt="Logo de Editorial Nova"
            class="brand-icon"
          />
          <div class="brand-text">
            <span class="brand-name">Editorial Nova</span>
            <span class="brand-tagline">BookList SPA</span>
          </div>
        </router-link>

        <!-- Enlaces de Navegación con router-link -->
        <nav class="nav-links">
          <router-link to="/" class="nav-item" exact-active-class="active">
            Inicio
          </router-link>
          <router-link to="/libros" class="nav-item" active-class="active">
            Catálogo de Libros
          </router-link>
        </nav>
      </div>
    </header>

    <!-- Contenido de las Vistas según la Ruta Activa -->
    <main class="main-content">
      <router-view />
    </main>

    <!-- Pie de Página -->
    <footer class="app-footer">
      <div class="footer-container">
        <p class="footer-copy">
          Todos los derechos reservados - Tania Cariz © 2026
        </p>
      </div>
    </footer>
  </div>
</template>

<script setup>
import arbolLogo from "./assets/arbol-logo.svg";
</script>

<style>
*,
*::before,
*::after {
  box-sizing: border-box;
}

body {
  margin: 0;
  padding: 0;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    "Helvetica Neue", Arial, sans-serif;
  background-color: #fbf8f5;
  color: #3e2723;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  line-height: 1.5;
}

.app-layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

/* Header & Navbar */
.navbar-header {
  background-color: #ffffff;
  border-bottom: 1px solid #eedfd5;
  position: sticky;
  top: 0;
  z-index: 50;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 6px -1px,
    rgba(0, 0, 0, 0.06) 0px 2px 4px -1px;
}

.navbar-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.brand-link {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  text-decoration: none;
  color: inherit;
  transition: opacity 0.15s ease;
}

.brand-link:hover {
  opacity: 0.9;
}

.brand-icon {
  height: 4rem;
  object-fit: contain;
}

.brand-text {
  display: flex;
  flex-direction: column;
}

.brand-name {
  font-size: 1.2rem;
  font-weight: 800;
  color: #4a2822;
  letter-spacing: -0.02em;
}

.brand-tagline {
  font-size: 0.75rem;
  color: #a0675b;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.06em;
}

.nav-links {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.nav-item {
  text-decoration: none;
  font-size: 1rem;
  font-weight: 600;
  color: #6d4c41;
  padding: 0.5rem 1.1rem;
  border-radius: 8px;
  transition: all 0.2s ease;
  border: 1px solid transparent;
}

.nav-item:hover {
  color: #4a2822;
  background-color: #f7ede8;
}

.nav-item.active {
  color: #4a2822;
  background-color: #f6e8e5;
  border-color: #e5c2bc;
  font-weight: 700;
}

/* Main Content Area */
.main-content {
  flex: 1;
  width: 100%;
}

/* Footer */
.app-footer {
  background-color: #ffffff;
  border-top: 1px solid #eedfd5;
  padding: 2rem 1rem;
  margin-top: auto;
  text-align: center;
}

.footer-container {
  max-width: 1200px;
  margin: 0 auto;
}

.footer-copy {
  margin: 0;
  font-size: 1rem;
  font-weight: 600;
  color: #6d4c41;
}

@media (max-width: 600px) {
  .navbar-container {
    flex-direction: column;
    gap: 0.75rem;
    align-items: flex-start;
  }
  .nav-links {
    width: 100%;
    justify-content: space-between;
  }
  .nav-item {
    padding: 0.4rem 0.75rem;
    font-size: 1rem;
  }
}
</style>
