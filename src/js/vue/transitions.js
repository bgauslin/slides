export default (router) => {
  router.beforeEach((to, from, next) => {
    let direction = 'first-run';

    // If we're moving from slide to slide, first get all slides, find the
    // indexes of the 'to' and 'from' slides, then compare their values and set
    // 'direction' accordingly.
    if (from.name === 'slide' && to.name === 'slide') {
      const slides = router.app.$store.getters.slideshow.slides;
      const toSlide = slides.find(slide => slide.slug == to.params.slug);
      const toIndex = slides.indexOf(toSlide);
      const fromIndex = router.app.$store.getters.slideIndex;
      direction = (toIndex - fromIndex == 1) ? 'forward' : 'back';

    // Otherwise, set direction based on other to/from route combination.
    } else {
      const transition = [
        {
          direction: 'forward',
          toFrom: [
            ['cover', 'home'],
            ['slide', 'cover'],
            ['thumbs', 'slide'],
          ]
        },
        {
          direction: 'back',
          toFrom: [
            ['cover', 'slide'],
            ['cover', 'thumbs'],
            ['home', 'cover'],
            ['slide', 'thumbs'],
          ]
        }
      ];

      let i = 0;
      while (i < transition.length) {
        const group = transition[i];
        let j = 0;
        while (j < group.toFrom.length) {
          const [to_, from_] = group.toFrom[j];
          if (to.name === to_ && from.name == from_) {
            direction = group.direction;
          }
          j++;
        }
        i++;
      }
    }

    if (router.app.$store) {
      router.app.$store.commit('updateDirection', direction);
    }
    next();
  });
}
