import { createRouter, createWebHistory } from 'vue-router'
const index = () => import('@/views/index.vue')
const err = () => import('@/views/404.vue')

export const routes = [
  {
    path: '/',
    name: 'index',
    components: index,
  },
  {
    path: '/:catchAll(.*)',
    name: '404',
    components: err,
    meta: { hidden: true }
  }
]

const router = createRouter({
  history: createWebHistory('/vitept/'),
  routes,
  scrollBehavior(to, from, savedPosition) {
    return { top: 0 }
  }
})

export default router
