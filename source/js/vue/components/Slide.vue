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
  display grid
  grid-row 2
  grid-template-columns 1fr
  grid-template-rows 1fr minmax(auto, 1fr)
  width 100vw

  @media BREAKPOINT_MEDIUM
    grid-row 1 / span 2

  @media BREAKPOINT_LARGE
    grid-template-rows auto auto
    height 100% // TODO: do we need this value?

.slide__media
  align-self end
  grid-row 1

.slide__caption
  align-self center
  font-size CAPTION_BASE
  grid-row 2
  margin 0 auto
  padding 0 1rem

  @media BREAKPOINT_MEDIUM
    font-size CAPTION_MEDIUM

  @media BREAKPOINT_LARGE
    background rgba(DARK_GREY, .7)
    bottom 0
    position absolute
    left 0
    right 0
    z-index 1

</style>
