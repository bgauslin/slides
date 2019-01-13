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
import Theme from './Theme.vue';

export default {
  props: ['view'],

  components: { Theme },

  computed: {
    headerLinkClass () {
      const route = this.$route.name;
      if (route === 'home') {
        return 'header__link--home';
      } else if (route === 'thumbs') {
        return 'header__link--back';
      } else {
        return;
      }
    },

    headerLinkLabel () {
      const route = this.$route.name;

      if (route === 'thumbs' && this.lastVisitedSlug) {
        return 'Back';
      } else if (route === 'thumbs' || route === 'slide') {
        return this.slideshowTitle;
      } else {
        return 'Slideshows';
      }
    },

    headerLinkRoute () {
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

    lastVisitedSlug () {
      return this.$store.getters.slug;
    },

    slideshowRoute () {
      return this.$route.params.slideshow;
    },

    slideshowTitle () {
      return this.$store.getters.slideshowTitle;
    },
  }
}
</script>

<style lang="stylus">
@import '../../../stylus/config/'

.header
  align-items center
  display flex
  justify-content center
  left 0
  position fixed
  width 100vw
  z-index 1

.header__content
  display flex
  flex 1
  margin 0 auto
  max-width CONTENT_MAX_WIDTH
  width 100%

.header__link
  align-items center
  display inline-flex
  font-size '%s' % FontSizes.Base.HEADING
  font-weight normal
  heading_font()
  height '%s' % Layout.HeaderHeights.BASE
  padding '%s %s %s %s' % (0 Layout.HeaderHeights.BASE 0 px_to_rem(16))
  width 100%

  @media Breakpoints.MEDIUM
    font-size '%s' % FontSizes.Medium.HEADING
    height '%s' % Layout.HeaderHeights.MEDIUM
    padding '%s %s %s %s' % (0 Layout.HeaderHeights.MEDIUM 0 COLUMN_GAP)

// NOTE: 'current' class is auto-generated for 'exact' router-links
.header__link--home.current
  cursor default

.header__link__label
  font-size 1em
  margin 0
  overflow hidden
  text-overflow ellipsis
  transition transform '%s' % Transitions.DEFAULT
  white-space nowrap

.header__link:active .header__link__label
  transform scale(.9)

.header__link--home.current:active .header__link__label
  transform none

.header__link--back .header__link__label
  @media Breakpoints.MEDIUM
    margin-left px_to_rem(-12)

// NOTE: css_triangle() color gets overridden by Theme component.
.header__link--back .header__link__label::before
  css_triangle(Colors.DARK_GREY, Layout.IconSizes.BACK_ARROW, 'left')
  margin-right px_to_rem(6)

</style>
