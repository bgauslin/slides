<template lang="pug">
  div.thumbs
    div.thumbs__group
      thumb(
        v-for="(thumb, index) in content.thumbs",
        :index="index",
        :slug="content.slug",
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
  margin 0 1rem

  @media BREAKPOINT_MEDIUM
    margin 0 MARGINS_MEDIUM 1.5rem

  @media BREAKPOINT_LARGE
    margin 0 MARGINS_LARGE 1.5rem;

  @media BREAKPOINT_XLARGE
    margin 0 auto 3rem
    max-width MAX_WIDTH

.thumbs__group
  display flex
  flex-wrap wrap
  margin -1rem 0 0 -1rem

</style>
