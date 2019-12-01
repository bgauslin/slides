import Vue from 'vue/dist/vue.js';
import Vuex from 'vuex';

import direction from './direction';
import slideshow from './slideshow';
import theme from './theme';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    direction,
    slideshow,
    theme,
  }
});
