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

</style>
