<template lang="pug">
  div.text(
    v-html="text",
  )
</template>

<script>
// TODO: API: 'text' should not be HTML/Markdown

export default {
  props: ['text'],
}
</script>

<style lang="stylus">
@import '../../../stylus/_config/'

.text
  text-align center

.text p
  font-size H1_BASE
  heading_font()
  margin 0

</style>
