<template lang="pug">
  div.images
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
}
</script>

<style lang="stylus">
@import '../../../stylus/_config/'

</style>
