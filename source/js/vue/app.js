import Vue from 'vue/dist/vue.js';
import Vuex from 'vuex';
import VueRouter from 'vue-router';
import App from './components/App.vue';
import direction from './store/direction';
import slideshow from './store/slideshow';
import theme from './store/theme';
import thumbs from './store/thumbs';
import routeConfig from './routes';
import transitions from './transitions';

Vue.use(Vuex);
Vue.use(VueRouter);
Vue.config.productionTip = false;

/** @const {Object} */
const store = new Vuex.Store({
  modules: {
    direction: direction,
    slideshow: slideshow,
    theme: theme,
    thumbs: thumbs,
  }
});

/** @const {Object} */
const scrollBehavior = (to, from, savedPosition) => {
  return {
    x: 0,
    y: 0,
  }
};

/** @const {Object} */
const router = new VueRouter({
  routes: routeConfig(),
  mode: 'history',
  linkActiveClass: 'current',
  scrollBehavior,
});

transitions(router);

/** @const {Object} */
const app = new Vue({
  components: { App },
  store,
  router,
}).$mount('#app');
