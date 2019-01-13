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
          v-html="svgArrowLeft",
        )
        counter
        router-link(
          class="prev-next__link prev-next--next",
          :to="nextRoute",
          :title="nextLabel",
          v-html="svgArrowRight",
        )
</template>

<script>
import Counter from './Counter.vue';

export default {
  components: { Counter },

  computed: {
    isFirstSlide () {
      return (this.$store.getters.slideIndex === 0);
    },

    isLastSlide () {
      return (this.$store.getters.slideIndex === this.$store.getters.totalSlideCount - 1);
    },

    nextLabel () {
      if (this.isLastSlide) {
        return 'Thumbnails';
      } else {
        return this.nextSlide.title;
      }
    },

    nextRoute () {
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

    nextSlide () {
      return this.$store.getters.slideNext;
    },

    prevLabel () {
      if (this.isFirstSlide) {
        return 'Cover';
      } else {
        return this.prevSlide.title;
      }
    },

    prevRoute () {
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

    prevSlide () {
      return this.$store.getters.slidePrev;
    },

    slideshowRoute () {
      return this.$route.params.slideshow;
    },

    // Make the SVG scaleable.
    // https://css-tricks.com/scale-svg/
    svgArrowLeft () {
      return `
        <svg class="prev-next__svg" xmlns="http://www.w3.org/2000/svg" xmlns:svg="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
          <path class="prev-next__svg__path" d="m21.08768,26.09236l-10.17537,-10.1165l10.12708,-10.06822"/>
        </svg>
      `;
    },

    svgArrowRight () {
      return `
        <svg class="prev-next__svg" xmlns="http://www.w3.org/2000/svg" xmlns:svg="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
          <path class="prev-next__svg__path" d="m10.91231,5.90764l10.17537,10.1165l-10.12708,10.06822"/>
        </svg>
      `;
    },
  }
}
</script>

<style lang="stylus">
@import '../../../stylus/config/'

.controls
  bottom 0
  height CONTROLS_HEIGHT
  left 0
  position fixed
  width 100vw
  z-index 1
  
  @media BREAKPOINT_MEDIUM
    height CONTROLS_HEIGHT_MEDIUM

.controls__frame
  margin 0 auto
  max-width CONTENT_MAX_WIDTH

.controls__content
  align-items center
  display flex
  justify-content space-between

  @media BREAKPOINT_LARGE
    margin 0 0 0 COLUMN_GAP
    width SIDEBAR_WIDTH

.prev-next__link
  align-items center
  display inline-flex
  flex 1
  height CONTROLS_HEIGHT
  justify-content center
  overflow hidden

  @media BREAKPOINT_MEDIUM
    height CONTROLS_HEIGHT_MEDIUM

.prev-next--prev
.prev-next--next
  padding 0 px_to_rem(8)

  @media BREAKPOINT_MEDIUM
    padding 0 px_to_rem(12)

  @media BREAKPOINT_LARGE
    padding 0

@media BREAKPOINT_LARGE
  .prev-next--prev
    margin-left px_to_rem(-8)

  .prev-next--next
    margin-right px_to_rem(-8)

.prev-next__svg
  height auto
  width CONTROLS_ICON_SIZE
  transition transform DEFAULT_TRANSITION

.prev-next__link:active .prev-next__svg
  transform scale(.8)

.prev-next--prev .prev-next__svg
  margin-right auto

.prev-next--next .prev-next__svg
  margin-left auto

.prev-next__svg__path
  fill none
  stroke-width 4
  transition stroke DEFAULT_TRANSITION

</style>
