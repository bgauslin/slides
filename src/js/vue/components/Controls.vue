<template lang="pug">
  .controls(
    v-if="slidePrev || slideNext"
  )
    .controls__frame
      .controls__content
        router-link(
          v-if="prevRoute"
          :class="['prev-next__link', 'prev-next__link--prev']"
          :to="prevRoute"
          :title="prevLabel"
        )
          svg.icon.icon--prev-next(
            viewBox="0 0 24 24"
            aria-hidden="true"
          )
            path(:d="svgArrowPath('left')")
        counter
        router-link(
          v-if="nextRoute"
          :class="['prev-next__link', 'prev-next__link--next']"
          :to="nextRoute"
          :title="nextLabel"
        )
          svg.icon.icon--prev-next(
            viewBox="0 0 24 24"
            aria-hidden="true"
          )
            path(:d="svgArrowPath('right')")
</template>

<script>
import { mapGetters } from 'vuex';
import Counter from './Counter.vue';

export default {
  components: { Counter },

  computed: {
    ...mapGetters([
      'slideNext',
      'slidePrev',
      'slideIndex',
      'totalSlideCount',
    ]),

    /** @return {boolean} */
    isFirstSlide() {
      return this.slideIndex === 0;
    },

    /** @return {boolean} */
    isLastSlide() {
      return this.slideIndex === this.totalSlideCount - 1;
    },

    /** @return {string} */
    prevLabel() {
      return this.isFirstSlide ? 'Cover' : this.slidePrev.title;
    },

    /** @return {string} */
    nextLabel() {
      return this.isLastSlide ? 'Thumbnails' : this.slideNext.title;
    },

    /** @return {Object} */
    prevRoute() {
      if (this.isFirstSlide) {
        return {
          name: 'cover',
          params: {
            slideshow: this.slideshowRoute,
          }
        };
      } else if (this.slidePrev) {
        return {
          name: 'slide',
          params: {
            slideshow: this.slideshowRoute,
            slug: this.slidePrev.slug,
          }
        };
      }
    },

    /** @return {Object} */
    nextRoute() {
      if (this.isLastSlide) {
        return {
          name: 'thumbs',
          params: {
            slideshow: this.slideshowRoute,
            slug: 'thumbs',
          }
        };
      } else if (this.slideNext) {
        return {
          name: 'slide',
          params: {
            slideshow: this.slideshowRoute,
            slug: this.slideNext.slug,
          }
        };
      }
    },

    /**
     * The current slideshow.
     * @return {Object}
     */
    slideshowRoute() {
      return this.$route.params.slideshow;
    },
  },

  methods: {
    /**
     * SVG path for an arrow icon.
     * @param {!string} direction - 'right' or 'left'
     * @return {string}
     */
    svgArrowPath(direction) {
      return direction === 'left' ? 'M16,4 L8,12 L16,20' : 'M8,4 L16,12 L8,20';
    },
  }
}
</script>
