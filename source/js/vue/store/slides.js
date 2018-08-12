const slides = {
  state: {
    direction: null,
    count: 0,
    slides: [],
    // slideshow: {},
    slug: null,
    thumbs: [],
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

    storeSlug (state, payload) {
      state.slug = payload;
    },
  },

  actions: {
    storeSlide (context, value) {
      context.commit('storeSlide', value);
    },

    storeSlidesIndex (context, value) {
      context.commit('storeSlidesIndex', value);
    },

    storeCurrentSlideCount (context, value) {
      context.commit('storeCurrentSlideCount', value);
    },
  },

  getters: {
    slides: (state) => state.slides,

    slideId: (state, getters) => {
      const slide = getters.slides[getters.currentSlideCount - 1];
      return (slide !== undefined) ? slide.id : null;
    },

    currentSlideCount: (state) => state.count,

    // slidesTotal: (state) => state.slides.length,

    hasSlidesIndex: (state) => (state.slides.length > 0),

    // slide: (state) => state.slides.find(slide => slide.id == state.id),

    // hasSlide: (state, getters) => {
    //   const slide = getters.slide;
    //   return (slide !== undefined) ? slide : null;
    // },

    direction: (state) => state.direction,
  },
}

export default slides;
