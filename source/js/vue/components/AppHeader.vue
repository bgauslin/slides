<template lang="pug">
  header.header
    div.header__content
      h1.header__heading {{ heading }}
</template>

<script>
export default {
  props: ['heading'],
}
</script>

<style lang="stylus">
@import '../../../stylus/_config/'

.header
  background rgba(BLACK, .9)
  border-bottom 1px solid rgba(WHITE, .3)
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
  // color rgba(WHITE, .8)
  flex 1
  font-size HEADING_SIZE
  font-weight normal
  heading_font()
  margin 0 HEADER_BUTTON_SIZE 0 px_to_rem(16)
  overflow hidden
  text-overflow ellipsis
  white-space nowrap

  @media BREAKPOINT_MEDIUM
    font-size HEADING_SIZE_MEDIUM

</style>
