import Vue from 'vue/dist/vue.js';
import Vuex from 'vuex';
import VueRouter from 'vue-router';

import App from './components/App.vue';
import slides from './store/slides';
import routeConfig from './routes';
import transitions from './transitions';

Vue.use(Vuex);
Vue.use(VueRouter);

const store = new Vuex.Store({
  modules: {
    slides: slides,
  }
})

// TODO: remember scroll position instead of resetting it
const scrollBehavior = (to, from, savedPosition) => {
  return {
    x: 0,
    y: 0,
  }
}

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
