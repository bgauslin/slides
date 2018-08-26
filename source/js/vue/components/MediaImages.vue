<template lang="pug">
  div(
    v-if="images",
    :class="['images', className]",
  )
    template(
      v-for="image in images",
    )
      single-image(
        :className="imageClassName",
        :image="image",
      )
</template>

<script>
import SingleImage from './SingleImage.vue';

export default {
  components: { SingleImage },

  props: ['images'],
  
  computed: {
    className () {
      if (this.images.length > 1) {
       return 'images--multiple';
      }
    },

    imageClassName () {
      if (this.images.length > 1) {
       return 'image--multiple';
      }
    },
  }
}
</script>

<style lang="stylus">
@import '../../../stylus/_config/'

.images
  display flex

.images--multiple
  flex-wrap wrap
  margin 0 auto
  width 50%

  @media BREAKPOINT_MEDIUM
    flex-wrap nowrap
    margin (- IMAGE_GAP_MEDIUM) 0 0 (- IMAGE_GAP_MEDIUM)
    width auto

</style>
