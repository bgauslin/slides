<template lang="pug">
  div.cover
    router-link(
      class="cover__link",
      :to="{ name: 'slide', params: { slug: content.slug, count: 1 } }",
    )
      h2.cover__heading {{ content.title }}
      p.cover__summary {{ content.summary }}
</template>

<script>
export default {
  props: ['content'],
}
</script>

<style lang="stylus">
@import '../../../stylus/_config/'

.cover
  align-items center
  display flex
  justify-content center
  height 100vh
  width 100vw

.cover__link
  display block
  link(WHITE, WHITE, rgba(WHITE, .75), rgba(WHITE, .75))
  padding 1rem
  text-align center

.cover__heading
  color inherit
  font-size H1_BASE
  heading_font()
  margin 0 0 .25em
  padding 0

.cover__summary
  color inherit
  font-size H2_BASE
  margin 0
  padding 0



</style>