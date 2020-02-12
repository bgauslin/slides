<template lang="pug">
  header(
    :class="headerClass",
  )
    div.header__content
      router-link(
        :class="headerLinkClass",
        :to="headerLinkRoute",
        :title="headerLinkLabel",
      ) 
        svg.icon.icon--back(
          v-if="hasIcon",
          viewbox="0 0 32 32",
        )
          path.icon__path(
            d="m21.08768,26.09236l-10.17537,-10.1165l10.12708,-10.06822",
          )
        h1.header__link__label {{ headerLinkLabel }}
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  props: {
    view: String,
  },

  computed: {
    ...mapGetters({
      lastVisitedSlug: 'slideSlug',
      slideshowTitle: 'slideshowTitle',
    }),

    /**
     * @return {boolean}
     */
    hasIcon() {
      return this.route === 'thumbs';
    },

    /**
     * CSS classes for the header based on the current view/route.
     * @return {string}
     */
    headerClass() {
      return `header header--${this.view}`;
    },

    /**
     * CSS class(es) for the header link based on the current route.
     * @return {string}
     */
    headerLinkClass() {
      const className = 'header__link';

      switch (this.route) {
        case 'home':
          return `${className} ${className}--home`;
        case 'thumbs':
          return `${className} ${className}--back`;
        default:
          return className;
      }
    },

    /**
     * The header link's text label based on the current route.
     * @return {string}
     */
    headerLinkLabel() {
      if (this.route === 'thumbs' && this.lastVisitedSlug) {
        return 'Back';
      } else if (this.route === 'thumbs' || this.route === 'slide') {
        return this.slideshowTitle;
      } else {
        return 'Slideshows';
      }
    },

    /**
     * The route to go to when header link is clicked.
     * @return {Object}
     */
    headerLinkRoute() {
      if (this.route === 'thumbs' && this.lastVisitedSlug) {
        return {
          name: 'slide',
          params: {
            slideshow: this.slideshowRoute,
            slug: this.lastVisitedSlug
          }
        };
      } else if (this.route === 'thumbs' || this.route === 'slide') {
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

    /** @return {string} */
    route() {
      return this.$route.name;
    },

    /**
     * The 'slideshow' URL param.
     * @return {string}
     */
    slideshowRoute() {
      return this.$route.params.slideshow;
    },
  }
}
</script>
