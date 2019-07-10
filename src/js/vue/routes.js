import Cover from './components/Cover.vue';
import Home from './components/Home.vue';
import NotFound from './components/NotFound.vue';
import Slide from './components/Slide.vue';
import Thumbs from './components/Thumbs.vue';

export default () => {
  const routes = [
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
    // https://stackoverflow.com/questions/45619407/how-to-create-a-404-component-in-vuejs-using-vue-router?rq=1
    {
      path: '/404',
      name: 'notFound',
      component: NotFound,
    },  
    {
      path: '*',
      redirect: '/404',
    },
  ];

  return routes;
}
