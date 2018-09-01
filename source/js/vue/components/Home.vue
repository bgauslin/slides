<template lang="pug">
  div.slideshows
    div.slideshow(
      v-for="slideshow in content",
    )
      router-link(
        class="slideshow__link",
        :to="{ name: 'cover', params: { slideshow: slideshow.slug } }",
      )
        img(
          :src="slideshow.image.src",
        )
        h2.slideshow__heading {{ slideshow.title }}
</template>

<script>

export default {
  props: ['content'],
}
</script>

<style lang="stylus">
@import '../../../stylus/_config/'

.slideshows
  margin 0 auto
  max-width CONTENT_MAX_WIDTH
  padding HEADER_HEIGHT 0 0

  @media BREAKPOINT_MEDIUM
    align-items center
    grid-row 2
    justify-items center
    padding 0

.slideshow__link
  display block
  padding 1rem
  transition color DEFAULT_TRANSITION

.slideshow__heading
  font-size H3_SIZE
  heading_font()
  margin 0 0 .25em
  padding 0

.slideshow__summary
  font-size CAPTION_SIZE
  margin 0
  padding 0

  @media BREAKPOINT_MEDIUM
    font-size CAPTION_SIZE_MEDIUM

</style>