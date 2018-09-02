<template lang="pug">
  div.controls
    div.controls__frame
      div.controls__content
        router-link(
          v-if="isFirstSlide",
          class="prev-next__link prev-next--prev",
          title="Cover",
          :to="{ name: 'cover', params: { slideshow: slideshowRoute } }",
        )
        router-link(
          v-if="slidePrev",
          class="prev-next__link prev-next--prev",
          :to="{ name: 'slide', params: { slideshow: slideshowRoute, slug: slidePrev.slug } }",
          :title="slidePrev.title",
        )
        router-link(
          class="count__link",
          :to="{ name: 'thumbs' }",
          title="View thumbnails",
        ) {{ currentSlideCount }} of {{ totalSlideCount }}
        router-link(
          v-if="slideNext",
          class="prev-next__link prev-next--next",
          :to="{ name: 'slide', params: { slideshow: slideshowRoute, slug: slideNext.slug } }",
          :title="slideNext.title",
        )
        router-link(
          v-if="isLastSlide",
          class="prev-next__link prev-next--next",
          title="Thumbnails",
          :to="{ name: 'thumbs', params: { slideshow: slideshowRoute, slug: 'thumbs' } }",
        )
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
    margin 0 0 0 COLUMN_GAP
    width SIDEBAR_WIDTH

.count__link
.prev-next__link
  align-items center
  display inline-flex
  height CONTROLS_HEIGHT
  justify-content center
  overflow hidden

  @media BREAKPOINT_MEDIUM
    height CONTROLS_HEIGHT_MEDIUM

.count__link
  font-size CAPTION_SIZE
  heading_font()
  padding 0 px_to_rem(16)
  transition transform DEFAULT_TRANSITION
  white-space nowrap

  @media BREAKPOINT_MEDIUM
    font-size CAPTION_SIZE_MEDIUM

.count__link:active
  transform scale(.9)

.prev-next__link
  flex 1

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
