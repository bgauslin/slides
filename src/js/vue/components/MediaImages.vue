<template lang="pug">
  div(
    v-if="images",
    :class="className",
  )
    template(
      v-for="image in images",
    )
      single-image(
        :type="type",
        :image="image",
        :srcset="srcset",
      )
</template>

<script>
import { ImageWidth } from '../../queries/imageSizing';
import SingleImage from './SingleImage.vue';

export default {
  components: { SingleImage },

  props: {
    images: Array,
  },

  data() {
    return {
      srcset: {
        small: ImageWidth.SMALL,
        medium: ImageWidth.MEDIUM,
        large: ImageWidth.LARGE,
      },
    }
  },

  computed: {
    /** @return {string} */
    className() {
      return `images images--${this.type}`;
    },

    /** @return {string} */
    type() {
      return (this.images.length > 1) ? 'multiple' : 'single';
    }
  }
}
</script>
