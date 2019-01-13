// Vue.
import Vue from 'vue/dist/vue.js';
import VueRouter from 'vue-router';
import Vuex from 'vuex';

// App.
import App from './components/App.vue';

// Store.
import direction from './store/direction';
import slideshow from './store/slideshow';
import theme from './store/theme';
import thumbs from './store/thumbs';
import transitions from './transitions';

// Routes.
import routeConfig from './routes';

// Initialize Vue modules.
Vue.use(Vuex);
Vue.use(VueRouter);
Vue.config.productionTip = false;

/** @instance */
const store = new Vuex.Store({
  modules: {
    direction: direction,
    slideshow: slideshow,
    theme: theme,
    thumbs: thumbs,
  }
});

/** @instance */
const scrollBehavior = (to, from, savedPosition) => {
  return {
    x: 0,
    y: 0,
  }
};

/** @instance */
const router = new VueRouter({
  routes: routeConfig(),
  mode: 'history',
  linkActiveClass: 'current',
  scrollBehavior,
});

transitions(router);

/** @instance */
const app = new Vue({
  components: { App },
  store,
  router,
}).$mount('#app');
