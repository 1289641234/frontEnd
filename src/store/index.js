import { createStore } from 'vuex'
import global from './modules/global'
import router from './modules/router'
const store = new createStore({
  modules: { router, global },
})
export default store
