<template lang="pug">
  div.controls
    div.controls__frame
      div.controls__content
        router-link(
          class="prev-next__link prev-next--prev",
          :to="prevRoute",
          :title="prevLabel",
        )
        counter
        router-link(
          class="prev-next__link prev-next--next",
          :to="nextRoute",
          :title="nextLabel",
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
      return (this.$store.getters.slideIndex == this.$store.getters.totalSlideCount - 1);
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
  }
}
</script>

<style lang="stylus">
@import '../../../stylus/_config/'

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

.prev-next__link::before
.prev-next__link::after
  font-size CONTROLS_ICON_SIZE
  icon()
  position relative
  transition transform DEFAULT_TRANSITION

.prev-next--prev::before
  content ICON_ANGLE_LEFT
  margin-right auto
  right .1rem

.prev-next--next::after
  content ICON_ANGLE_RIGHT
  margin-left auto
  left .1rem

.prev-next__link:active::before
.prev-next__link:active::after
  transform scale(.8)

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

</style>
