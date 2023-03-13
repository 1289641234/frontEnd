const state = {
  headIndex: 0,
  iframeURL: 'https://www.meet99.com/jingdian-malangemingjinianguan.html',
}

const mutations = {
  setHeadIndex: (state, index) => {
    state.headIndex = index
  },
  setIframeURL: (state, url) => {
    state.iframeURL = url
  },
}

const actions = {
  changeHeadIndex({ commit }, index) {
    commit('setHeadIndex', index)
  },
  changeIframeURL({ commit }, url) {
    commit('setIframeURL', url)
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
}
