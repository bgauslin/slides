<template lang="pug">
  div.preloader
</template>

<script>
import Spinner from 'spin'

export default {
  data () {
    return {
      options: {
        color: null,
        lines: 12,
        length: 8,
        width: 3,
        radius: 8,
      }
    }
  },

  created () {
    this.setColor();
  },

  mounted () {
    this.attachSpinner();
  },

  methods: {
    attachSpinner () {
      window.setTimeout(() => {
        const spinner = new Spinner(this.options).spin();
        this.$el.appendChild(spinner.el);
      }, 500);
    },

    setColor () {
      const theme = this.$store.getters.theme;
      this.options.color = (theme === 'light') ? '#000' : '#fff';
    },
  },
}
</script>

<style lang="stylus">
.preloader
  height 100%
  left 0
  position fixed
  right 0
  top 0

.spinner
  left 50%
  top 50%

</style>
