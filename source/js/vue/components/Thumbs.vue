<template lang="pug">
  div.thumbs
    div.thumbs__frame
      div.thumbs__group
        thumb(
          v-for="(thumb, index) in content.thumbs",
          :index="index",
          :slideshow="content.slug",
          :slug="thumb.slug",
          :thumb="thumb.thumb",
        )
</template>

<script>
import Thumb from './Thumb.vue';

export default {
  components: { Thumb },
  props: ['content'],
}
</script>

<style lang="stylus">
@import '../../../stylus/config/'

.thumbs
  padding '%s %s %s' % (Layout.HeaderHeights.BASE 0 0)
  width 100%

  @media Breakpoints.MEDIUM
    grid-row 2
    margin 0 auto
    max-width '%s' % (CONTENT_MAX_WIDTH + (Layout.ThumbGaps.MEDIUM * 2) - (COLUMN_GAP * 2))
    padding 0

.thumbs__frame
  margin '%s %s' % (0 Layout.ThumbGaps.BASE)
  padding '%s %s %s' % (0 0 Layout.ThumbGaps.BASE)

  @media Breakpoints.SMALL
    margin '%s %s' % (0 Layout.ThumbGaps.BASE)
    padding '%s %s %s' % (0 0 Layout.ThumbGaps.BASE)

  @media Breakpoints.MEDIUM
    margin '%s %s' % (0 Layout.ThumbGaps.MEDIUM)
    padding '%s %s %s' % (0 0 Layout.ThumbGaps.MEDIUM)

.thumbs__group
  display flex
  flex-wrap wrap
  margin '-%s %s %s -%s' % (Layout.ThumbGaps.BASE 0 0 Layout.ThumbGaps.BASE)

  @media Breakpoints.SMALL
    margin '-%s %s %s -%s' % (Layout.ThumbGaps.SMALL 0 0 Layout.ThumbGaps.SMALL)

  @media Breakpoints.MEDIUM
    margin '-%s %s %s -%s' % (Layout.ThumbGaps.MEDIUM 0 0 Layout.ThumbGaps.MEDIUM)

</style>
