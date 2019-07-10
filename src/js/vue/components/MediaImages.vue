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
      )
</template>

<script>
import SingleImage from './SingleImage.vue';

export default {
  components: { SingleImage },

  props: {
    images: Array,
  },
  
  methods: {
    /** @return {string} CSS classes for multiple images. */
    className(name) {
      return (this.images.length > 1) ? `${name} ${name}--multiple` : name;
    },
  }
}
</script>
