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
  }
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})
