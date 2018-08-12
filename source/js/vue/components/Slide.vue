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
    div.slide__caption {{ content.caption }}
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

.slide__media
  align-items center
  display flex
  justify-content center
  overflow hidden // TODO: Use this only while testing
  height 80vh

.slide__caption
  margin auto
  padding MARGINS_BASE

  @media BREAKPOINT_LARGE
    max-width 50vw

</style>
