<template lang="pug">
  div.slideshows
    div.slideshows__frame
      div.slideshows__group
        div.slideshow(
          v-for="slideshow in content",
        )
          router-link(
            class="slideshow__link",
            :to="{ name: 'cover', params: { slideshow: slideshow.slug } }",
          )
            single-image(
              v-if="slideshow.image",
              :className="imageClass",
              :image="slideshow.image",
            )
            h2.slideshow__heading {{ slideshow.title }}
</template>

<script>
import SingleImage from './SingleImage.vue';

export default {
  props: ['content'],
  components: { SingleImage },
}
</script>

<style lang="stylus">
@import '../../../stylus/config/'

.slideshows
  padding HEADER_HEIGHT 0 0
  width 100%

  @media Breakpoints.MEDIUM
    grid-row 2
    padding 0

  @media Breakpoints.LARGE
    margin 0 auto
    max-width CONTENT_MAX_WIDTH

.slideshows__frame
  margin 0 SLIDESHOW_GAP SLIDESHOW_GAP

  @media Breakpoints.MEDIUM
    margin 0 SLIDESHOW_GAP_MEDIUM SLIDESHOW_GAP_MEDIUM

.slideshows__group
  display flex
  flex-wrap wrap
  margin (- SLIDESHOW_GAP) 0 0 (- SLIDESHOW_GAP)

  @media Breakpoints.MEDIUM
    margin (- SLIDESHOW_GAP_MEDIUM) 0 0 (- SLIDESHOW_GAP_MEDIUM)

.slideshow
  padding SLIDESHOW_GAP 0 0 SLIDESHOW_GAP
  flex 0 0 100%

  @media Breakpoints.MEDIUM
    padding SLIDESHOW_GAP_MEDIUM 0 0 SLIDESHOW_GAP_MEDIUM
    flex 0 0 50%

  @media Breakpoints.LARGE
    flex 0 0 33.33%

.slideshow__link
  display block
  transition color DEFAULT_TRANSITION

.slideshow__heading
  font-size '%s' % FontSizes.Base.H3
  heading_font()
  margin px_to_em(12) 0
  padding 0

  @media Breakpoints.MEDIUM
    font-size '%s' % FontSizes.Medium.H3

</style>