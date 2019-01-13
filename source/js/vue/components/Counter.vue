<template lang="pug">  
  router-link(
    class="counter__link",
    title="View thumbnails",
    :to="{ name: 'thumbs' }",
  ) {{ countCurrent }} of {{ countTotal }}
</template>

<script>
export default {
  computed: {
    countCurrent () {
      return this.$store.getters.slideIndex + 1;
    },

    countTotal () {
      return this.$store.getters.totalSlideCount;
    },
  }
}
</script>

<style lang="stylus">
@import '../../../stylus/config/'

.counter__link
  align-items center
  display inline-flex
  font-size '%s' % FontSizes.Base.CAPTION
  heading_font()
  height '%s' % Layout.ControlsHeights.BASE
  justify-content center
  overflow hidden
  padding 0 px_to_rem(16)
  transition 'transform %s' % Transitions.DEFAULT
  white-space nowrap

  @media Breakpoints.MEDIUM
    font-size '%s' % FontSizes.Medium.CAPTION
    height '%s' % Layout.ControlsHeights.MEDIUM

.counter__link:active
  transform scale(.8)

</style>
