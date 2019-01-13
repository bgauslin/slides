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
@import '../../../stylus/config/'

.images--multiple
  margin (- IMAGE_GAP) auto 0
  width 50%

  @media Breakpoints.MEDIUM
    display flex
    margin (- IMAGE_GAP_MEDIUM) 0 0 (- IMAGE_GAP_MEDIUM)
    width auto

</style>
