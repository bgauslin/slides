<template lang="pug">
  div.text
    div.text__content(
      v-html="text",
    )
</template>

<script>
export default {
  props: ['text'],
}
</script>

<style lang="stylus">
@import '../../../stylus/config/'

.text
  position relative
  padding 0 0 75%

.text__content
  align-items center
  display flex
  font-size '%s' % FontSize.Base.H1
  heading_font()
  height 100%
  justify-content center
  margin 0
  position absolute
  text-align center
  width 100%

  @media Breakpoint.MEDIUM
    font-size '%s' % FontSize.Medium.H1

</style>
