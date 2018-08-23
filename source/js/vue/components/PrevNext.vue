<template lang="pug">
  div.prev-next
    p.prev
      router-link(
        v-if="slidePrev",
        class="prev-next__link",
        :to="{ name: 'slide', params: { slideshow: slideshow, slug: slidePrev.slug } }",
      )
      router-link(
        v-if="isThumbsView",
        class="prev-next__link",
        :to="{ name: 'slide', params: { slideshow: slideshow, slug: slideLast.slug } }",
      )
        span.prev-next__label Prev
    p.next
      router-link(
        v-if="slideNext",
        class="prev-next__link",
        :to="{ name: 'slide', params: { slideshow: slideshow, slug: slideNext.slug } }",
      )
      router-link(
        v-if="isLastSlide",
        class="prev-next__link",
        :to="{ name: 'thumbs', params: { slideshow: slideshow } }",
      )
        span.prev-next__label Next
</template>

<script>
export default {
  computed: {
    isLastSlide () {
      return;
      // return (this.$route.params.slug === this.slideLast.slug);
    },

    isThumbsView () {
      return (this.$route.name == 'thumbs');
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

    slideshow () {
      return this.$route.params.slideshow;
    },
  }
}
</script>

<style lang="stylus">
@import '../../../stylus/_config/'

.prev-next
  align-items center
  bottom 0
  display flex
  justify-content space-between
  position fixed
  width 100vw
  z-index 2

  @media BREAKPOINT_MEDIUM
    bottom auto
    top 'calc(50vh - %s)' % (PREV_NEXT_SIZE_MEDIUM / 2)

.prev
.next
  margin 0
  padding 0

@media BREAKPOINT_MEDIUM
  .prev
    margin-left 1rem
  .next
    margin-right 1rem

.prev-next__link
  background rgba(DARK_GREY, .7)
  border-radius 100%
  align-items center
  display flex
  height PREV_NEXT_SIZE
  justify-content center
  link(WHITE, WHITE, WHITE, WHITE)
  overflow hidden
  transition transform TRANSITION_SPEED
  width PREV_NEXT_SIZE

  @media BREAKPOINT_MEDIUM
    height PREV_NEXT_SIZE_MEDIUM
    width PREV_NEXT_SIZE_MEDIUM

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
