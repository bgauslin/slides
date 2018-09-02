<template lang="pug">
  div.slideshows
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
@import '../../../stylus/_config/'

// TODO: update slideshows html/css layout similar to thumbs
.slideshows
  max-width CONTENT_MAX_WIDTH
  padding HEADER_HEIGHT px_to_rem(16) 0

  @media BREAKPOINT_MEDIUM
    grid-row 2
    padding 0 COLUMN_GAP

.slideshow
  margin 0 0 px_to_rem(16)

.slideshow__link
  display block
  transition color DEFAULT_TRANSITION

.slideshow__heading
  font-size H3_SIZE
  heading_font()
  margin px_to_em(12) 0
  padding 0

  @media BREAKPOINT_MEDIUM
    font-size H3_SIZE_MEDIUM

</style>