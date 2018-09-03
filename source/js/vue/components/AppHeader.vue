<template lang="pug">
  header(
    :class="['header', 'header--' + view]",
  )
    div.header__content
      router-link(
        v-if="slideshowTitle && !homeLink",
        :class="linkClass",
        :title="slideshowTitle",
        :to="{ name: 'cover', params: { slideshow: slideshowRoute } }",
      )
        span.header__link__label {{ slideshowTitle }}
      router-link(
        v-if="homeLink",
        :class="linkClass",
        :to="{ name: 'home' }",
        title="Home",
        exact,
      )
        span.header__link__label Slideshows
      theme
</template>

<script>
import Theme from './Theme.vue';

export default {
  props: ['view'],

  components: { Theme },

  computed: {
    homeLink () {
      return (this.$route.name == 'home' || this.$route.name == 'cover');
    },

    linkClass () {
      if (this.$route.name == 'home') {
        return 'header__link header__link--home';
      } else {
        return 'header__link header__link--back';
      }
    },

    slideshowRoute () {
      return this.$route.params.slideshow;
    },

    slideshowTitle () {
      const slideshow = this.$store.getters.slideshow
      if (slideshow !== undefined) {
        return slideshow.title;
      }
    },
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
  transition color DEFAULT_TRANSITION, transform DEFAULT_TRANSITION
  width 100%

  @media BREAKPOINT_MEDIUM
    font-size HEADING_SIZE_MEDIUM
    height HEADER_HEIGHT_MEDIUM
    padding 0 HEADER_HEIGHT_MEDIUM 0 COLUMN_GAP
    position relative

// TODO: only apply transform when navigating between 'cover' and 'home' routes
.header__link:active
  transform scale(.8)

// NOTE: 'current' class is auto-generated for 'exact' router-links
.header__link--home.current
  cursor default

.header__link--home.current:active
  transform none

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
  white-space nowrap

</style>
