import Vue from 'vue/dist/vue.js';
import Vuex from 'vuex';
import VueRouter from 'vue-router';

import App from './components/App.vue';

import direction from './store/direction';
import slides from './store/slides';
import thumbs from './store/thumbs';

import routeConfig from './routes';
import transitions from './transitions';

Vue.use(Vuex);
Vue.use(VueRouter);

Vue.config.productionTip = false;

const store = new Vuex.Store({
  modules: {
    direction: direction,
    slides: slides,
    thumbs: thumbs,
  }
});

// TODO: remember scroll position instead of resetting it
const scrollBehavior = (to, from, savedPosition) => {
  return {
    x: 0,
    y: 0,
  }
};

const router = new VueRouter({
  routes: routeConfig(),
  mode: 'history',
  linkActiveClass: 'current',
  scrollBehavior,
});

transitions(router);

const app = new Vue({
  components: { App },
  store,
  router,
}).$mount('#app');
