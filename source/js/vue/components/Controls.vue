<template lang="pug">
  div.controls
    div.controls__frame
      div.controls__content
        div.prev
          router-link(
            v-if="isFirstSlide",
            class="prev-next__link",
            title="Cover",
            :to="{ name: 'cover', params: { slideshow: slideshowRoute } }",
          )
          router-link(
            v-if="slidePrev",
            class="prev-next__link",
            :to="{ name: 'slide', params: { slideshow: slideshowRoute, slug: slidePrev.slug } }",
            :title="slidePrev.title",
          )
            span.prev-next__label Prev
        div.count
          router-link(
            class="count__link",
            :to="{ name: 'thumbs' }",
            title="View thumbnails",
          ) {{ currentSlideCount }} of {{ totalSlideCount }}
        div.next
          router-link(
            v-if="slideNext",
            class="prev-next__link",
            :to="{ name: 'slide', params: { slideshow: slideshowRoute, slug: slideNext.slug } }",
            :title="slideNext.title",
          )
          router-link(
            v-if="isLastSlide",
            class="prev-next__link",
            title="Thumbnails",
            :to="{ name: 'thumbs', params: { slideshow: slideshowRoute, slug: 'thumbs' } }",
          )
            span.prev-next__label Next
</template>

<script>
export default {
  computed: {
    currentSlideCount () {
      return this.$store.getters.slideIndex + 1;
    },

    isFirstSlide () {
      return (this.$store.getters.slideIndex === 0);
    },

    isLastSlide () {
      return (this.$store.getters.slideIndex == this.$store.getters.totalSlideCount - 1);
    },

    totalSlideCount () {
      return this.$store.getters.totalSlideCount;
    },

    slideLast () {
      return this.$store.getters.slideLast;
    },

    slideNext () {
      return this.$store.getters.slideNext;
    },

    slidePrev () {
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
    margin 0 0 0 COLUMN_GAP_LARGE
    width SIDEBAR_WIDTH

.count
  font-size CAPTION_SIZE
  heading_font()

  @media BREAKPOINT_MEDIUM
    font-size CAPTION_SIZE_MEDIUM

.prev-next__link
.count__link
  align-items center
  display inline-flex
  height CONTROLS_HEIGHT
  justify-content center
  overflow hidden
  transition transform DEFAULT_TRANSITION
  width CONTROLS_HEIGHT

  @media BREAKPOINT_MEDIUM
    height CONTROLS_HEIGHT_MEDIUM
    width CONTROLS_HEIGHT_MEDIUM

.prev-next__link:active
.count__link:active
  transform scale(.8)

.prev-next__link::before
.prev-next__link::after
  font-size CONTROLS_ICON_SIZE
  icon()
  position relative

.prev-next__label
  display none

.prev .prev-next__link::before
  content ICON_ANGLE_LEFT
  right .1rem

.next .prev-next__link::after
  content ICON_ANGLE_RIGHT
  left .1rem

@media BREAKPOINT_LARGE
  .prev
    margin-left px_to_rem(-16)

  .next
    margin-right px_to_rem(-16)

</style>
