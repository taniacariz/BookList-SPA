import { ref, computed } from 'vue'

const STORAGE_KEY = 'editorial_nova_libros_v3'

const LIBROS_INICIALES = [
  {
    id: '2',
    titulo: 'Breve historia del tiempo',
    autor: 'Stephen Hawking',
    categoria: 'Ciencia',
    descripcion: 'Un recorrido divulgativo fascinante desde el Big Bang hasta los agujeros negros, explorando los secretos del cosmos, el espacio y el tiempo de manera accesible y profunda.'
  },
  {
    id: '5',
    titulo: 'It',
    autor: 'Stephen King',
    categoria: 'Ficción',
    descripcion: 'Una novela de terror sobre un grupo de amigos que regresa a Derry para enfrentarse a la entidad que marcó su infancia y que vuelve a despertar décadas después.'
  },
  {
    id: '6',
    titulo: 'Los hombres que no amaban a las mujeres',
    autor: 'Stieg Larsson',
    categoria: 'Ficción',
    descripcion: 'El periodista Mikael Blomkvist y la hacker Lisbeth Salander investigan la desaparición de una joven ocurrida décadas atrás dentro de una poderosa familia.'
  },
  {
    id: '7',
    titulo: 'El cuervo',
    autor: 'Edgar Allan Poe',
    categoria: 'Ficción',
    descripcion: 'Poema gótico en el que un hombre afligido recibe la visita de un cuervo cuya repetición de una sola palabra intensifica su dolor y su obsesión.'
  }
]

export const CATEGORIAS_DISPONIBLES = [
  'Ficción',
  'Ensayo',
  'Ciencia',
  'Historia',
  'Filosofía',
  'Tecnología'
]

// Estado reactivo global compartido entre vistas y componentes
const libros = ref(cargarLibros())

function cargarLibros() {
  try {
    const guardados = localStorage.getItem(STORAGE_KEY)
    if (guardados) {
      const parsed = JSON.parse(guardados)
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed
      }
    }
  } catch (error) {
    console.error('Error al leer libros de localStorage:', error)
  }
  // Si no hay datos guardados o hubo un error, precargar datos iniciales
  localStorage.setItem(STORAGE_KEY, JSON.stringify(LIBROS_INICIALES))
  return [...LIBROS_INICIALES]
}

function persistirLibros() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(libros.value))
  } catch (error) {
    console.error('Error al guardar libros en localStorage:', error)
  }
}

export function useLibros() {
  const totalLibros = computed(() => libros.value.length)

  const agregarLibro = (nuevoLibro) => {
    if (!nuevoLibro.titulo || !nuevoLibro.autor) {
      return false
    }

    const libroCreado = {
      id: Date.now().toString(),
      titulo: nuevoLibro.titulo.trim(),
      autor: nuevoLibro.autor.trim(),
      categoria: nuevoLibro.categoria || 'Ficción',
      descripcion: nuevoLibro.descripcion ? nuevoLibro.descripcion.trim() : 'Sin descripción disponible.'
    }

    libros.value.unshift(libroCreado)
    persistirLibros()
    return libroCreado
  }

  const eliminarLibro = (id) => {
    const indice = libros.value.findIndex(l => String(l.id) === String(id))
    if (indice !== -1) {
      libros.value.splice(indice, 1)
      persistirLibros()
      return true
    }
    return false
  }

  const obtenerLibroPorId = (id) => {
    return libros.value.find(l => String(l.id) === String(id))
  }

  const restaurarLibrosIniciales = () => {
    libros.value = [...LIBROS_INICIALES]
    persistirLibros()
  }

  return {
    libros,
    totalLibros,
    categorias: CATEGORIAS_DISPONIBLES,
    agregarLibro,
    eliminarLibro,
    obtenerLibroPorId,
    restaurarLibrosIniciales
  }
}
