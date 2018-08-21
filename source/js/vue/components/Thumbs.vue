<template lang="pug">
  div.thumbs
    div.thumbs__group
      thumb(
        v-for="(thumb, index) in content.thumbs",
        :index="index",
        :slideshow="content.slug",
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
@import '../../../stylus/_config/'

.thumbs
  margin THUMB_GAP

  @media BREAKPOINT_SMALL
    margin THUMB_GAP_SMALL

  @media BREAKPOINT_MEDIUM
    margin THUMB_GAP_MEDIUM

  @media BREAKPOINT_LARGE
    margin THUMB_GAP_LARGE

  @media BREAKPOINT_XLARGE
    margin THUMB_GAP_LARGE auto
    max-width MAX_WIDTH

.thumbs__group
  display flex
  flex-wrap wrap
  margin (- THUMB_GAP) 0 0 (- THUMB_GAP)

  @media BREAKPOINT_SMALL
    margin (- THUMB_GAP_SMALL) 0 0 (- THUMB_GAP_SMALL)

  @media BREAKPOINT_MEDIUM
    margin (- THUMB_GAP_MEDIUM) 0 0 (- THUMB_GAP_MEDIUM)

  @media BREAKPOINT_LARGE
    margin (- THUMB_GAP_LARGE) 0 0 (- THUMB_GAP_LARGE)

</style>
