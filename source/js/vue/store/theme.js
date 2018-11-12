const theme = {
    state: {
      theme: JSON.parse(localStorage.getItem('theme')) || 'dark',
    },
  
    mutations: {
      updateTheme (state, payload) {
        localStorage.setItem('theme', JSON.stringify(payload));
        state.theme = payload;
      },
    },
  
    getters: {
      theme: (state) => state.theme,
    },
  }
  
  export default theme;
  