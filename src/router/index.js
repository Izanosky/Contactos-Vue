import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/HomeView.vue'),
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('../views/AboutView.vue'),
  },
  {
    path: '/contactos',
    name: 'contactos',
    component: () => import('../views/contactos/ContactosView.vue'),
  },
  {
    path: '/contactos/:id',
    name: 'contacto-detalle',
    component: () => import('../views/contactos/DetallesContactoView.vue'),
    props: true,
  },
  {
    path: '/contactos/:id/editar',
    name: 'contacto-editar',
    component: () => import('../views/contactos/EditarContactoView.vue'),
    props: true,
  },
  {
    path: '/contactos/nuevo',
    name: 'contacto-nuevo',
    component: () => import('../views/contactos/NuevoContactoView.vue'),
  }
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})
