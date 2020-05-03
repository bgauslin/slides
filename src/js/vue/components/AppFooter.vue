<template lang="pug">
  footer(:class="['footer', 'footer--' + modifier]")
    p.footer__blurb.footer__blurb--copyright
      span.footer__years © 2018–{{ currentYear }}
      a.footer__link(
        :href="linkUrl",
        :title="'Visit ' + domain",
        target="_blank",
        rel="noopener",
      ) Ben Gauslin    
    p.footer__blurb.footer__blurb--repo(
      v-if="hasGitHubLink"
    )
      a.footer__link(
        :href="gitHubUrl",
        title="View source code on GitHub",
        target="_blank",
        rel="noopener",
      ) GitHub
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
      gitHubUrl: 'https://github.com/bgauslin/slides',
    }
  },

  computed: {
    /** @return {string} */
    currentYear() {
      return new Date().getFullYear().toString().substr(-2);
    },

    /** @return {string} */
    hasGitHubLink() {
      return this.modifier === 'app';
    },

    /** @return {string} */
    linkUrl() {
      return `https://${this.domain.toLowerCase()}`;
    },
  },
}
</script>