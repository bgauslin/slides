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
    /**
     * @return {number} The current slide's index relative to the total number
     *     of slides in the slideshow.
     */
    countCurrent() {
      return this.$store.getters.slideIndex + 1;
    },

    /**
     * @return {number} The total number of slides in the slideshow.
     */
    countTotal() {
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
  font-size '%s' % FontSize.Base.CAPTION
  heading_font()
  height '%s' % Layout.ControlsHeight.BASE
  justify-content center
  overflow hidden
  padding 0 px_to_rem(16)
  transition 'transform %s' % Transition.DEFAULT
  white-space nowrap

  @media Breakpoint.MEDIUM
    font-size '%s' % FontSize.Medium.CAPTION
    height '%s' % Layout.ControlsHeight.MEDIUM

.counter__link:active
  transform scale(.8)

</style>
