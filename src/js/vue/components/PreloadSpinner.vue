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
        color: '',
        length: 6,
        lines: 12,
        radius: 7,
        width: 3,
      }
    }
  },

  computed: {
    ...mapGetters([
      'theme',
    ]),
  },

  mounted() {
    this.setColor();
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
  
    // Sets spinner color relative to the current theme.
    setColor() {
      this.options.color = (this.theme === 'light') ? '#000' : '#fff';
    },
  },
}
</script>
