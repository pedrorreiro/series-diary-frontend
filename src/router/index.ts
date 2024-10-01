import HomeView from '@/views/Home/HomeView.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: {
        requiresData: true
      }
    },
    {
      path: '/error',
      name: 'error',
      component: () => import('@/views/Error/ErrorView.vue')
    }
  ]
})
export default router
