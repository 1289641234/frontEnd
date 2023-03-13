import { asyncRouter, constantRoutes ,resetRouter} from '@/router'
import { filterAsyncRoutes } from '@/utils/permission'

const state = {
  routes: [],
  addRoutes: [],
  info:{},
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.routes = state.routes.concat(routes)
  },
  setUserInfo(state, info){
    state.info = info
  }
}

const actions = {
  generateRoutes({ commit }, roles) {
    console.log(roles)
    return new Promise(resolve => {
      let accessedRoutes
      if (roles.includes('admin')) {
        accessedRoutes = asyncRouter || []
      } else {
        accessedRoutes = filterAsyncRoutes(constantRoutes, roles)
      }
      resetRouter(accessedRoutes) //将添加的路由加上
      commit('SET_ROUTES', accessedRoutes)
      resolve(accessedRoutes)
    })
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
}
