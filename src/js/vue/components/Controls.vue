<template lang="pug">
  div.controls(
    v-if="slidePrev || slideNext",
  )
    div.controls__frame
      div.controls__content
        router-link(
          class="prev-next__link prev-next__link--prev",
          :to="prevRoute",
          :title="prevLabel",
        )
          svg.arrow-icon(
            viewBox="0 0 32 32",
            v-html="svgArrowPath('left')",
          )
        counter
        router-link(
          class="prev-next__link prev-next__link--next",
          :to="nextRoute",
          :title="nextLabel",
        )
          svg.arrow-icon(
            viewBox="0 0 32 32",
            v-html="svgArrowPath('right')",
          )
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

    /**
     * Whether the current route is for the first slide.
     * @return {boolean}
     */
    isFirstSlide() {
      return this.slideIndex === 0;
    },

    /**
     * Whether the current route is for the last slide.
     * @return {boolean}
     */
    isLastSlide() {
      return this.slideIndex === this.totalSlideCount - 1;
    },

    /**
     * Label for next route based on whether or not the current route is for
     * the last slide.
     * @return {string}
     */
    nextLabel() {
      return this.isLastSlide ? 'Thumbnails' : this.slideNext.title;
    },

    /**
     * The next route.
     * @return {Object} 
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
            slug: this.slideNext.slug
          }
        };
      }
    },

    /**
     * Label for previous route based on whether or not the current route is
     * for the first slide.
     * @return {string}
     */
    prevLabel() {
      return this.isFirstSlide ? 'Cover' : this.slidePrev.title;
    },

    /**
     * The previous route.
     * @return {Object}
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
            slug: this.slidePrev.slug
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
      if (direction === 'left') {
        return '<path class="arrow-icon__path" d="m21.08768,26.09236l-10.17537,-10.1165l10.12708,-10.06822"/>';
      } else {
        return '<path class="arrow-icon__path" d="m10.91231,5.90764l10.17537,10.1165l-10.12708,10.06822"/>';
      }
    },
  }
}
</script>
