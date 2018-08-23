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
      // TODO: temporarily hard-code direction until logic below is worked out.
      direction = 'forward';

      const foo = false;
      if (foo) {
        // get all slides, find the 'to' slide, get its index
        const slideshow = router.app.$store.getters.slideshow;
        const toSlide = slideshow.find(slide => slide.slug == to.params.slug);
        const toIndex = slideshow.indexOf(toSlide);
        // get the index of the current slide
        const fromIndex = router.app.$store.getters.slideIndex;
        // compare 'currrent' and 'to' indexes to determine transition direction
        direction = (toIndex - fromIndex == 1) ? 'forward' : 'back';
      }
    }

    router.app.$store.commit('updateDirection', direction);

    next();
  });
}
