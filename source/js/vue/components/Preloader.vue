<template lang="pug">
  div.preloader(
    :style="setPosition()",
  )
</template>

<script>
import Spinner from 'spin'

export default {

  props: [
    'options',
    'position',
  ],

  data () {
    return {
      delay: 1000,
    }
  },

  created () {
    this.setOptions();
  },

  mounted () {
    this.attachSpinner();
  },

  methods: {
    attachSpinner () {
      window.setTimeout(() => {
        const spinner = new Spinner(this.options).spin();
        this.$el.appendChild(spinner.el);
      }, this.delay);
    },

    setOptions () {
      const theme = this.$store.getters.theme;
      this.options.color = (theme === 'light') ? '#000' : '#fff';
    },

    setPosition() {
      return `position: ${this.position}`;
    },
  },
}
</script>

<style lang="stylus">
.preloader
  height 100%
  left 0
  right 0
  top 0

.spinner
  left 50%
  top 50%

</style>
