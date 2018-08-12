export default router => {

  router.beforeEach((to, from, next) => {
    let direction;

    if (from.name === null) {
      direction = 'first-run';

    } else if ((from.name === 'home' || from.name === 'start') && (to.name === 'start' || to.name === 'slide')) {
      direction = 'forward';

    } else if (from.name === 'slide' && (to.name === 'home' || to.name === 'start')) {
      direction = 'back';

    } else if (from.name === 'slide' && to.name === 'slide') {
      direction = (to.params.count - from.params.count === 1) ? 'forward' : 'back';
    }

    router.app.$store.commit('setDirection', direction);

    next();
  });
}
