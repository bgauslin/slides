<template lang="pug">
  header.header
    div.header__content
      router-link(
        v-if="slideshowTitle && !homeLink",
        :class="className",
        :title="slideshowTitle",
        :to="{ name: 'cover', params: { slideshow: slideshowRoute } }",
      ) {{ slideshowTitle }}
      router-link(
        v-if="homeLink",
        :class="className",
        exact,
        title="Home",
        :to="{ name: 'home' }",
      ) Slideshows
</template>

<script>
export default {
  computed: {
    className () {
      if (this.$route.name == 'home') {
        return 'header__link';
      } else {
        return 'header__link header__link--back';
      }
    },

    homeLink () {
      return (this.$route.name == 'home' || this.$route.name == 'cover');
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
  background rgba(DARK_GREY, .9)
  position fixed
  width 100vw
  z-index 1

  @media BREAKPOINT_LARGE
    background 0
    width SIDEBAR_WIDTH

.header__link
  align-items center
  color WHITE
  display inline-flex
  font-size HEADING_SIZE
  font-weight normal
  heading_font()
  height HEADER_HEIGHT
  overflow hidden
  padding 0 px_to_rem(16)
  text-overflow ellipsis
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
  width BACK_ARROW_SIZE

</style>
