import { createRouter, createWebHistory } from 'vue-router'

// Se crean las rutas para la aplicación y con la propiedad META (donde podemos crear nuestras propiedades)
// le pasa un valor booleano para mostrar o no el menú en el componente AppMenu.vue
const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/HomeView.vue'),
    meta: { menu: true, title: 'Inicio' },
  },
  {
    path: '/notes',
    name: 'notes',
    component: () => import('../views/NoteView.vue'),
    meta: { menu: true, title: 'Notas' },
  },
  // Ruta para mostrar el componente 404View.vue en caso de que no se encuentre la ruta
  {
    path: '/:pathMatch(.*)',
    name: 'Not found',
    component: () => import('../views/404View.vue'),
  },
]

// Se crea el router con las rutas definidas
// y se exporta para ser utilizado en el main.ts
const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
