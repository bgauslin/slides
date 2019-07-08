<template lang="pug">  
  router-link(
    class="counter__link",
    title="View thumbnails",
    :to="{ name: 'thumbs' }",
  ) {{ countCurrent }} of {{ countTotal }}
</template>

<script>
export default {
  computed: {
    /**
     * @return {number} The current slide's index relative to the total number
     *     of slides in the slideshow.
     */
    countCurrent() {
      return this.$store.getters.slideIndex + 1;
    },

    /**
     * @return {number} The total number of slides in the slideshow.
     */
    countTotal() {
      return this.$store.getters.totalSlideCount;
    },
  }
}
</script>
