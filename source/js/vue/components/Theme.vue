<template lang="pug">
  button.theme(
    @click="toggleTheme",
  )
</template>

<script>
export default {
  mounted () {
    this.setTheme();
  },

  computed: {
    theme () {
      return this.$store.getters.theme;
    },
  },

  methods: {
    setTheme () {
      document.body.setAttribute('data-theme', this.theme);
    },

    toggleTheme () {
      const theme = (this.theme === 'light') ? 'dark' : 'light';
      this.$store.commit('updateTheme', theme);
      this.setTheme();
    },
  }
}
</script>

<style lang="stylus">
@import '../../../stylus/_config/'

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

  @media BREAKPOINT_MEDIUM
    height HEADER_HEIGHT_MEDIUM
    width HEADER_HEIGHT_MEDIUM

.theme:hover
  cursor pointer

.theme::before
  display inline-block
  font-size THEME_ICON_SIZE
  icon()

THEMES = {
  dark: {
    BACKGROUND: DARK_GREY
    CHROME_BACKGROUND: DARK_GREY
    CHROME_BORDER: rgba(WHITE, .25)
    COVER_BACKGROUND: rgba(DARK_GREY, .9)
    ICON: ICON_THEME_DARK
    LINK: WHITE
    LINK_ACTIVE: rgba(WHITE, .7)
    LINK_HOVER: rgba(WHITE, .7)
    TEXT_COLOR: WHITE
  },
  light: {
    BACKGROUND: OFF_WHITE
    CHROME_BACKGROUND: OFF_WHITE
    CHROME_BORDER: rgba(DARK_GREY, .25)
    COVER_BACKGROUND: rgba(WHITE, .25)
    ICON: ICON_THEME_LIGHT
    LINK: rgba(DARK_GREY, .7)
    LINK_ACTIVE: DARK_GREY
    LINK_HOVER: DARK_GREY
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

    .controls
      border-top 1px solid theme['CHROME_BORDER'];

      @media BREAKPOINT_LARGE
        border 0;

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

    .count__link
    .cover__link
    .prev-next__link
    .slideshow__link
      link(theme['LINK'], theme['LINK'], theme['LINK_HOVER'], theme['LINK_ACTIVE']);

    // TODO: border states for .cover__link
    .cover__link
      border 2px solid theme['LINK'];

    .publication__link
      border 1px solid theme['TEXT'];
      link(theme['LINK'], theme['LINK'], theme['LINK_HOVER'], theme['LINK_ACTIVE']);

</style>
