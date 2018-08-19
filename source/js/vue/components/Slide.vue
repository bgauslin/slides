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
  grid-template-columns 1fr
  grid-template-rows 1fr
  height 100% // TODO: do we need this value here?

.slide__caption
  background rgba(DARK_GREY, .7)
  bottom 0
  font-size CAPTION_BASE
  position absolute
  left 0
  margin 0 auto
  padding 0 1rem
  right 0
  z-index 1

  @media BREAKPOINT_MEDIUM
    font-size CAPTION_MEDIUM

</style>
