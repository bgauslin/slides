<template lang="pug">
  div.images
    div.images__group(
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

.images__group
  align-items center
  display flex
  height 100%
  justify-content center

</style>
