<template lang="pug">
  div.thumbs
    div.thumbs__frame
      thumb(
        v-for="(item, index) in items",
        :preview="item",
        :index="index",
      )
</template>

<script>
import Thumb from './Thumb.vue';

export default {
  components: { Thumb },
  props: ['items'],
}
</script>

<style lang="stylus">
@import '../../../stylus/_config/'

.previews
  margin 0 1rem

  @media BREAKPOINT_MEDIUM
    margin 0 MARGINS_MEDIUM 1.5rem

  @media BREAKPOINT_LARGE
    margin 0 MARGINS_LARGE 1.5rem;

  @media BREAKPOINT_XLARGE
    margin 0 auto 3rem
    max-width MAX_WIDTH

.previews__frame
  display flex
  flex-wrap wrap
  margin -1rem 0 0 -1rem

</style>
