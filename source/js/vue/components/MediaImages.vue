<template lang="pug">
  div.images
    template(
      v-if="images",
      v-for="image in images",
    )
      single-image(
        :image="image",
      )
</template>

<script>

import SingleImage from './SingleImage.vue';

export default {
  components: { SingleImage },
  props: ['images'],
}
</script>

<style lang="stylus">
@import '../../../stylus/_config/'

.images
  display flex
  justify-content center

  // NOTE: 'height' (with inverted responsive image sizing) keeps portrait images in the viewport
  @media BREAKPOINT_LARGE
    height 100vh

</style>
