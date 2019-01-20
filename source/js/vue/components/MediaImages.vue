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
    /** @return {string} CSS class for multiple images. */
    imagesClass() {
      if (this.images.length > 1) {
       return 'images--multiple';
      }
    },

    /** @return {string} CSS class for a single image. */
    imageClass() {
      if (this.images.length > 1) {
       return 'image--multiple';
      }
    },
  }
}
</script>
