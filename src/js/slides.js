require('dotenv').config();

import setup from './setup';
import Vue from 'vue/dist/vue.js';
import App from './vue/components/App.vue';
import router from './vue/router.js';
import store from './vue/store/index.js';
import transitions from './vue/transitions';

import '../stylus/slides.styl';

Vue.config.productionTip = false;
transitions(router);
setup.init();

new Vue({
  components: { App },
  router,
  store,
  template: '<app></app>',
}).$mount('#app');
