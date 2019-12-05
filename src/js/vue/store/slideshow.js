const slideshow = {
  state: {
    allSlideshows: [],
    slideSlug: null,
    slideshowSlug: null,
  },

  mutations: {
    updateSlide(state, payload) {
      const mySlideshow = state.allSlideshows.find(slideshow => slideshow.slug === state.slideshowSlug);
      const mySlide = mySlideshow.slides.find(slide => payload.slug === slide.slug);
      const slideIndex = mySlideshow.slides.indexOf(mySlide);
      mySlideshow.slides[slideIndex] = payload;
    },

    updateSlideshow(state, payload) {
      state.allSlideshows.push(payload);
    },

    updateSlideSlug(state, payload) {
      state.slideSlug = payload;
    },

    updateSlideshowSlug(state, payload) {
      state.slideshowSlug = payload;
    },

    updateThumbs(state, payload) {
      const mySlideshow = state.allSlideshows.find(slideshow => slideshow.slug === state.slideshowSlug);
      mySlideshow.thumbs = payload;
    },
  },

  actions: {
    updateSlide(context, value) {
      context.commit('updateSlide', value);
    },

    updateSlideshow(context, value) {
      context.commit('updateSlideshow', value);
    },

    updateSlideshowSlug(context, value) {
      context.commit('updateSlideshowSlug', value);
    },

    updateThumbs(context, value) {
      context.commit('updateThumbs', value);
    },
  },

  getters: {
    hasSlideshow: (state) => {
      const currentSlideshow = state.allSlideshows.find(slideshow => {
        return slideshow.slug === state.slideshowSlug;
      });
      return (currentSlideshow !== undefined && currentSlideshow.slides !== undefined);
    },

    slide: (state, getters) => {
      if (getters.hasSlideshow) {
        return getters.slideshow.slides.find(slide => slide.slug === state.slideSlug);
      }
    },

    slideFirst: (state, getters) => {
      if (getters.hasSlideshow) {
        return getters.slideshow.slides[0];
      }
    },

    slideIndex: (state, getters) => {
      if (getters.hasSlideshow) {
        const slide = getters.slide;
        const slideIndex = getters.slideshow.slides.indexOf(slide);
        return (slideIndex !== -1) ? slideIndex : null;
      }
    },

    slideNext: (state, getters) => {
      if (getters.hasSlideshow) {
        const next = getters.slideshow.slides[getters.slideIndex + 1];
        const nextIndex = getters.slideshow.slides.indexOf(next);
        return (nextIndex !== -1) ? next : null;
      }
    },

    slidePrev: (state, getters) => {
      if (getters.hasSlideshow) {
        const prev = getters.slideshow.slides[getters.slideIndex - 1];
        const prevIndex = getters.slideshow.slides.indexOf(prev);
        return (prevIndex !== -1) ? prev : null;
      }
    },

    slideshow: (state, getters) => {
      if (getters.hasSlideshow) {
        return state.allSlideshows.find(slideshow => slideshow.slug === state.slideshowSlug);
      }
    },

    slideshowTitle: (state, getters) => {
      if (getters.hasSlideshow) {
        return getters.slideshow.title;
      }
    },
    
    slideSlug: (state) => state.slideSlug,

    slideshowSlug: (state) => state.slideshowSlug,

    thumbs: (state, getters) => {
      if (getters.hasSlideshow) {
        return getters.slideshow.thumbs;
      }
    },

    totalSlideCount: (state, getters) => {
      if (getters.hasSlideshow) {
        return getters.slideshow.slides.length;
      }
    },
  },
}

export default slideshow;
