<template lang="pug">
  div.progress-bar(
    :theme="theme",
  )
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters([
      'theme',
    ]),
  },
}
</script>