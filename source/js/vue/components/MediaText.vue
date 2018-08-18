<template lang="pug">
  div.text(
    v-html="text",
  )
</template>

<script>
export default {
  props: ['text'],
}
</script>

<style lang="stylus">
@import '../../../stylus/_config/'

.text
  font-size H1_BASE
  heading_font()
  margin 0
  text-align center

  @media BREAKPOINT_MEDIUM
    font-size H1_MEDIUM

</style>
