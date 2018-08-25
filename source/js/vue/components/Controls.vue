<template lang="pug">
  div.controls
    div.prev
      router-link(
        v-if="isFirstSlide",
        class="prev-next__link",
        title="Cover",
        :to="{ name: 'cover', params: { slideshow: slideshowRoute } }",
      )
      router-link(
        v-if="slidePrev && !isThumbsView",
        class="prev-next__link",
        :to="{ name: 'slide', params: { slideshow: slideshowRoute, slug: slidePrev.slug } }",
        :title="slidePrev.title",
      )
      router-link(
        v-if="slideLast && isThumbsView",
        class="prev-next__link",
        :to="{ name: 'slide', params: { slideshow: slideshowRoute, slug: slideLast.slug } }",
        :title="slideLast.title",
      )
        span.prev-next__label Prev
    div.count(
      v-if="!isThumbsView",
    ) {{ currentSlideCount }} of {{ totalSlideCount }}
    div.next
      router-link(
        v-if="slideNext && !isThumbsView",
        class="prev-next__link",
        :to="{ name: 'slide', params: { slideshow: slideshowRoute, slug: slideNext.slug } }",
        :title="slideNext.title",
      )
      router-link(
        v-if="isLastSlide && !isThumbsView",
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

    isThumbsView () {
      return (this.$route.name === 'thumbs');
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
  align-items center
  background rgba(DARK_GREY, .9)
  border-top 1px solid rgba(WHITE, .3)
  bottom 0
  display flex
  height CONTROLS_HEIGHT
  justify-content space-between
  position fixed
  width 100vw
  z-index 1

  @media BREAKPOINT_MEDIUM
    height CONTROLS_HEIGHT_MEDIUM

.count
  font-size HEADING_SIZE
  heading_font()

.prev-next__link
  align-items center
  display inline-flex
  height CONTROLS_HEIGHT
  justify-content center
  link(WHITE, WHITE, WHITE, WHITE)
  overflow hidden
  transition transform TRANSITION_SPEED
  width CONTROLS_HEIGHT

  @media BREAKPOINT_MEDIUM
    height CONTROLS_HEIGHT_MEDIUM
    width CONTROLS_HEIGHT_MEDIUM

  &:active
    transform scale(1.1)

.prev-next__link::before
.prev-next__link::after
  font-size PREV_NEXT_ICON_SIZE
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

.no-touch .prev-next__link
  link_hover(WHITE)

  &:hover
    transform scale(1.1)

</style>
