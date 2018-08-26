<template lang="pug">
  header.header
    div.header__content
      h1.header__heading {{ heading }}
</template>

<script>
export default {
  computed: {
    // TODO: Refactor to avoid console error on initial load with other routes.
    heading () {
      if (this.$route.name == 'home' || this.$route.name == 'cover') {
        return 'Slideshows';
      } else {
        return 'Shotgun Renovation'; // NOTE: Hard-coded until this gets refactored.
        // return this.$store.getters.slideshow.title;
      }
    }
  }
}
</script>

<style lang="stylus">
@import '../../../stylus/_config/'

.header
  background rgba(DARK_GREY, .9)
  position fixed
  width 100vw
  z-index 1

  @media BREAKPOINT_LARGE
    background 0
    margin-left COLUMN_GAP_LARGE
    width SIDEBAR_WIDTH

.header__content
  align-items center
  display flex
  height HEADER_HEIGHT
  position relative

.header__heading
  color WHITE
  flex 1
  font-size HEADING_SIZE
  font-weight normal
  heading_font()
  margin 0 HEADER_BUTTON_SIZE
  overflow hidden
  text-align center
  text-overflow ellipsis
  white-space nowrap

  @media BREAKPOINT_MEDIUM
    font-size HEADING_SIZE_MEDIUM
  
  @media BREAKPOINT_LARGE
    margin 0
    text-align left

</style>
