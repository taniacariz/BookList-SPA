<template>
  <article class="libro-card">
    <div class="libro-header">
      <span
        class="libro-categoria"
        :class="'categoria-' + normalizarClase(libro.categoria)"
      >
        {{ libro.categoria }}
      </span>
      <span class="libro-id">#{{ libro.id }}</span>
    </div>

    <div class="libro-body">
      <h3 class="libro-titulo" :title="libro.titulo">{{ libro.titulo }}</h3>
      <p class="libro-autor">
        {{ libro.autor }}
      </p>
      <p class="libro-descripcion">
        {{ libro.descripcion }}
      </p>
    </div>

    <div class="libro-actions">
      <!-- Enlace dinámico con router-link hacia el detalle del libro -->
      <router-link :to="'/libros/' + libro.id" class="btn btn-detalle">
        <span>Ver detalle</span>
      </router-link>

      <!-- Botón para emitir evento eliminar hacia el padre -->
      <button
        type="button"
        class="btn btn-eliminar"
        @click="manejarEliminar"
        title="Eliminar este libro"
        :aria-label="'Eliminar ' + libro.titulo"
      >
        <svg
          class="icono-basurero"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <polyline points="3 6 5 6 21 6"></polyline>
          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
          <line x1="10" y1="11" x2="10" y2="17"></line>
          <line x1="14" y1="11" x2="14" y2="17"></line>
        </svg>
      </button>
    </div>
  </article>
</template>

<script setup>
const props = defineProps({
  libro: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(["eliminar"]);

const manejarEliminar = () => {
  emit("eliminar", props.libro.id);
};

const normalizarClase = (categoria) => {
  if (!categoria) return "general";
  return categoria
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, "-");
};
</script>

<style scoped>
.libro-card {
  background: #ffffff;
  border-radius: 14px;
  border: 1px solid #eedfd5;
  padding: 1.3rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 6px -1px,
    rgba(0, 0, 0, 0.06) 0px 2px 4px -1px;
  transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;
  position: relative;
  overflow: hidden;
}

.libro-card:hover {
  transform: translateY(-3px);
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 6px -1px,
    rgba(0, 0, 0, 0.06) 0px 2px 4px -1px;
  border-color: #d7ccc8;
}

.libro-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.libro-categoria {
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  padding: 0.25rem 0.7rem;
  border-radius: 20px;
}

/* Categorías con paleta otoñal café, rosa y tierra */
.categoria-ficcion {
  background-color: #f7eceb;
  color: #964955;
}
.categoria-ciencia {
  background-color: #eef3ec;
  color: #435b3e;
}
.categoria-ensayo {
  background-color: #f5ede6;
  color: #6e4635;
}
.categoria-historia {
  background-color: #fceede;
  color: #9c4c23;
}
.categoria-filosofia {
  background-color: #f3ebf2;
  color: #723e6b;
}
.categoria-tecnologia {
  background-color: #fcf1df;
  color: #8a5719;
}
.categoria-general {
  background-color: #f3ece6;
  color: #5d4037;
}

.libro-id {
  font-size: 0.75rem;
  color: #a1887f;
  font-family: monospace;
}

.libro-body {
  flex: 1;
  margin-bottom: 1.25rem;
}

.libro-titulo {
  margin: 0 0 0.4rem 0;
  font-size: 1.15rem;
  font-weight: 700;
  color: #3e2723;
  line-height: 1.35;
}

.libro-autor {
  margin: 0 0 0.75rem 0;
  font-size: 1rem;
  font-weight: 500;
  color: #795548;
}

.libro-descripcion {
  margin: 0;
  font-size: 1rem;
  color: #6d4c41;
  line-height: 1.5;
  min-height: 4.5rem;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
}

.libro-actions {
  display: flex;
  gap: 0.65rem;
  align-items: center;
  padding-top: 1rem;
  border-top: 1px solid #f5ede6;
}

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.35rem;
  height: 42px;
  font-size: 1rem;
  font-weight: 600;
  border-radius: 8px;
  cursor: pointer;
  text-decoration: none;
  transition: all 0.15s ease;
  border: none;
  box-sizing: border-box;
}

.btn-detalle {
  flex: 1;
  padding: 0 1rem;
  background-color: #726266;
  color: #ffffff;
}

.btn-detalle:hover {
  background-color: #5a4d51;
  transform: translateY(-1px);
}

.btn-eliminar {
  width: 42px;
  height: 42px;
  padding: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  background-color: #faecee;
  color: #992336;
  border: 1px solid #f6ccd2;
  border-radius: 8px;
  transition: all 0.15s ease;
}

.btn-eliminar:hover {
  background-color: #f7dbe0;
  color: #7d1a29;
  border-color: #f1b8c1;
  transform: translateY(-1px);
}

.icono-basurero {
  width: 19px;
  height: 19px;
  display: block;
}
</style>
