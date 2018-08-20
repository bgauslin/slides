import Home from './components/Home.vue';
import Slide from './components/Slide.vue';
import Cover from './components/Cover.vue';
import Thumbs from './components/Thumbs.vue';
import NotFound from './components/NotFound.vue';

export default function() {
  const routes = [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/:slug',
      name: 'start',
      component: Cover,
    },
    {
      path: '/:slug/:count',
      name: 'slide',
      component: Slide,
    },
    {
      path: '/:slug/thumbs',
      name: 'thumbs',
      component: Thumbs,
    },
    {
      path: '/slide',
      name: 'redirect',
      redirect: '/',
    },
    {
      path: '*',
      name: 'notFound',
      component: NotFound,
    },
  ];
  return routes;
}
