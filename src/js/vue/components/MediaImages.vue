<template lang="pug">
  div(
    v-if="images",
    :class="className('images')",
  )
    template(
      v-for="image in images",
    )
      single-image(
        :className="className('image')",
        :image="image",
        :srcset="srcset",
        :sizes="sizes",
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
      sizes: '100vw',
    }
  },

  methods: {
    /**
     * @param {!string} name - Base classname for the element.
     * @return {string} CSS classes for multiple images.
     */
    className(name) {
      return (this.images.length > 1) ? `${name} ${name}--multiple` : name;
    },
  }
}
</script>
