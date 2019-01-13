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
  padding '%s %s %s' % (Layout.HeaderHeights.BASE 0 0)
  width 100%

  @media Breakpoints.MEDIUM
    grid-row 2
    padding 0

  @media Breakpoints.LARGE
    margin 0 auto
    max-width CONTENT_MAX_WIDTH

.slideshows__frame
  margin '%s %s %s' % (0 Layout.SlideshowGaps.BASE Layout.SlideshowGaps.BASE)

  @media Breakpoints.MEDIUM
    margin '%s %s %s' % (0 Layout.SlideshowGaps.MEDIUM Layout.SlideshowGaps.MEDIUM)

.slideshows__group
  display flex
  flex-wrap wrap
  margin '-%s %s %s -%s' % (Layout.SlideshowGaps.BASE 0 0 Layout.SlideshowGaps.BASE)

  @media Breakpoints.MEDIUM
    margin '-%s %s %s -%s' % (Layout.SlideshowGaps.MEDIUM 0 0 Layout.SlideshowGaps.MEDIUM)

.slideshow
  padding '%s %s %s %s' % (Layout.SlideshowGaps.BASE 0 0 Layout.SlideshowGaps.BASE)
  flex 0 0 100%

  @media Breakpoints.MEDIUM
    padding '%s %s %s %s' % (Layout.SlideshowGaps.MEDIUM 0 0 Layout.SlideshowGaps.MEDIUM)
    flex 0 0 50%

  @media Breakpoints.LARGE
    flex 0 0 33.33%

.slideshow__link
  display block
  transition color '%s' % Transitions.DEFAULT

.slideshow__heading
  font-size '%s' % FontSizes.Base.H3
  heading_font()
  margin px_to_em(12) 0
  padding 0

  @media Breakpoints.MEDIUM
    font-size '%s' % FontSizes.Medium.H3

</style>