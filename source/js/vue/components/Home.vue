<template lang="pug">
  div.slideshows
    div.slideshow(
      v-for="slideshow in content",
    )
      router-link(
        class="slideshow__link",
        :to="{ name: 'start', params: { slideshow: slideshow.slug } }",
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

.slideshow__link
  display block
  link(WHITE, WHITE, rgba(WHITE, .75), rgba(WHITE, .75))
  padding 1rem

.slideshow__heading
  color inherit
  font-size H3_BASE // TODO: update
  heading_font()
  margin 0 0 .25em
  padding 0

.slideshow__summary
  color inherit
  font-size CAPTION_BASE
  margin 0
  padding 0

  @media BREAKPOINT_MEDIUM
    font-size CAPTION_MEDIUM

</style>