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
  grid-row 3
  justify-content space-between
  width 100vw

  @media BREAKPOINT_LARGE
    position fixed
    top 'calc(50vh - %s)' % (PREV_NEXT_SIZE_LARGE / 2)
    z-index 2

.prev
.next
  margin 0
  padding 0

.prev-next__link
  align-items center
  display flex
  height PREV_NEXT_SIZE
  justify-content center
  link(WHITE, WHITE, WHITE, WHITE)
  overflow hidden
  transition transform TRANSITION_SPEED
  width PREV_NEXT_SIZE

  @media BREAKPOINT_LARGE
    background rgba(DARK_GREY, .7)
    border-radius 100%
    height PREV_NEXT_SIZE_LARGE
    width PREV_NEXT_SIZE_LARGE

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
