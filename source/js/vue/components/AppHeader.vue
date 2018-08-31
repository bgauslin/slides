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
      ) {{ slideshowTitle }}
      router-link(
        v-if="homeLink",
        :class="linkClass",
        exact,
        title="Home",
        :to="{ name: 'home' }",
      ) Slideshows
</template>

<script>
export default {
  props: ['view'],

  computed: {
    homeLink () {
      return (this.$route.name == 'home' || this.$route.name == 'cover');
    },

    linkClass () {
      if (this.$route.name == 'home') {
        return 'header__link';
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
  position fixed
  width 100vw
  z-index 1

  @media BREAKPOINT_LARGE
    width SIDEBAR_WIDTH

.header--thumbs
  @media BREAKPOINT_LARGE
    width 100vw

.header__link
  align-items center
  display inline-flex
  font-size HEADING_SIZE
  font-weight normal
  heading_font()
  height HEADER_HEIGHT
  overflow hidden
  padding 0 px_to_rem(16)
  text-overflow ellipsis
  transition color TRANSITION_SPEED
  white-space nowrap

  @media BREAKPOINT_MEDIUM
    font-size HEADING_SIZE_MEDIUM
    height HEADER_HEIGHT_MEDIUM

  @media BREAKPOINT_LARGE
    padding 0 COLUMN_GAP_LARGE

.header__link--back
  padding-left px_to_rem(8)

.header__link--back::before
  content ICON_ANGLE_LEFT
  font-size BACK_ARROW_SIZE
  icon()
  overflow hidden
  position relative
  top .05em
  width BACK_ARROW_SIZE

</style>
