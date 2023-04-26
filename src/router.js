import { createRouter, createWebHistory } from 'vue-router'
import index from './views/index.vue'

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'index',
      components: index,
    },
    {
      path: '/:catchAll(.*)',
      components: () => { '@/views/404.vue' },
      meta: { hidden: true }
    }
  ],
})
