<template lang="pug">
  div.slide(
    v-if="content",
  )
    div(
      :class="['slide__media', className]"
    )
      media-images(
        v-if="content.media.images",
        :images="content.media.images",
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
      if (this.content.media.images && this.content.media.images.length > 1) {
       return 'slide__media--multiple';
      }
    },
  }
}
</script>

<style lang="stylus">
@import '../../../stylus/config/'

.slide
  height 100%
  margin 0 auto
  max-width CONTENT_MAX_WIDTH
  padding HEADER_HEIGHT 0 CONTROLS_HEIGHT
  width 100vw

  @media Breakpoints.MEDIUM
    align-self center
    grid-row 2
    padding 0

  @media Breakpoints.LARGE
    display grid
    grid-column-gap COLUMN_GAP
    grid-row 1 / span 3
    grid-template-columns '0 %s 1fr 0' % SIDEBAR_WIDTH
    grid-template-rows 1fr
    width 100%

.slide__media
  @media Breakpoints.MEDIUM
    grid-row 2

  @media Breakpoints.LARGE
    align-self center
    grid-column 3
    grid-row 1
    max-height 100%
    overflow hidden

.slide__media--multiple
  @media Breakpoints.MEDIUM
    margin 0 px_to_rem(24)

  @media Breakpoints.LARGE
    margin 0

.slide__caption
  box-sizing border-box
  font-size CAPTION_SIZE
  margin 0 auto
  padding px_to_rem(16) px_to_rem(16) CONTROLS_HEIGHT

  @media Breakpoints.MEDIUM
    font-size CAPTION_SIZE_MEDIUM
    grid-row 3
    max-width CAPTION_MAX_WIDTH
    padding px_to_rem(32) 0 CONTROLS_HEIGHT_MEDIUM

  @media Breakpoints.LARGE
    align-self center
    grid-column 2
    grid-row 1
    margin 0
    max-height 'calc(100% - %s)' % (HEADER_HEIGHT_MEDIUM + CONTROLS_HEIGHT_MEDIUM)
    overflow auto
    padding 0

</style>
