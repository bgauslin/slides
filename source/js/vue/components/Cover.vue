<template lang="pug">
  div.cover(
    data-full-height="",
    :style="coverImage(content.image)",
  )
    div.cover__frame
      header.cover__header
        h2.cover__heading {{ content.title }}
        p.cover__summary {{ content.summary }}
        router-link(
          class="cover__link",
          :to="{ name: 'slide', params: { slideshow: content.slug, slug: slideFirst.slug } }",
        ) Start slideshow
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
.cover__frame
  align-items center
  display flex
  justify-content center
  width 100%

.cover__frame
  height 100%

.cover__header
  padding 1rem
  text-align center

.cover__heading
  font-size H1_SIZE
  heading_font()
  margin 0 0 .25em
  padding 0

  @media BREAKPOINT_MEDIUM
    font-size H1_SIZE_MEDIUM

.cover__summary
  font-size H3_SIZE
  margin 0
  padding 0

  @media BREAKPOINT_MEDIUM
    font-size H3_SIZE_MEDIUM

START_BUTTON_HEIGHT = px_to_rem(40)

.cover__link
  align-items center
  border-radius (START_BUTTON_HEIGHT / 2)
  display inline-flex
  heading_font()
  height START_BUTTON_HEIGHT
  margin px_to_rem(16) 0 0
  padding 0 px_to_rem(16) 0 px_to_rem(24)
  transition color DEFAULT_TRANSITION

.cover__link::after
  content ICON_ANGLE_RIGHT
  font-size px_to_rem(24)
  icon()
  margin-left px_to_rem(4)

</style>