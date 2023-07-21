import type { RouteRecordRaw } from 'vue-router'
const layout = () => import('@/layout/index.vue')
import recordModule from '@/router/modules/record'

/**
 * 基础路由
 */
const basePage: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/record',
    component: layout,
    meta: { title: '' },
    children: [...recordModule],
  },
]

const routes = [...basePage]

export default routes
