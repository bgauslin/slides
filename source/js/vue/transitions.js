export default router => {

  router.beforeEach((to, from, next) => {
    let direction;

    if (from.name === null) {
      direction = 'first-run';

    } else if ((from.name === 'home' || from.name === 'cover') && (to.name === 'cover' || to.name === 'slide')) {
      direction = 'forward';

    } else if (from.name === 'slide' && to.name === 'thumbs') {
      direction = 'forward';

    } else if (from.name === 'slide' && (to.name === 'home' || to.name === 'cover')) {
      direction = 'back';

    } else if (from.name === 'thumbs' && to.name === 'slide') {
      direction = 'back';

    } else if (from.name === 'slide' && to.name === 'slide') {
      direction = (to.params.count - from.params.count === 1) ? 'forward' : 'back';
    }

    router.app.$store.commit('setDirection', direction);

    next();
  });
}
