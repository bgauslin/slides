<template lang="pug">
  button.theme(
    @click="toggleTheme",
  )
</template>

<script>
export default {
  data () {
    return {
      theme: null,
    }
  },

  mounted () {
    this.getTheme();
  },

  methods: {
    getTheme () {
      this.theme = document.body.getAttribute('data-theme');
    },

    toggleTheme () {
      this.theme = (this.theme === 'light') ? 'dark' : 'light';
      document.body.setAttribute('data-theme', this.theme);
    }
  }
}
</script>

<style lang="stylus">
@import '../../../stylus/_config/'

THEME_BUTTON_SIZE = px_to_rem(44)
THEME_ICON_SIZE = px_to_rem(18)
THEME_ICON_DARK = 'brightness_low'
THEME_ICON_LIGHT = 'brightness_high'

.theme
  align-items center
  appearance none
  background 0
  border 0
  display inline-flex
  height HEADER_HEIGHT
  justify-content center
  overflow hidden
  outline none
  position fixed
  right 0
  top 0
  width HEADER_HEIGHT
  z-index 1

  @media BREAKPOINT_MEDIUM
    height HEADER_HEIGHT_MEDIUM

  @media BREAKPOINT_LARGE
    left SIDEBAR_WIDTH
    right auto

.theme::before
  font-size THEME_ICON_SIZE
  icon()

// TODO: loop over array of values for theming...
body[data-theme="dark"]
  background DARK_GREY
  color OFF_WHITE

  .cover__frame
    background-color rgba(DARK_GREY, .85)

  .theme
  .cover__header
    color WHITE

  .theme::before
    content THEME_ICON_DARK

  .header__link
    link(WHITE, WHITE, rgba(WHITE, .7), WHITE)

  .cover__link
  .prev-next__link
  .slideshow__link
    link(WHITE, WHITE, rgba(WHITE, .7), rgba(WHITE, .7))

  .cover__link
    border 2px solid WHITE // TODO: border styles for link

  .publication
    background WHITE // TODO: revisit .publication styles

body[data-theme="light"]
  background OFF_WHITE
  color DARK_GREY

  .cover__frame
    background-color rgba(WHITE, .85)

  .theme
  .cover__header
    color DARK_GREY
  
  .theme::before
    content THEME_ICON_LIGHT

  .header__link
    link(DARK_GREY, DARK_GREY, rgba(DARK_GREY, .7), DARK_GREY)

  .cover__link
  .prev-next__link
  .slideshow__link
    link(DARK_GREY, DARK_GREY, rgba(DARK_GREY, .7), rgba(DARK_GREY, .7))

  .cover__link
    border 2px solid DARK_GREY // TODO: border styles for link

  .publication
    background WHITE // TODO: revisit .publication styles

</style>
