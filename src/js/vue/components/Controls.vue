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
            viewBox="0 0 32 32"
            v-html="svgArrowPath('left')"
          )
        counter
        router-link(
          v-if="nextRoute"
          :class="['prev-next__link', 'prev-next__link--next']"
          :to="nextRoute"
          :title="nextLabel"
        )
          svg.icon.icon--prev-next(
            viewBox="0 0 32 32"
            v-html="svgArrowPath('right')"
            aria-hidden="true"
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
    // TODO(svg): Update paths to polylines.
    svgArrowPath(direction) {
      const svgPath = new Map([
        ['left', 'm21.08768,26.09236l-10.17537,-10.1165l10.12708,-10.06822'],
        ['right', 'm10.91231,5.90764l10.17537,10.1165l-10.12708,10.06822'],
      ]);
      return `<path class="icon__path" d="${svgPath.get(direction)}"/>`;
    },
  }
}
</script>
