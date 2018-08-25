const slides = {
  state: {
    direction: null,
    slideshow: {},
    slug: null,
  },

  mutations: {
    updateDirection (state, payload) {
      state.direction = payload;
    },

    updateSlide (state, payload) {
      const mySlide = state.slideshow.slides.find(slide => payload.slug == slide.slug);
      const slideIndex = state.slideshow.slides.indexOf(mySlide);
      state.slideshow.slides[slideIndex] = payload;
    },

    updateSlideshow (state, payload) {
      state.slideshow = payload;
    },

    updateSlug (state, payload) {
      state.slug = payload;
    },
  },

  actions: {
    updateSlide (context, value) {
      context.commit('updateSlide', value);
    },

    updateSlideshow (context, value) {
      context.commit('updateSlideshow', value);
    },
  },

  getters: {
    direction: (state) => state.direction,

    // This getter is throwing an error...
    hasSlideMedia: (state, getters) => {
      return false; // for debugging

      if (getters.hasSlideshow) {
        const slide = state.slideshow.slides.find(slide => slide.slug == state.slug);
        return (slide.media !== undefined) ? true : false;
      }
    },

    hasSlideshow: (state) => {
      return (state.slideshow.slides !== undefined);
    },

    slide: (state, getters) => {
      if (getters.hasSlideshow) {
        return state.slideshow.slides.find(slide => slide.slug == state.slug);
      }
    },

    slideFirst: (state, getters) => {
      if (getters.hasSlideshow) {
        return state.slideshow.slides[0];
      }
    },

    slideIndex: (state, getters) => {
      if (getters.hasSlideshow) {
        const slide = getters.slide;
        const slideIndex = state.slideshow.slides.indexOf(slide);
        return (slideIndex !== -1) ? slideIndex : null;
      }
    },

    slideLast: (state, getters) => {
      if (getters.hasSlideshow) {
        return state.slideshow.slides[state.slideshow.slides.length - 1];
      }
    },

    slideNext: (state, getters) => {
      if (getters.hasSlideshow) {
        const next = state.slideshow.slides[getters.slideIndex + 1];
        const nextIndex = state.slideshow.slides.indexOf(next);
        return (nextIndex !== -1) ? next : null;
      }
    },

    slidePrev: (state, getters) => {
      if (getters.hasSlideshow) {
        const prev = state.slideshow.slides[getters.slideIndex - 1];
        const prevIndex = state.slideshow.slides.indexOf(prev);
        return (prevIndex !== -1) ? prev : null;
      }
    },

    slideshow: (state, getters) => {
      if (getters.hasSlideshow) {
        return state.slideshow;
      }
    },

    totalSlideCount: (state, getters) => {
      if (getters.hasSlideshow) {
        return state.slideshow.slides.length;
      }
    },
  },
}

export default slides;
