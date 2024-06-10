import { createRouter, createWebHistory } from 'vue-router'
import type { User } from '@/types/user'
import type { RouteRecordRaw } from 'vue-router'
import { LocalStorageKeys } from '@/contants/local-storage'
import { getFromLocalStorage } from '@/services/local-storage.service'
import {
  RouteNames,
  LayoutNames,
  nonAuthenticatedRoutes
} from '@/contants/router'

declare module 'vue-router' {
  interface RouteMeta {
    layout: LayoutNames
  }
}

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: RouteNames.HOME,
    meta: { layout: LayoutNames.DEFAULT },
    component: () => import('@/views/HomeView.vue')
  },
  {
    path: '/login',
    name: RouteNames.LOGIN,
    meta: { layout: LayoutNames.LOGIN },
    component: () => import('@/views/LoginView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  if (nonAuthenticatedRoutes.includes(to.name as RouteNames)) {
    next()
    return
  }

  const userInfo = getFromLocalStorage<User>(LocalStorageKeys.USER_INFO)
  const isAuthenticated = userInfo?.id !== undefined

  if (!isAuthenticated) {
    next({ name: RouteNames.LOGIN })
    return
  }

  next()
})

export default router
