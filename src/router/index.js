import { createRouter, createWebHistory } from 'vue-router'
import InicioView from '../views/InicioView.vue'
import ListaLibros from '../views/ListaLibros.vue'
import DetalleLibro from '../views/DetalleLibro.vue'

const routes = [
  {
    path: '/',
    name: 'Inicio',
    component: InicioView
  },
  {
    path: '/libros',
    name: 'ListaLibros',
    component: ListaLibros
  },
  {
    path: '/libros/:id',
    name: 'DetalleLibro',
    component: DetalleLibro,
    props: true
  },
  {
    // Redirección ante cualquier ruta no reconocida
    path: '/:pathMatch(.*)*',
    redirect: '/'
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior() {
    // Al navegar, siempre desplazar al inicio de la página
    return { top: 0 }
  }
})

export default router
