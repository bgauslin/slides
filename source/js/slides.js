import fastclick from 'fastclick';
import setup from './setup';
import Vue from 'vue/dist/vue.js';
import VueRouter from 'vue-router';
import Vuex from 'vuex';
import App from './vue/components/App.vue';
import routeConfig from './vue/routes';
import direction from './vue/store/direction';
import slideshow from './vue/store/slideshow';
import theme from './vue/store/theme';
import thumbs from './vue/store/thumbs';
import transitions from './vue/transitions';

/** Initialize FastClick. */
fastclick(document.body);

/** Set up Vue and global utilities. */
Vue.use(Vuex);
Vue.use(VueRouter);
Vue.config.productionTip = false;
setup.init();

// TODO: Fix scrollBehavior.
/**
 * Resets scroll position when route changes.
 * @const
 */
const scrollBehavior = (to, from, savedPosition) => {
  return {
    x: 0,
    y: 0,
  }
};

/**
 * Initialize data store.
 * @instance
 */
const store = new Vuex.Store({
  modules: {
    direction: direction,
    slideshow: slideshow,
    theme: theme,
    thumbs: thumbs,
  }
});

/**
 * Initialize the router.
 * @instance
 */
const router = new VueRouter({
  routes: routeConfig(),
  mode: 'history',
  linkActiveClass: 'current',
  scrollBehavior,
});

/** Bind transitions and router. */
transitions(router);

/**
 * Initialize app, pass it the store and router, and mount it to the DOM.
 * @instance
 */
const app = new Vue({
  components: { App },
  data: {
    apiBaseURL: setup.apiBaseURL(),
  },
  router,
  store,
  template: '<app></app>',
}).$mount('#app');
