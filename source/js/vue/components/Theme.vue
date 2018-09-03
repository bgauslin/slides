<template lang="pug">
  button.theme(
    @click="toggleTheme",
  )
    img(
      class="theme__icon",
      :src="svgIcon",
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
    
    svgIcon () {
      return `/ui/icons/contrast-${this.theme}.svg`;
    }
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
  transition transform DEFAULT_TRANSITION
  width HEADER_HEIGHT

  @media BREAKPOINT_MEDIUM
    height HEADER_HEIGHT_MEDIUM
    width HEADER_HEIGHT_MEDIUM

.theme:hover
  cursor pointer

.theme:active
  transform scale(.9)

.theme__icon
  height THEME_ICON_SIZE
  width THEME_ICON_SIZE

  @media BREAKPOINT_MEDIUM
    height THEME_ICON_SIZE_MEDIUM
    width THEME_ICON_SIZE_MEDIUM

THEMES = {
  'dark': {
    APP: {
      BACKGROUND: DARK_GREY
      TEXT: WHITE
    }
    BUTTON: {
      LINK: WHITE
      ACTIVE: DARK_GREY
      BACKGROUND: rgba(WHITE, .1)
      BACKGROUND_ACTIVE: WHITE
    }
    CONTROLS: {
      BACKGROUND: rgba(DARK_GREY, .9)
      BORDER: rgba(WHITE, .2)
      LINK: rgba(WHITE, .5)
      ACTIVE: WHITE
    }
    COVER: {
      BACKGROUND: rgba(DARK_GREY, .8)
      LINK: DARK_GREY
      ACTIVE: WHITE
      LINK_BACKGROUND: WHITE
      LINK_BACKGROUND_ACTIVE: transparent
    }
    HEADER: {
      BACKGROUND: rgba(DARK_GREY, .9)
      LINK: WHITE
      ACTIVE: rgba(WHITE, .7)
    }
    LINK: {
      LINK: WHITE
      ACTIVE: rgba(WHITE, .7)
    }
  },
  'light': {
    APP: {
      BACKGROUND: OFF_WHITE
      TEXT: DARK_GREY
    }
    BUTTON: {
      LINK: DARK_GREY
      ACTIVE: WHITE
      BACKGROUND: rgba(DARK_GREY, .1)
      BACKGROUND_HOVER: rgba(DARK_GREY, .7)
    } 
    CONTROLS: {
      BACKGROUND: rgba(OFF_WHITE, .95)
      BORDER: rgba(DARK_GREY, .3)
      LINK: rgba(DARK_GREY, .5)
      ACTIVE: DARK_GREY
    }
    COVER: {
      BACKGROUND: rgba(WHITE, .8)
      LINK: WHITE
      ACTIVE: DARK_GREY
      LINK_BACKGROUND: DARK_GREY
      LINK_BACKGROUND_ACTIVE: transparent
    }
    HEADER: {
      BACKGROUND: rgba(OFF_WHITE, .95)
      LINK: DARK_GREY
      ACTIVE: rgba(DARK_GREY, .7)
    }
    LINK: {
      LINK: DARK_GREY
      ACTIVE: rgba(DARK_GREY, .7)
    }
  }
}

for name, theme in THEMES
  app_ = theme['APP']
  button_ = theme['BUTTON']
  controls_ = theme['CONTROLS']
  cover_ = theme['COVER']
  header_ = theme['HEADER']
  link_ = theme['LINK']

  body[data-theme=\"{name}\"]
    background app_['BACKGROUND'];
    color app_['TEXT'];

  [data-theme=\"{name}\"]
    // footer navigation
    .controls
      background controls_['BACKGROUND'];
      border-top .5px solid controls_['BORDER'];

      @media BREAKPOINT_LARGE
        background 0;
        border 0;

    // header + header navigation
    .header
      background header_['BACKGROUND'];

      @media BREAKPOINT_LARGE
        background 0;

    .header--cover
      background 0;

    .header--thumbs
      @media BREAKPOINT_LARGE
        background header_['BACKGROUND'];

    .header__link
      link(header_['LINK'], header_['LINK'], header_['ACTIVE'], header_['ACTIVE']);

    .header__link--home.current
      color header_['LINK']

    // slideshow cover
    .cover__frame
      background-color cover_['BACKGROUND'];

    // links
    .slideshow__link
    .count__link
      link(link_['LINK'], link_['LINK'], link_['ACTIVE'], link_['ACTIVE']);

    .cover__link
      border-color cover_['ACTIVE'];
      link(cover_['LINK'], cover_['LINK'], cover_['ACTIVE'], cover_['ACTIVE']);
      link_background(cover_['LINK_BACKGROUND'], cover_['LINK_BACKGROUND'], cover_['LINK_BACKGROUND_ACTIVE'], cover_['LINK_BACKGROUND_ACTIVE']);

    .prev-next__link
      link(controls_['LINK'], controls_['LINK'], controls_['ACTIVE'], controls_['ACTIVE']);

    .publication__link
      link(button_['LINK'], button_['LINK'], button_['ACTIVE'], button_['ACTIVE']);
      link_background(button_['BACKGROUND'], button_['BACKGROUND'], button_['BACKGROUND_ACTIVE'], button_['BACKGROUND_ACTIVE']);

</style>
