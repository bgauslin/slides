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

    svgArrowLeft () {
      return `
        <svg class="arrow-icon" viewBox="0 0 32 32">
          <path class="arrow-icon__path" d="m21.08768,26.09236l-10.17537,-10.1165l10.12708,-10.06822"/>
        </svg>
      `;
    },

    svgArrowRight () {
      return `
        <svg class="arrow-icon" viewBox="0 0 32 32">
          <path class="arrow-icon__path" d="m10.91231,5.90764l10.17537,10.1165l-10.12708,10.06822"/>
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
  height '%s' % Layout.ControlsHeights.BASE
  left 0
  position fixed
  width 100vw
  z-index 1
  
  @media Breakpoints.MEDIUM
    height '%s' % Layout.ControlsHeights.MEDIUM

.controls__frame
  margin 0 auto
  max-width CONTENT_MAX_WIDTH

.controls__content
  align-items center
  display flex
  justify-content space-between

  @media Breakpoints.LARGE
    margin 0 0 0 COLUMN_GAP
    width SIDEBAR_WIDTH

.prev-next__link
  align-items center
  display inline-flex
  flex 1
  height '%s' % Layout.ControlsHeights.BASE
  justify-content center
  overflow hidden

  @media Breakpoints.MEDIUM
    height '%s' % Layout.ControlsHeights.MEDIUM

.prev-next--prev
.prev-next--next
  padding 0 px_to_rem(8)

  @media Breakpoints.MEDIUM
    padding 0 px_to_rem(12)

  @media Breakpoints.LARGE
    padding 0

@media Breakpoints.LARGE
  .prev-next--prev
    margin-left px_to_rem(-8)

  .prev-next--next
    margin-right px_to_rem(-8)

.arrow-icon
  height auto
  width '%s' % Layout.IconSizes.CONTROLS
  transition 'transform %s' % Transitions.DEFAULT

.prev-next__link:active .arrow-icon
  transform scale(.8)

.prev-next--prev .arrow-icon
  margin-right auto

.prev-next--next .arrow-icon
  margin-left auto

.arrow-icon__path
  fill none
  stroke-width 4
  transition 'stroke %s' % Transitions.DEFAULT

</style>
