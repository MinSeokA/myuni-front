import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { useAuth } from '@/composables/useAuth'
import AuthCallback from '@/views/AuthCallback.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/my',
      name: 'my',
      component: () => import('../views/profile.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/:userId',
      name: 'PublicProfile',
      component: () => import('../views/myView.vue'),
      props: true,
    },
    { path: '/auth-callback', name: 'AuthCallback', component: AuthCallback },
  ],
})
// 라우트 가드 설정
router.beforeEach((to, from, next) => {
  const { isAuthenticated, checkAuth } = useAuth()
  checkAuth() // 로그인 상태 확인

  if (to.meta.requiresAuth && !isAuthenticated.value) {
    next({ name: 'home' })
  } else if (to.name === 'home' && isAuthenticated.value) {
    next({ name: 'my' })
  } else {
    next()
  }
})

export default router
