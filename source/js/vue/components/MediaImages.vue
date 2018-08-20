<template lang="pug">
  div(
    v-if="images",
    :class="['images', className]",
  )
    template(
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
  
  computed: {
    className () {
      return (this.images.length > 1) ? 'images--multiple' : 'images--single';
    },
  }
}
</script>

<style lang="stylus">
@import '../../../stylus/_config/'

.images
  @media BREAKPOINT_MEDIUM
    display flex
    justify-content center


</style>
