const direction = {
    state: {
      direction: null,
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
  