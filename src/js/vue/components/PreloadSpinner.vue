<template lang="pug">
  div.preload-spinner
</template>

<script>
import Spinner from 'spin';

export default {
  data() {
    return {
      delay: 1000,
      options: {
        color: '#000',
        length: 8,
        lines: 12,
        radius: 8,
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
