import store from '@/store'
import { createRouter, createWebHashHistory } from 'vue-router'

export const constantRoutes = [
  {
    path: '/',
    redirect: '/ditu',
  },
  {
    path: '/index',
    name: '首页',
    // component: () => import('@/views/infos/index.vue'),
    component: () => import('@/views/intro/index.vue'),
  },
  {
    path: '/ditu',
    name: '地图故事',
    component: () => import('@/views/ditu/index.vue'),
  },
  {
    path: '/jinian',
    name: '纪念馆',
    component: () => import('@/views/jinian/index.vue'),
  },
  {
    path: '/baodao',
    name: '事件报道',
    component: () => import('@/views/infos/index.vue'),
  },
  {
    path: '/about',
    name: '关于平台',
    component: () => import('@/views/infos/index.vue'),
  },
]

export const asyncRouter = [
  {
    path: '/shuju',
    name: '数据管理',
    component: () => import('@/views/shuju/index.vue'),
    meta: {
      roles: ['admin'],
    },
  },
  {
    path: '/yonghu',
    name: '用户管理',
    component: () => import('@/views/yonghu/index.vue'),
    meta: {
      roles: ['admin'],
    },
  },
]

export const router = createRouter({
  //history模式
  history: createWebHashHistory(),
  routes: constantRoutes,
})

export function resetRouter(accessedRoutes) {
  accessedRoutes.forEach(item => {
    router.addRoute(item)
  })
}

store.dispatch('router/generateRoutes', '')

const flag = true
const whiteList = ['/index', '/ditu', '/jinian', '/baodao', '/about']
//在每次路由跳转时进行判断
router.beforeEach((to, from, next) => {
  if (flag) {
    next()
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next('/ditu')
    }
  }
})
