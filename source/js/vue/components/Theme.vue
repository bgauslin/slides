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
  margin-left auto
  overflow hidden
  outline none
  width HEADER_HEIGHT

  @media BREAKPOINT_MEDIUM
    height HEADER_HEIGHT_MEDIUM
    width HEADER_HEIGHT_MEDIUM

.theme::before
  border-radius 50%
  display inline-block
  font-size THEME_ICON_SIZE
  icon()
  padding px_to_rem(10)

THEMES = {
  dark: {
    BACKGROUND: DARK_GREY
    CHROME_BACKGROUND: rgba(DARK_GREY, .9)
    COVER_BACKGROUND: rgba(DARK_GREY, .9)
    ICON: THEME_ICON_DARK
    LINK: WHITE
    LINK_ACTIVE: rgba(WHITE, .7)
    LINK_HOVER: rgba(WHITE, .7)
    TEXT_COLOR: WHITE
  },
  light: {
    BACKGROUND: OFF_WHITE
    CHROME_BACKGROUND: rgba(OFF_WHITE, .95)
    COVER_BACKGROUND: rgba(WHITE, .5)
    ICON: THEME_ICON_LIGHT
    LINK: DARK_GREY
    LINK_ACTIVE: rgba(DARK_GREY, .7)
    LINK_HOVER: rgba(DARK_GREY, .7)
    TEXT_COLOR: DARK_GREY
  }
}

for name, theme in THEMES
  [data-theme=\"{name}\"]
    {body}&
      background theme['BACKGROUND'];
      color theme['TEXT_COLOR'];

      .theme::before
        content theme['ICON'];

      .header
      .controls
        background theme['CHROME_BACKGROUND'];

        @media BREAKPOINT_LARGE
          background 0;

      .header--cover
        background 0;

      .header--thumbs
        @media BREAKPOINT_LARGE
          background theme['CHROME_BACKGROUND'];

      .header__link
        link(theme['LINK'], theme['LINK'], theme['LINK_HOVER'], theme['LINK']);

      .cover__frame
        background-color theme['COVER_BACKGROUND'];

      .theme
      .cover__header
        color theme['TEXT_COLOR'];

      .theme::before
        @media BREAKPOINT_LARGE
          background theme['CHROME_BACKGROUND'];

      .count__link
      .cover__link
      .prev-next__link
      .slideshow__link
        link(theme['LINK'], theme['LINK'], theme['LINK_HOVER'], theme['LINK_ACTIVE']);

      // TODO: border states for .cover__link
      .cover__link
        border 2px solid theme['LINK'];

      // TODO: revise .publication styles
      .publication
        background WHITE;

</style>
