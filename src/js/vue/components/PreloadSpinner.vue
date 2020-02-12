<template lang="pug">
  div.preload-spinner
</template>

<script>
import { mapGetters } from 'vuex';
import Spinner from 'spin';

export default {
  data() {
    return {
      delay: 1000,
      options: {
        color: '#fff',
        length: 6,
        lines: 12,
        radius: 7,
        width: 3,
      }
    }
  },

  mounted() {
    this.attachSpinner();
  },

  methods: {
    // Attaches loading spinner after a brief delay.
    attachSpinner() {
      window.setTimeout(() => {
        const spinner = new Spinner(this.options).spin();
        this.$el.appendChild(spinner.el);
      }, this.delay);
    },
  },
}
</script>
