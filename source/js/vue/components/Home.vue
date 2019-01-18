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
  padding '%s 0 0' % Layout.HeaderHeights.BASE
  width 100%

  @media Breakpoint.MEDIUM
    grid-row 2
    padding 0

  @media Breakpoint.LARGE
    margin 0 auto
    max-width CONTENT_MAX_WIDTH

.slideshows__frame
  margin '0 %s %s' % (Layout.SlideshowGaps.BASE Layout.SlideshowGaps.BASE)

  @media Breakpoint.MEDIUM
    margin '0 %s %s' % (Layout.SlideshowGaps.MEDIUM Layout.SlideshowGaps.MEDIUM)

.slideshows__group
  display flex
  flex-wrap wrap
  margin '-%s 0 0 -%s' % (Layout.SlideshowGaps.BASE Layout.SlideshowGaps.BASE)

  @media Breakpoint.MEDIUM
    margin '-%s 0 0 -%s' % (Layout.SlideshowGaps.MEDIUM Layout.SlideshowGaps.MEDIUM)

.slideshow
  padding '%s 0 0 %s' % (Layout.SlideshowGaps.BASE Layout.SlideshowGaps.BASE)
  flex 0 0 100%

  @media Breakpoint.MEDIUM
    padding '%s 0 0 %s' % (Layout.SlideshowGaps.MEDIUM Layout.SlideshowGaps.MEDIUM)
    flex 0 0 50%

  @media Breakpoint.LARGE
    flex 0 0 33.33%

.slideshow__link
  display block
  transition 'color %s' % Transition.DEFAULT

.slideshow__heading
  font-size '%s' % FontSize.Base.H3
  heading_font()
  margin px_to_em(12) 0
  padding 0

  @media Breakpoint.MEDIUM
    font-size '%s' % FontSize.Medium.H3

</style>