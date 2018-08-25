<template lang="pug">
  header.header
    div.header__content
      h1.header__heading {{ heading }}
</template>

<script>
export default {
  // TODO: get/set heading from App/store based on view
  computed: {
    heading () {
      return 'Slideshows';
    }
  }
}
</script>

<style lang="stylus">
@import '../../../stylus/_config/'

.header
  background rgba(DARK_GREY, .9)
  // border-bottom 1px solid rgba(WHITE, .3)
  position fixed
  width 100vw
  z-index 1

.header__content
  align-items center
  display flex
  height HEADER_HEIGHT
  // max-width CONTENT_MAX_WIDTH
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

</style>
