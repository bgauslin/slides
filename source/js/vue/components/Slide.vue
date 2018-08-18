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
    p.slide__caption(
      v-html="content.caption",
    )
</template>

<script>
// TODO: API: 'caption' should be HTML/Markdown

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
  grid-template-rows 1fr auto
  height 100%

.slide__media
  align-self center
  grid-column 1
  grid-row 1
  justify-content center

.slide__caption
  background rgba(DARK_GREY, .75)
  font-size FINEPRINT_BASE
  grid-column 1
  grid-row 2
  line-height 1.5
  margin auto
  padding 1rem

</style>
