<template lang="pug">
  div.preloader(
    :style="setPosition()",
  )
</template>

<script>
import Spinner from 'spin'

export default {
  props: {
    options: Object,
    position: String,
  },

  data() {
    return {
      delay: 1000,
    }
  },

  created() {
    this.setOptions();
  },

  mounted() {
    this.attachSpinner();
  },

  methods: {
    /** 
     * Attaches a loading spinner to an element.
     */
    attachSpinner() {
      window.setTimeout(() => {
        const spinner = new Spinner(this.options).spin();
        this.$el.appendChild(spinner.el);
      }, this.delay);
    },

    /** 
     * Sets loading spinner color based on current theme.
     */
    setOptions() {
      const theme = this.$store.getters.theme;
      this.options.color = (theme === 'light') ? '#000' : '#fff';
    },

    /**
     * Renders inline style with 'position' property depending on what element
     * the loading spinner is attached to.
     * @return {string}
     */
    setPosition() {
      return `position: ${this.position}`;
    },
  },
}
</script>
