<template lang="pug">
  footer.footer
    p.copyright
      span.copyright__bug {{ copyrightYear }}
      a(
        class="copyright__link",
        target="_blank",
        rel="noopener",
        :href="linkURL",
        :title="linkTitle",
      ) {{ owner }}
</template>

<script>
export default {
  data() {
    return {
      domain: 'Gauslin.com',
      owner: 'Ben Gauslin',
    }
  },

  computed: {
    /** @return {string} */
    copyrightYear() {
      const now = new Date();
      return `© ${now.getFullYear()}`;
    },

    /** @return {string} */
    linkTitle() {
      return `Visit ${this.domain} (opens in new window)`;
    },

    /** @return {string} */
    linkURL() {
      return `https://${this.domain.toLowerCase()}`;
    },
  },
}
</script>