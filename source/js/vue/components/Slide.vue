<template lang="pug">
  div.slide(
    v-if="content",
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
  height 100%
  padding HEADER_HEIGHT 0 CONTROLS_HEIGHT
  width 100vw

  // FIXME: Vue component transitions in grid layout get weird because
  // Vue loads two instances of the slide into a single grid cell so they 
  // overlap each other when a) going back, and b) fetching a new slide via JSON.
  // Going back to a previously-stored slide doesn't have this problem.
  @media BREAKPOINT_MEDIUM
    align-self center
    grid-row 2
    height auto
    padding 0

  // @media BREAKPOINT_LARGE
    // display grid
    // grid-column-gap px_to_rem(24)
    // grid-template-columns 0 px_to_rem(256) 1fr 0
    // grid-template-rows 1fr

.slide__media
  @media BREAKPOINT_MEDIUM
    grid-row 2

  @media BREAKPOINT_LARGE
    align-self center
    grid-column 3
    grid-row 1

.slide__caption
  font-size CAPTION_SIZE
  margin 0 auto
  padding px_to_rem(16)

  @media BREAKPOINT_MEDIUM
    font-size CAPTION_SIZE_MEDIUM
    grid-row 3
    max-width CAPTION_MAX_WIDTH
    padding px_to_rem(32) 0 0

  @media BREAKPOINT_LARGE
    align-self center
    grid-column 2
    grid-row 1
    padding 0

</style>
