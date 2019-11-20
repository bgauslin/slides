<template lang="pug">
  footer.footer
    p.copyright
      span.copyright__years © 2018–{{ currentYear }}
      a.copyright__owner(
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
    currentYear() {
      return new Date().getFullYear().toString().substr(-2);
    },

    /** @return {string} */
    linkTitle() {
      return `Visit ${this.domain}`;
    },

    /** @return {string} */
    linkURL() {
      return `https://${this.domain.toLowerCase()}`;
    },
  },
}
</script>