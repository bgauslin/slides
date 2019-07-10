<template lang="pug">
  div.preloader(
    :style="setPosition()",
  )
</template>

<script>
import { mapGetters } from 'vuex';
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

  computed: {
    ...mapGetters(['theme']),
  },

  created() {
    this.setOptions();
  },

  mounted() {
    this.attachSpinner();
  },

  methods: {
    /** 
     * Attaches a loading spinner to an element after a brief delay.
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
      this.options.color = (this.theme === 'light') ? '#000' : '#fff';
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
