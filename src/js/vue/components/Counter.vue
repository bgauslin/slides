<template lang="pug">  
  router-link(
    class="counter__link"
    title="View thumbnails"
    :to="{ name: 'thumbs' }"
  ) {{ slideIndex + 1 }} of {{ totalSlideCount }}
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters([
      'slideIndex',
      'totalSlideCount',
    ]),
  }
}
</script>
