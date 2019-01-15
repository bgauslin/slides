import attachFastClick from 'fastclick';
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

Vue.use(Vuex);
Vue.use(VueRouter);
Vue.config.productionTip = false;

/** Initializes FastClick. */
attachFastClick(document.body);

/**
 * Initializes data store.
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
 * Initializes the router.
 * @instance
 */
const router = new VueRouter({
  routes: routeConfig(),
  mode: 'history',
  linkActiveClass: 'current',
  scrollBehavior,
});

/** Binds transitions and router. */
transitions(router);

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
 * Initializes app, passes it the store and router, and mounts it to the DOM.
 * @instance
 */
const app = new Vue({
  components: { App },
  store,
  router,
}).$mount('#app');
