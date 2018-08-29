<template lang="pug">
  div.slideshows
    div.slideshow(
      v-for="slideshow in content",
    )
      router-link(
        class="slideshow__link",
        :to="{ name: 'cover', params: { slideshow: slideshow.slug } }",
      )
        h2.slideshow__heading {{ slideshow.title }}
        p.slideshow__summary {{ slideshow.summary }}
</template>

<script>
export default {
  props: ['content'],
}
</script>

<style lang="stylus">
@import '../../../stylus/_config/'

.slideshows
  height 100%
  padding HEADER_HEIGHT 0 0
  width 100%

  @media BREAKPOINT_MEDIUM
    grid-row 2
    padding 0

.slideshow__link
  display block
  padding 1rem
  transition color TRANSITION_SPEED

.slideshow__heading
  // color inherit
  font-size H3_SIZE
  heading_font()
  margin 0 0 .25em
  padding 0

.slideshow__summary
  // color inherit
  font-size CAPTION_SIZE
  margin 0
  padding 0

  @media BREAKPOINT_MEDIUM
    font-size CAPTION_SIZE_MEDIUM

</style>