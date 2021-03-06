import Vue from 'vue/dist/vue.js';
import VueRouter from 'vue-router';

const Cover = () => import('./components/Cover.vue');
const Home = () => import('./components/Home.vue');
const NotFound = () => import('./components/NotFound.vue');
const Slide = () => import( './components/Slide.vue');
const Thumbs = () => import( './components/Thumbs.vue');

Vue.use(VueRouter);

const scrollBehavior = (to, from, savedPosition) => {
  return { x: 0, y: 0 }
};

export default new VueRouter({
  mode: 'history',
  linkActiveClass: 'current',
  scrollBehavior,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/:slideshow',
      name: 'cover',
      component: Cover,
    },
    {
      path: '/:slideshow/thumbs',
      name: 'thumbs',
      component: Thumbs,
    },
    {
      path: '/:slideshow/:slug',
      name: 'slide',
      component: Slide,
    },
    {
      path: '/slide',
      name: 'redirect',
      redirect: '/',
    },
    {
      // Catch-all 404 route for URLs with more than two segments. Otherwise,
      // App.vue handles when to show a 404 page.
      path: '*',
      name: '404',
      component: NotFound,
    },
  ],
});
