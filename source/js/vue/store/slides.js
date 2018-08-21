const slides = {
  state: {
    direction: null,
    count: 0,
    slides: [],
    slideshow: null,
    // thumbs: [],
  },

  mutations: {
    setDirection (state, payload) {
      state.direction = payload;
    },

    storeCurrentSlideCount (state, payload) {
      state.count = payload;
    },

    storeSlide (state, payload) {
      state.slides[state.count - 1] = payload;
    },

    storeSlidesIndex (state, payload) {
      state.slides = payload;
    },

    storeSlideshow (state, payload) {
      state.slideshow = payload;
    },
  },

  actions: {
    storeSlide (context, value) {
      context.commit('storeSlide', value);
    },

    storeSlidesIndex (context, value) {
      context.commit('storeSlidesIndex', value);
    },
  },

  getters: {
    currentSlide: (state, getters) => state.slides[getters.currentSlideCount],

    currentSlideCount: (state) => state.count,

    direction: (state) => state.direction,

    // TODO: currentSlide.media throws an error if the field doesn't exist yet
    // hasSlide: (state, getters) => {
    //   const currentSlide = getters.currentSlide;
    //   return (currentSlide.media !== undefined);
    // },

    hasSlidesIndex: (state) => (state.slides.length > 0),

    slideId: (state, getters) => {
      const slide = getters.slides[getters.currentSlideCount - 1];
      return (slide !== undefined) ? slide.id : null;
    },

    slides: (state) => state.slides,

    slidesTotal: (state) => state.slides.length,
  },
}

export default slides;
