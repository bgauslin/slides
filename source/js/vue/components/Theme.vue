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

COLOR_DARK = WHITE
BACKGROUND_DARK = DARK_GREY

body[data-theme="dark"]
  background BACKGROUND_DARK
  color OFF_WHITE

  .header
  .controls
    background rgba(BACKGROUND_DARK, .9)

    @media BREAKPOINT_LARGE
      background 0

  .cover__frame
    background-color rgba(BACKGROUND_DARK, .85)

  .theme
  .cover__header
    color COLOR_DARK

  .theme::before
    content THEME_ICON_DARK

  .header__link
    link(COLOR_DARK, COLOR_DARK, rgba(COLOR_DARK, .7), COLOR_DARK)

  .cover__link
  .prev-next__link
  .slideshow__link
    link(COLOR_DARK, COLOR_DARK, rgba(COLOR_DARK, .7), rgba(COLOR_DARK, .7))

  .cover__link
    border 2px solid COLOR_DARK // TODO: border styles for link

  .publication
    background WHITE // TODO: revisit .publication styles



COLOR_LIGHT = DARK_GREY
BACKGROUND_LIGHT = OFF_WHITE

body[data-theme="light"]
  background BACKGROUND_LIGHT
  color COLOR_LIGHT

  .header
  .controls
    background rgba(BACKGROUND_LIGHT, .9)

    @media BREAKPOINT_LARGE
      background 0

  .cover__frame
    background-color rgba(WHITE, .5)

  .theme
  .cover__header
    color COLOR_LIGHT
  
  .theme::before
    content THEME_ICON_LIGHT

  .header__link
    link(COLOR_LIGHT, COLOR_LIGHT, rgba(COLOR_LIGHT, .7), COLOR_LIGHT)

  .cover__link
  .prev-next__link
  .slideshow__link
    link(COLOR_LIGHT, COLOR_LIGHT, rgba(COLOR_LIGHT, .7), rgba(COLOR_LIGHT, .7))

  .cover__link
    border 2px solid COLOR_LIGHT // TODO: border styles for link

  .publication
    background WHITE // TODO: revisit .publication styles

</style>
