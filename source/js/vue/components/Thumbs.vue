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
  padding '%s 0 0' % Layout.HeaderHeights.BASE
  position relative
  width 100%
  z-index 2

  @media Breakpoints.MEDIUM
    grid-row 2
    margin 0 auto
    max-width '%s' % (CONTENT_MAX_WIDTH + (Layout.ThumbGaps.MEDIUM * 2) - (COLUMN_GAP * 2))
    padding 0

.thumbs__frame
  margin '0 %s' % Layout.ThumbGaps.BASE
  padding '0 0 %s' % Layout.ThumbGaps.BASE

  @media Breakpoints.SMALL
    margin '0 %s' % Layout.ThumbGaps.SMALL
    padding '0 0 %s' % Layout.ThumbGaps.SMALL

  @media Breakpoints.MEDIUM
    margin '0 %s' % Layout.ThumbGaps.MEDIUM
    padding '0 0 %s' % Layout.ThumbGaps.MEDIUM

.thumbs__group
  display grid
  grid-gap '%s' % Layout.ThumbGaps.BASE
  grid-template-columns repeat(4, 1fr)
  
  @media Breakpoints.SMALL
    grid-gap '%s' % Layout.ThumbGaps.SMALL
    grid-template-columns repeat(5, 1fr)

  @media Breakpoints.MEDIUM
    grid-gap '%s' % Layout.ThumbGaps.MEDIUM
    grid-template-columns repeat(6, 1fr)

  @media Breakpoints.LARGE
    grid-template-columns repeat(7, 1fr)

</style>
