<template lang="pug">
  footer(:class="['footer', 'footer--' + modifier]")
    p.footer__blurb.footer__blurb--copyright
      a.footer__link(
        :href="linkUrl",
        :title="'Visit ' + domain",
        target="_blank",
        rel="noopener",
      )
        span.footer__years © {{ currentYear }} Ben Gauslin
</template>

<script>
export default {
  props: {
    modifier: String,
  },

  data() {
    return {
      domain: 'Gauslin.com',
      owner: 'Ben Gauslin',
    }
  },

  computed: {
    /** @return {string} */
    currentYear() {
      return new Date().getFullYear();
    },

    /** @return {string} */
    linkUrl() {
      return `https://${this.domain.toLowerCase()}`;
    },
  },
}
</script>