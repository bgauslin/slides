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
  @media BREAKPOINT_MEDIUM
    display grid
    grid-template-columns 1fr
    grid-template-rows 1fr auto 1fr
    min-height 100vh

.slide__media
  @media BREAKPOINT_MEDIUM
    // align-self end
    grid-row 2

.slide__caption
  font-size CAPTION_BASE
  margin 0 auto
  padding 0 1rem

  @media BREAKPOINT_MEDIUM
    align-self center
    grid-row 3
    font-size CAPTION_MEDIUM
    max-width 36rem // TODO: constant

  @media BREAKPOINT_LARGE
    background rgba(DARK_GREY, .7)
    bottom 0
    position absolute
    left 0
    right 0
    z-index 1

</style>
