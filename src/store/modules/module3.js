const state = {//基础信息和同意协议页面切换，使基础信息页面信息保存
  keepAliveList:[],
    check:true
  }
  const getters = {
    
  }
  // actions
  const actions = {
     
  }
  // mutations
  const mutations = {
    updateAliveList(state, { name, status ,data}) {
      if (status) {
        state.keepAliveList.push(name);
      }
    }
  }
export default {
    state,
    getters,
    actions,
    mutations
  }