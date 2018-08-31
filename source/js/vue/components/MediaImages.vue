<template lang="pug">
  div(
    v-if="images",
    :class="['images', imagesClass]",
  )
    template(
      v-for="image in images",
    )
      single-image(
        :className="imageClass",
        :image="image",
      )
</template>

<script>
import SingleImage from './SingleImage.vue';

export default {
  components: { SingleImage },

  props: ['images'],
  
  computed: {
    imagesClass () {
      if (this.images.length > 1) {
       return 'images--multiple';
      }
    },

    imageClass () {
      if (this.images.length > 1) {
       return 'image--multiple';
      }
    },
  }
}
</script>

<style lang="stylus">
@import '../../../stylus/_config/'

// TODO: make image height fluid at large breakpoint
// .images
//   @media BREAKPOINT_LARGE
//     max-height 100%

.images--multiple
  margin 0 auto
  width 50%

  @media BREAKPOINT_MEDIUM
    display flex
    margin (- IMAGE_GAP_MEDIUM) 0 0 (- IMAGE_GAP_MEDIUM)
    width auto

</style>
