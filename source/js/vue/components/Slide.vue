<template lang="pug">
  div.slide(
    v-if="content"
  )
    div.slide__media
      media-images(
        v-if="content.media.images",
        :images="content.media.images",
      )
      media-text(
        v-if="content.media.text",
        :text="content.media.text",
      )
      media-publication(
        v-if="content.media.publication",
        :publication="content.media.publication",
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
}
</script>

<style lang="stylus">
@import '../../../stylus/_config/'

.slide
  grid-row 1

  @media BREAKPOINT_MEDIUM
    display grid
    grid-template-columns 1fr
    grid-template-rows 1fr auto 2fr
    height 100vh

  @media BREAKPOINT_LARGE
    grid-column-gap px_to_rem(24)
    grid-row 2
    grid-template-columns 0 px_to_rem(256) 1fr 0
    grid-template-rows 1fr

.slide__media
  @media BREAKPOINT_MEDIUM
    grid-row 2

  @media BREAKPOINT_LARGE
    align-self center
    grid-column 3
    grid-row 1

.slide__caption
  font-size CAPTION_BASE
  margin 0 auto
  padding px_to_rem(16) px_to_rem(16) PREV_NEXT_SIZE

  @media BREAKPOINT_MEDIUM
    font-size CAPTION_MEDIUM
    grid-row 3
    max-width CAPTION_MAX_WIDTH
    padding px_to_rem(32) 0 0

  @media BREAKPOINT_LARGE
    align-self center
    grid-column 2
    grid-row 1
    padding 0

</style>
