<template lang="pug">
  button.theme(
    @click="toggleTheme",
    v-html="svgIcon",
    :aria-label="'Switch to ' + themeLabel + ' theme'",
  )
</template>

<script>
export default {
  mounted () {
    this.setTheme();
  },

  computed: {
    // TODO: Make the SVG scaleable.
    // https://css-tricks.com/scale-svg/
    svgIcon () {
      return `
        <svg xmlns="http://www.w3.org/2000/svg" xmlns:svg="http://www.w3.org/2000/svg">
          <circle class="theme__icon--circle" cx="16" cy="16" r="14.5" stroke-width="3" fill-opacity="0"/>
          <path class="theme__icon--path" stroke-dasharray="null" stroke-linecap="null" stroke-linejoin="null" stroke-width="0" d="m16.000002,0c8.773518,0 15.880063,7.106548 15.880063,15.880063c0,8.773515 -7.106545,15.880063 -15.880063,15.880063l0,-31.760127z"/>
        </svg>
      `;
    },

    theme () {
      return this.$store.getters.theme;
    },

    themeLabel () {
      return (this.theme === 'dark') ? 'light' : 'dark';
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
@import '../../../stylus/config/'

.theme
  align-items center
  appearance none
  background 0
  border 0
  display inline-flex
  height '%s' % Layout.HeaderHeights.BASE
  justify-content center
  overflow hidden
  outline none
  position fixed
  right 0
  top 0
  transition transform '%s' % Transitions.DEFAULT
  width '%s' % Layout.HeaderHeights.BASE

  @media Breakpoints.MEDIUM
    height '%s' % Layout.HeaderHeights.MEDIUM
    width '%s' % Layout.HeaderHeights.MEDIUM

.theme:hover
  cursor pointer

.theme:active
  transform scale(.8)

// TODO: Make the SVG scaleable.
.theme svg
  height '%s' % Layout.IconSizes.THEME
  overflow visible
  transform scale(.5)
  width '%s' % Layout.IconSizes.THEME

  @media Breakpoints.MEDIUM
    transform scale(.75)

// TODO: Remove rgba() from ACTIVE states; restore HOVER states instead where applicable.
// @type Hash
Themes = {
  'dark': {
    APP: {
      BACKGROUND: '%s' % Colors.DARK_GREY
      TEXT: white
    }
    BUTTON: {
      LINK: white
      ACTIVE: '%s' % Colors.DARK_GREY
      BACKGROUND: rgba(white, .1)
      BACKGROUND_ACTIVE: white
    }
    CONTROLS: {
      BACKGROUND: '%s' % rgba(Colors.DARK_GREY, .9)
      BORDER: rgba(white, .2)
      LINK: rgba(white, .5)
      ACTIVE: white
    }
    COVER: {
      BACKGROUND: '%s' % rgba(Colors.DARK_GREY, .8)
      LINK: '%s' % Colors.DARK_GREY
      ACTIVE: white
      LINK_BACKGROUND: white
      LINK_BACKGROUND_ACTIVE: transparent
    }
    HEADER: {
      BACKGROUND: '%s' % rgba(Colors.DARK_GREY, .9)
      LINK: white
      HOVER: rgba(white, .7)
      ACTIVE: white
    }
    LINK: {
      LINK: white
      ACTIVE: rgba(white, .7)
    }
  },
  'light': {
    APP: {
      BACKGROUND: '%s' % Colors.OFF_WHITE
      TEXT: '%s' % Colors.DARK_GREY
    }
    BUTTON: {
      LINK: '%s' % Colors.DARK_GREY
      ACTIVE: white
      BACKGROUND: '%s' % rgba(Colors.DARK_GREY, .1)
      BACKGROUND_ACTIVE: '%s' % Colors.DARK_GREY
    } 
    CONTROLS: {
      BACKGROUND: '%s' % rgba(Colors.OFF_WHITE, .85)
      BORDER: '%s' % rgba(Colors.DARK_GREY, .3)
      LINK: '%s' % rgba(Colors.DARK_GREY, .5)
      ACTIVE: '%s' % Colors.DARK_GREY
    }
    COVER: {
      BACKGROUND: rgba(white, .8)
      LINK: white
      ACTIVE: '%s' % Colors.DARK_GREY
      LINK_BACKGROUND: '%s' % Colors.DARK_GREY
      LINK_BACKGROUND_ACTIVE: transparent
    }
    HEADER: {
      BACKGROUND: '%s' rgba(Colors.OFF_WHITE, .95)
      LINK: '%s' % Colors.DARK_GREY
      HOVER: '%s' % rgba(Colors.DARK_GREY, .7)
      ACTIVE: '%s' % Colors.DARK_GREY
    }
    LINK: {
      LINK: '%s' % Colors.DARK_GREY
      ACTIVE: '%s' % rgba(Colors.DARK_GREY, .7)
    }
  }
}

// TODO: Refactor all theming values with interpolation.
for name, theme in Themes
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

      @media Breakpoints.LARGE
        background 0;
        border 0;

    // header + header navigation
    .header
      background header_['BACKGROUND'];

      @media Breakpoints.LARGE
        background 0;

    .header--cover
      background 0;

    .header--thumbs
      @media Breakpoints.LARGE
        background header_['BACKGROUND'];

    .header__link
      link(header_['LINK'], header_['LINK'], header_['HOVER'], header_['ACTIVE']);

    .header__link--home.current
    .header__link--home.current:hover
      color header_['LINK']

    .header__link--back:link .header__link__label::before
    .header__link--back:visited .header__link__label::before
      border-right-color header_['LINK'];

    .header__link--back:active .header__link__label::before
    [no-touch] .header__link--back:hover .header__link__label::before
      border-right-color header_['ACTIVE'];

    // contrast toggle icon
    .theme__icon--circle
    .theme__icon--path
      fill app_['TEXT'];
      stroke app_['TEXT'];

    // slideshow cover
    .cover__frame
      background-color cover_['BACKGROUND'];

    // links
    .slideshow__link
    .counter__link
      link(link_['LINK'], link_['LINK'], link_['ACTIVE'], link_['ACTIVE']);

    .cover__link
      border-color cover_['ACTIVE'];
      link(cover_['LINK'], cover_['LINK'], cover_['ACTIVE'], cover_['ACTIVE']);
      link_background(cover_['LINK_BACKGROUND'], cover_['LINK_BACKGROUND'], cover_['LINK_BACKGROUND_ACTIVE'], cover_['LINK_BACKGROUND_ACTIVE']);

    .prev-next__link:link .prev-next__svg__path
    .prev-next__link:visited .prev-next__svg__path
      stroke controls_['LINK'];

    .prev-next__link:active .prev-next__svg__path
      stroke controls_['ACTIVE'];

    &[no-touch] .prev-next__link:hover .prev-next__svg__path
      stroke controls_['ACTIVE'];

    .publication__link
      link(button_['LINK'], button_['LINK'], button_['ACTIVE'], button_['ACTIVE']);
      link_background(button_['BACKGROUND'], button_['BACKGROUND'], button_['BACKGROUND_ACTIVE'], button_['BACKGROUND_ACTIVE']);

</style>
