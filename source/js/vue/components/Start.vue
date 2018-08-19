<template lang="pug">
  div.cover(
    :style="coverImage(content.image)",
  )
    router-link(
      class="cover__link",
      :to="{ name: 'slide', params: { slug: content.slug, count: 1 } }",
    )
      header.cover__header
        h2.cover__heading {{ content.title }}
        p.cover__summary {{ content.summary }}
</template>

<script>
export default {
  props: ['content'],

  methods: {
    coverImage (image) {
      return `background: url(${image.large.src}) center center / cover no-repeat;`;
    }
  }
}
</script>

<style lang="stylus">
@import '../../../stylus/_config/'

.cover
  height 100vh
  width 100vw

.cover__link
  align-items center
  background-color rgba(DARK_GREY, .85)
  display flex
  height 100%
  justify-content center
  link(WHITE, WHITE, rgba(WHITE, .75), rgba(WHITE, .75))
  width 100%

.cover__header
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