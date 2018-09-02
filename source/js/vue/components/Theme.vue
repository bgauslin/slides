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
  border-radius 50%
  content ''
  display inline-block
  height THEME_ICON_SIZE
  width THEME_ICON_SIZE

THEMES = {
  'dark': {
    APP: {
      BACKGROUND: DARK_GREY
      ICON_COLOR: WHITE
      TEXT: WHITE
    },
    CONTROLS: {
      BACKGROUND: rgba(DARK_GREY, .9)
      BORDER: rgba(WHITE, .2)
      LINK: rgba(WHITE, .5)
      HOVER: WHITE
      ACTIVE: WHITE
    }
    COUNT: {
      LINK: WHITE
      HOVER: rgba(WHITE, .7)
      ACTIVE: rgba(WHITE, .7)
    }
    COVER: {
      BACKGROUND: rgba(DARK_GREY, .8)
    },
    HEADER: {
      BACKGROUND: rgba(DARK_GREY, .9)
      LINK: WHITE
      HOVER: rgba(WHITE, .7)
      ACTIVE: rgba(WHITE, .7)
    }
    LINK: {
      LINK: WHITE
      HOVER: rgba(WHITE, .7)
      ACTIVE: rgba(WHITE, .7)
    }
  },
  'light': {
    APP: {
      BACKGROUND: OFF_WHITE
      ICON_COLOR: DARK_GREY
      TEXT: DARK_GREY
    },
    CONTROLS: {
      BACKGROUND: rgba(OFF_WHITE, .95)
      BORDER: rgba(DARK_GREY, .3)
      LINK: rgba(DARK_GREY, .5)
      HOVER: DARK_GREY
      ACTIVE: DARK_GREY
    }
    COUNT: {
      LINK: DARK_GREY
      HOVER: rgba(DARK_GREY, .7)
      ACTIVE: rgba(DARK_GREY, .7)
    }
    COVER: {
      BACKGROUND: rgba(WHITE, .8)
    },
    HEADER: {
      BACKGROUND: rgba(OFF_WHITE, .95)
      LINK: DARK_GREY
      HOVER: rgba(DARK_GREY, .7)
      ACTIVE: rgba(DARK_GREY, .7)
    }
    LINK: {
      LINK: LINK_COLOR
      HOVER: rgba(LINK_COLOR, .7)
      ACTIVE: rgba(LINK_COLOR, .7)
    } 
  }
}

for name, theme in THEMES
  app_ = theme['APP']
  controls_ = theme['CONTROLS']
  count_ = theme['COUNT']
  cover_ = theme['COVER']
  header_ = theme['HEADER']
  link_ = theme['LINK']

  body[data-theme=\"{name}\"]
    background app_['BACKGROUND'];
    color app_['TEXT'];

    // footer navigation
    .controls
      background controls_['BACKGROUND'];
      border-top .5px solid controls_['BORDER'];

      @media BREAKPOINT_LARGE
        background 0;
        border 0;

    .prev-next__link
      link(controls_['LINK'], controls_['LINK'], controls_['HOVER'], controls_['ACTIVE']);

    .count__link
      link(count_['LINK'], count_['LINK'], count_['HOVER'], count_['ACTIVE']);

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
      link(header_['LINK'], header_['LINK'], header_['HOVER'], header_['ACTIVE']);

    // slideshow cover
    .cover__frame
      background-color cover_['BACKGROUND'];

    .cover__link
      border 2px solid link_['LINK']; // TODO: border states for .cover__link

    // other links
    .cover__link
    .slideshow__link
    .publication__link
      link(link_['LINK'], link_['LINK'], link_['HOVER'], link_['ACTIVE']);

    .publication__link
      border 1px solid link_['TEXT']; // TODO: border states for .publication__link

    // theme icon
    .theme::before
      background app_['ICON_COLOR'];

</style>
