<template lang="pug">
  div.controls(
    v-if="prevSlide || nextSlide",
  )
    div.controls__frame
      div.controls__content
        router-link(
          class="prev-next__link prev-next--prev",
          :to="prevRoute",
          :title="prevLabel",
        )
          svg(
            class="arrow-icon",
            viewBox="0 0 32 32",
            v-html="svgArrowPath('left')",
          )
        counter
        router-link(
          class="prev-next__link prev-next--next",
          :to="nextRoute",
          :title="nextLabel",
        )
          svg(
            class="arrow-icon",
            viewBox="0 0 32 32",
            v-html="svgArrowPath('right')",
          )
</template>

<script>
import Counter from './Counter.vue';

export default {
  components: { Counter },

  computed: {
    /**
     * @return {boolean} Whether the current route is for the first slide.
     */
    isFirstSlide() {
      return this.$store.getters.slideIndex === 0;
    },

    /**
     * @return {boolean} Whether the current route is for the last slide.
     */
    isLastSlide() {
      return this.$store.getters.slideIndex === this.$store.getters.totalSlideCount - 1;
    },

    /**
     * @return {string} Label for next route based on whether or not the 
     * current route is for the last slide.
     */
    nextLabel() {
      return this.isLastSlide ? 'Thumbnails' : this.nextSlide.title;
    },

    /**
     * @return {Object} The next route.
     */
    nextRoute() {
      if (this.isLastSlide) {
        return {
          name: 'thumbs',
          params: {
            slideshow: this.slideshowRoute,
            slug: 'thumbs'
          }
        };
      } else {
        return {
          name: 'slide',
          params: {
            slideshow: this.slideshowRoute,
            slug: this.nextSlide.slug
          }
        };
      }
    },

    /**
     * @return {Object} The next slide.
     */
    nextSlide() {
      return this.$store.getters.slideNext;
    },

    /**
     * @return {string} Label for previous route based on whether or not the 
     * current route is for the first slide.
     */
    prevLabel() {
      return this.isFirstSlide ? 'Cover' : this.prevSlide.title;
    },

    /**
     * @return {Object} The previous route.
     */
    prevRoute() {
      if (this.isFirstSlide) {
        return {
          name: 'cover',
          params: {
            slideshow: this.slideshowRoute
          }
        };
      } else {
        return {
          name: 'slide',
          params: {
            slideshow: this.slideshowRoute,
            slug: this.prevSlide.slug
          }
        };
      }
    },

    /**
     * @return {Object} The previous slide.
     */
    prevSlide() {
      return this.$store.getters.slidePrev;
    },

    /**
     * @return {Object} The current slideshow.
     */
    slideshowRoute() {
      return this.$route.params.slideshow;
    },
  },

  methods: {
    /**
     * @param {!string} direction - 'right' or 'left'
     * @return {string} SVG path for an arrow icon.
     */
    svgArrowPath(direction) {
      if (direction === 'left') {
        return '<path class="arrow-icon__path" d="m21.08768,26.09236l-10.17537,-10.1165l10.12708,-10.06822"/>';
      } else {
        return '<path class="arrow-icon__path" d="m10.91231,5.90764l10.17537,10.1165l-10.12708,10.06822"/>';
      }
    },
  }
}
</script>
