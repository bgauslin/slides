<template lang="pug">
  div.error-404
    p.error-404__message {{ errorMessage }}
</template>

<script>
export default {
  data () {
    return {
      errorMessage: '404',
      summary: 'That page cannot be found. :(',
      title: 'Uh oh!',
    }
  },
}
</script>

<style lang="stylus">
@import '../../../stylus/config/'

.error-404__message
  color '%s' % Colors.LIGHT_GREY
  font-size 750%
  line-height 1
  margin 2rem 0
  padding 0 2rem
  text-align center

  @media Breakpoints.MEDIUM
    font-size 1500%
    padding-bottom 4rem

</style>
