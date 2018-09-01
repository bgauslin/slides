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

.header__link
  align-items center
  display inline-flex
  font-size HEADING_SIZE
  font-weight normal
  heading_font()
  height HEADER_HEIGHT
  padding 0 0 0 px_to_rem(16) // TODO: new constant
  overflow hidden
  position relative
  text-overflow ellipsis
  transition color DEFAULT_TRANSITION
  white-space nowrap

  @media BREAKPOINT_MEDIUM
    font-size HEADING_SIZE_MEDIUM
    height HEADER_HEIGHT_MEDIUM
    padding 0 0 0 COLUMN_GAP_LARGE

  // @media BREAKPOINT_LARGE
    // width SIDEBAR_WIDTH

// .header__link--back::before
//   content ICON_ANGLE_LEFT
//   font-size BACK_ARROW_SIZE
//   icon()
//   left px_to_rem(- BACK_ARROW_SIZE)
//   overflow hidden
//   position absolute
//   top .05em
//   width BACK_ARROW_SIZE

</style>
