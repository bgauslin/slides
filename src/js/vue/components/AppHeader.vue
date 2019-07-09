<template lang="pug">
  header(
    :class="['header', 'header--' + view]",
  )
    div.header__content
      router-link(
        :class="['header__link', headerLinkClass]",
        :to="headerLinkRoute",
        :title="headerLinkLabel",
      ) 
        h1.header__link__label {{ headerLinkLabel }}
      theme
</template>

<script>
import { mapGetters } from 'vuex';
import Theme from './Theme.vue';

export default {
  props: {
    view: String,
  },

  components: { Theme },

  computed: {
    ...mapGetters({
      lastVisitedSlug: 'slug',
      slideshowTitle: 'slideshowTitle',
    }),

    /**
     * @return {string|null} CSS class for the header link based on the current route.
     */
    headerLinkClass() {
      const route = this.$route.name;
      if (route === 'home') {
        return 'header__link--home';
      } else if (route === 'thumbs') {
        return 'header__link--back';
      } else {
        return;
      }
    },

    /**
     * @return {string} The header link's text label based on the current route.
     */
    headerLinkLabel() {
      const route = this.$route.name;

      if (route === 'thumbs' && this.lastVisitedSlug) {
        return 'Back';
      } else if (route === 'thumbs' || route === 'slide') {
        return this.slideshowTitle;
      } else {
        return 'Slideshows';
      }
    },

    /**
     * @return {Object} The route to go to when header link is clicked.
     */
    headerLinkRoute() {
      const route = this.$route.name;

      if (route === 'thumbs' && this.lastVisitedSlug) {
        return {
          name: 'slide',
          params: {
            slideshow: this.slideshowRoute,
            slug: this.lastVisitedSlug
          }
        };
      } else if (route === 'thumbs' || route === 'slide') {
        return {
          name: 'cover',
          params: {
            slideshow: this.slideshowRoute
          }
        };
      } else {
        return { name: 'home' };
      }
    },

    /**
     * @return {string} The 'slideshow' URL param.
     */
    slideshowRoute() {
      return this.$route.params.slideshow;
    },
  }
}
</script>