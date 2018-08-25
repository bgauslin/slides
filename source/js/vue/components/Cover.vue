<template lang="pug">
  div.cover(
    :style="coverImage(content.image)",
  )
    router-link(
      class="cover__link",
      :to="{ name: 'slide', params: { slideshow: content.slug, slug: slideFirst.slug } }",
    )
      header.cover__header
        h2.cover__heading {{ content.title }}
        p.cover__summary {{ content.summary }}
        P.cover__start Start slideshow
</template>

<script>
export default {
  props: ['content'],

  computed: {
    slideFirst () {
      return this.$store.getters.slideFirst;
    }
  },

  methods: {
    coverImage (image) {
      return `background: url(${image.large.src}) center center / cover no-repeat;`;
    },
  }
}
</script>

<style lang="stylus">
@import '../../../stylus/_config/'

.cover
  height 100vh // TODO: add js to make this work with iOS/Safari

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

  @media BREAKPOINT_MEDIUM
    font-size H1_MEDIUM

.cover__summary
  color inherit
  font-size CAPTION_BASE
  margin 0
  padding 0

  @media BREAKPOINT_MEDIUM
    font-size CAPTION_MEDIUM

START_BUTTON_HEIGHT = px_to_rem(40)

.cover__start
  align-items center
  border 2px solid WHITE
  border-radius (START_BUTTON_HEIGHT / 2)
  display inline-flex
  heading_font()
  height START_BUTTON_HEIGHT
  margin px_to_rem(32) 0 0
  padding 0 px_to_rem(16) 0 px_to_rem(24)

.cover__start::after
  content ICON_ANGLE_RIGHT
  font-size px_to_rem(24)
  icon()
  margin-left px_to_rem(4)

</style>