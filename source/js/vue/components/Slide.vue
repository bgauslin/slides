<template lang="pug">
  div.slide(
    v-if="content"
  )
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
    p.slide__caption {{ content.caption }}
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

// Slide container fills the viewport.
.slide
  height 100vh
  width 100vw

.slide__caption
  background rgba(BLACK, .75)
  border-radius 4px
  bottom 1rem
  font-size FINEPRINT_BASE
  left 0
  line-height 1.5
  margin auto
  padding 1rem
  position absolute
  right 0
  z-index 1

  @media BREAKPOINT_LARGE
    max-width 50vw

</style>
