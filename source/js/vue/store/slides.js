const slides = {
  state: {
    direction: null,
    slideshow: {},
    slug: null,
    theme: JSON.parse(localStorage.getItem('theme')) || 'light',
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

    updateTheme (state, payload) {
      localStorage.setItem('theme', JSON.stringify(payload));
      state.theme = payload;
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

    hasSlideMedia: (state, getters) => {
      if (getters.hasSlideshow && state.slug) {
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

    slideshowTitle: (state, getters) => {
      if (getters.hasSlideshow) {
        return state.slideshow.title;
      }
    },

    slug: (state) => state.slug,

    theme: (state) => state.theme,

    totalSlideCount: (state, getters) => {
      if (getters.hasSlideshow) {
        return state.slideshow.slides.length;
      }
    },
  },
}

export default slides;
