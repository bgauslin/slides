const thumbs = {
  state: {
    thumbs: null,
  },

  mutations: {
    updateThumbs(state, payload) {
      state.thumbs = payload;
    },
  },

  actions: {
    updateThumbs(context, value) {
      context.commit('updateThumbs', value);
    },
  },

  getters: {
    thumbs: (state) => state.thumbs,
  },
}

export default thumbs;
  