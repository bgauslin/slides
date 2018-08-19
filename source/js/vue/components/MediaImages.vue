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
  @media BREAKPOINT_MEDIUM
    display flex
    justify-content center

  // @media BREAKPOINT_LARGE
    // height 100vh

</style>
