const direction = {
  state: {
    direction: '',
  },
  
  mutations: {
    updateDirection(state, payload) {
      state.direction = payload;
    },
  },
  
  getters: {
    direction: (state) => state.direction,
  },
}
  
export default direction;
  