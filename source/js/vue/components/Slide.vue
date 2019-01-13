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
  padding '%s %s %s' % (Layout.HeaderHeights.BASE 0 Layout.ControlsHeights.BASE)
  width 100vw

  @media Breakpoints.MEDIUM
    align-self center
    grid-row 2
    padding 0

  @media Breakpoints.LARGE
    display grid
    grid-column-gap COLUMN_GAP
    grid-row 1 / span 3
    grid-template-columns '%s %s %s %s' % (0 SIDEBAR_WIDTH 1fr 0)
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
  font-size '%s' % FontSizes.Base.CAPTION
  margin 0 auto
  padding '%s %s %s' % (px_to_rem(16) px_to_rem(16) Layout.ControlsHeights.BASE)

  @media Breakpoints.MEDIUM
    font-size '%s' % FontSizes.Medium.CAPTION
    grid-row 3
    max-width '%s' % Layout.MaxWidths.CAPTION
    padding '%s %s %s' % (px_to_rem(32) 0 Layout.ControlsHeights.MEDIUM)

  @media Breakpoints.LARGE
    align-self center
    grid-column 2
    grid-row 1
    margin 0
    max-height 'calc(100% - %s)' % (Layout.HeaderHeights.MEDIUM + Layout.ControlsHeights.MEDIUM)
    overflow auto
    padding 0

</style>
