<template lang="pug">
  div.slide(
    v-if="content",
  )
    div(
      :class="['slide__media', className]"
    )
      router-link(
        v-if="images && nextSlide",
        class="slide__media__link",
        :title="nextSlideLabel",
        :to="nextSlideRoute",
      )
        media-images(
          :images="images",
        )
      media-publication(
        v-if="content.media.publication",
        :publication="content.media.publication",
      )
      media-text(
        v-if="content.media.text",
        :text="content.media.text",
      )
    div.slide__caption(
      v-html="content.caption",
    )
</template>

<script>
import MediaImages from './MediaImages.vue';
import MediaText from './MediaText.vue';
import MediaPublication from './MediaPublication.vue';

export default {
  components: {
    MediaImages,
    MediaText,
    MediaPublication,
  },

  props: ['content'],

  computed: {
    className () {
      if (this.images && this.images.length > 1) {
       return 'slide__media--multiple';
      }
    },

    images () {
      return this.content.media.images;
    },

    nextSlide () {
      return this.$store.getters.slideNext;
    },

    nextSlideRoute () { 
      return {
        name: 'slide',
        params: {
          slideshow: this.$route.params.slideshow,
          slug: this.nextSlide.slug
        }
      };
    },

    nextSlideLabel () {
      return this.nextSlide.title;
    },
  }
}
</script>

<style lang="stylus">
@import '../../../stylus/_config/'

.slide
  height 100%
  margin 0 auto
  max-width CONTENT_MAX_WIDTH
  padding HEADER_HEIGHT 0 CONTROLS_HEIGHT
  width 100vw

  @media BREAKPOINT_MEDIUM
    align-self center
    grid-row 2
    padding 0

  @media BREAKPOINT_LARGE
    display grid
    grid-column-gap COLUMN_GAP
    grid-row 1 / span 3
    grid-template-columns '0 %s 1fr 0' % SIDEBAR_WIDTH
    grid-template-rows 1fr
    width 100%

.slide__media
  @media BREAKPOINT_MEDIUM
    grid-row 2

  @media BREAKPOINT_LARGE
    align-self center
    grid-column 3
    grid-row 1
    max-height 100%
    overflow hidden

.slide__media--multiple
  @media BREAKPOINT_MEDIUM
    margin 0 px_to_rem(24)

  @media BREAKPOINT_LARGE
    margin 0

.slide__media__link
  display block

.slide__media__link:hover
  cursor default

.slide__caption
  font-size CAPTION_SIZE
  margin 0 auto
  padding px_to_rem(16) px_to_rem(16) CONTROLS_HEIGHT

  @media BREAKPOINT_MEDIUM
    font-size CAPTION_SIZE_MEDIUM
    grid-row 3
    max-width CAPTION_MAX_WIDTH
    padding px_to_rem(32) 0 0

  // TODO: wrap the caption in a container for vertical overflow...
  @media BREAKPOINT_LARGE
    align-self center
    grid-column 2
    grid-row 1
    margin HEADER_HEIGHT_MEDIUM 0 CONTROLS_HEIGHT_MEDIUM  
    // height 100%
    // overflow auto
    padding 0

</style>
