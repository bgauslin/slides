<template lang="pug">
  header(
    :class="['header', 'header--' + view]",
  )
    div.header__content
      router-link(
        :class="['header__link', 'header__link--' + headerLinkClassModifier]",
        :to="headerLinkRoute",
        :title="headerLinkLabel",
      )
        span.header__link__label {{ headerLinkLabel }}
      theme
</template>

<script>
import Theme from './Theme.vue';

export default {
  props: ['view'],

  components: { Theme },

  computed: {
    headerLinkClassModifier () {
      return (this.$route.name === 'home') ? 'home' : 'back';
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
    }
  }
}
</script>

<style lang="stylus">
@import '../../../stylus/_config/'

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

// TODO: create nested element for overflow: ellipsis
.header__link
  align-items center
  display inline-flex
  font-size HEADING_SIZE
  font-weight normal
  heading_font()
  height HEADER_HEIGHT
  padding 0 HEADER_HEIGHT 0 px_to_rem(16)
  width 100%

  @media BREAKPOINT_MEDIUM
    font-size HEADING_SIZE_MEDIUM
    height HEADER_HEIGHT_MEDIUM
    padding 0 HEADER_HEIGHT_MEDIUM 0 COLUMN_GAP
    position relative

// NOTE: 'current' class is auto-generated for 'exact' router-links
.header__link--home.current
  cursor default

.header__link--back
  padding-left px_to_rem(8)

  @media BREAKPOINT_MEDIUM
    padding-left COLUMN_GAP

.header__link--back::before
  content ICON_ANGLE_LEFT
  font-size BACK_ARROW_SIZE
  icon()
  overflow hidden
  width BACK_ARROW_SIZE

  @media BREAKPOINT_MEDIUM
    left .2em
    position absolute
    top .8em

.header__link__label
  overflow hidden
  text-overflow ellipsis
  transition color DEFAULT_TRANSITION, transform DEFAULT_TRANSITION
  white-space nowrap

// TODO: only apply transform when navigating between 'cover' and 'home' routes
.header__link:active .header__link__label
  transform scale(.9)

.header__link--home.current:active  .header__link__label
  transform none

</style>
