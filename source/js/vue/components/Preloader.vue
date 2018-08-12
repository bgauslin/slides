<template lang="pug">
  div.preloader
</template>

<script>
import Spinner from 'spin'
export default {
  data () {
    return {
      spinnerOptions: {
        color: '#ffffff',
        lines: 12,
        length: 8,
        width: 3,
        radius: 8,
      }
    }
  },

  mounted () {
    this.attachSpinner();
  },

  methods: {
    attachSpinner () {
      window.setTimeout(() => {
        const spinner = new Spinner(this.spinnerOptions).spin();
        this.$el.appendChild(spinner.el);
      }, 500);
    },
  },
}
</script>

<style lang="stylus">
.preloader
  height 100vh
  left 0
  position fixed
  right 0
  top 0

.spinner
  left 50%
  top 50%

</style>
