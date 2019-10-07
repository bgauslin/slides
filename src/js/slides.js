require('dotenv').config();
import setup from './setup';
import Vue from 'vue/dist/vue.js';
import App from './vue/components/App.vue';
import router from './vue/router.js';
import store from './vue/store/index.js';
import transitions from './vue/transitions';

/** Import CSS for injection via JS. */
import '../stylus/slides.styl';

Vue.config.productionTip = false;
setup.init();

/** Bind transitions and router. */
transitions(router);

/**
 * Initialize app, pass it the store and router, and mount it to the DOM.
 * @instance
 */
new Vue({
  components: { App },
  router,
  store,
  template: '<app></app>',
}).$mount('#app');
