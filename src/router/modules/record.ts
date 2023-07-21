const record = () => import('@/views/record/index.vue')

import type { RouteRecordRaw } from 'vue-router'

const recordModule: RouteRecordRaw[] = [
  {
    path: '/record',
    component: record,
  },
]

export default recordModule
