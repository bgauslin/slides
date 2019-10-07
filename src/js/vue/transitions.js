export default (router) => {
  router.beforeEach((to, from, next) => {
    let direction;

    if (from.name === null) {
      direction = 'first-run';
    } else if ((from.name === 'home' || from.name === 'cover') && (to.name === 'cover' || to.name === 'slide')) {
      direction = 'forward';
    } else if ((from.name === 'home' || from.name === 'cover' || from.name === 'slide') && to.name === 'thumbs') {
      direction = 'forward';
    } else if ((from.name === 'cover' || from.name === 'slide') && (to.name === 'home' || to.name === 'cover')) {
      direction = 'back';
    } else if (from.name === 'thumbs' && (to.name === 'home' || to.name === 'cover' || to.name === 'slide')) {
      direction = 'back';
    } else if (from.name === 'slide' && to.name === 'slide') {
      // Get all slides, find the 'to' slide and get its index.
      const slides = router.app.$store.getters.slideshow.slides;
      const toSlide = slides.find(slide => slide.slug == to.params.slug);
      const toIndex = slides.indexOf(toSlide);
      // Get index of the current slide.
      const fromIndex = router.app.$store.getters.slideIndex;
      // Compare 'current' and 'to' indexes to set direction.
      direction = (toIndex - fromIndex == 1) ? 'forward' : 'back';
    }

    // TODO: Get this working again...
    // router.app.$store.commit('updateDirection', direction);
    next();
  });
}
