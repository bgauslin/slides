<template lang="pug">
  div.prev-next
    p.prev
      router-link(
        v-if="prev",
        class="prev-next__link",
        :to="{ name: 'slide', params: { slug: slug, count: prev } }",
      )
        span.prev-next__label Prev
    p.next
      router-link(
        v-if="next",
        class="prev-next__link",
        :to="{ name: 'slide', params: { slug: slug, count: next } }",
      )
        span.prev-next__label Next
</template>

<script>
export default {
  computed: {
    count () {
      return Number(this.$route.params.count);
    },

    prev () {
      return (this.count > 1) ? this.count - 1 : null;
    },

    next() {
      // TODO: get max limit from store
      return (this.count < 32) ? this.count + 1 : null;
    },

    slug () {
      return this.$route.params.slug;
    },
  }
}
</script>

<style lang="stylus">
@import '../../../stylus/_config/'

.prev-next
  align-items center
  display flex
  justify-content space-between
  position fixed
  top 'calc(50vh - %s)' % ((PREV_NEXT_HEIGHT + (2 * PREV_NEXT_PADDING_MEDIUM)) / 2)
  width 100vw
  z-index 2

.prev
.next
  margin 0
  padding 0

.prev-next__link
  background rgba(DARK_GREY, .7)
  border-radius 100%
  display block
  height (PREV_NEXT_HEIGHT + (2 * PREV_NEXT_PADDING_BASE))
  link(WHITE, WHITE, WHITE, WHITE)
  overflow hidden
  transition transform TRANSITION_SPEED
  width (PREV_NEXT_WIDTH + (2 * PREV_NEXT_PADDING_BASE))

  @media BREAKPOINT_LARGE
    height (PREV_NEXT_HEIGHT + (2 * PREV_NEXT_PADDING_MEDIUM))
    width (PREV_NEXT_WIDTH + (2 * PREV_NEXT_PADDING_MEDIUM))

  &:active
    transform scale(1.1)

.prev-next__link::before
.prev-next__link::after
  display block
  font-size PREV_NEXT_HEIGHT
  height PREV_NEXT_HEIGHT
  icon()
  line-height PREV_NEXT_HEIGHT
  padding PREV_NEXT_PADDING_BASE
  position relative
  text-align center
  width PREV_NEXT_WIDTH

  @media BREAKPOINT_LARGE
    padding PREV_NEXT_PADDING_MEDIUM

.prev-next__label
  display none

.prev
  margin-left .75rem

.prev .prev-next__link::before
  content ICON_ANGLE_LEFT
  right .1rem

.next
  margin-right .75rem

.next .prev-next__link::after
  content ICON_ANGLE_RIGHT
  left .1rem

.no-touch .prev-next__link
  link_hover(WHITE)

  &:hover
    transform scale(1.1)

</style>
