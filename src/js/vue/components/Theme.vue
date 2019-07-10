<template lang="pug">
  button.theme(
    @click="toggleTheme",
    v-html="svgIcon",
    :aria-label="'Switch to ' + themeLabel + ' theme'",
  )
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  mounted() {
    this.setTheme();
  },

  computed: {
    ...mapGetters(['theme']),

    /** @return {string} */
    svgIcon() {
      return `
        <svg class="theme-icon" viewbox="0 0 32 32">
          <circle class="theme-icon__circle" cx="16" cy="16" r="14.5" stroke-width="3" fill-opacity="0"/>
          <path class="theme-icon__path" stroke-dasharray="null" stroke-linecap="null" stroke-linejoin="null" stroke-width="0" d="m16.000002,0c8.773518,0 15.880063,7.106548 15.880063,15.880063c0,8.773515 -7.106545,15.880063 -15.880063,15.880063l0,-31.760127z"/>
        </svg>
      `;
    },

    /** @return {string} */
    themeLabel() {
      return (this.theme === 'dark') ? 'light' : 'dark';
    },
  },

  methods: {
    /**
     * Sets 'theme' attribute on the 'body' element.
     */
    setTheme() {
      document.body.setAttribute('theme', this.theme);
    },

    /**
     * Toggles the theme.
     */
    toggleTheme() {
      const theme = (this.theme === 'light') ? 'dark' : 'light';
      this.$store.commit('updateTheme', theme);
      this.setTheme();
    },
  }
}
</script>
