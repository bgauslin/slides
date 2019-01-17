<template lang="pug">
  button.theme(
    @click="toggleTheme",
    v-html="svgIcon",
    :aria-label="'Switch to ' + themeLabel + ' theme'",
  )
</template>

<script>
export default {
  mounted() {
    this.setTheme();
  },

  computed: {
    /** @return {string} */
    svgIcon() {
      return `
        <svg class="theme-icon" viewbox="0 0 32 32">
          <circle class="theme-icon__circle" cx="16" cy="16" r="14.5" stroke-width="3" fill-opacity="0"/>
          <path class="theme-icon__path" stroke-dasharray="null" stroke-linecap="null" stroke-linejoin="null" stroke-width="0" d="m16.000002,0c8.773518,0 15.880063,7.106548 15.880063,15.880063c0,8.773515 -7.106545,15.880063 -15.880063,15.880063l0,-31.760127z"/>
        </svg>
      `;
    },

    /** @return {string} */
    theme() {
      return this.$store.getters.theme;
    },

    /** @return {string} */
    themeLabel() {
      return (this.theme === 'dark') ? 'light' : 'dark';
    },
  },

  methods: {
    /** @description Sets 'theme' attribute on the 'body' element. */
    setTheme() {
      document.body.setAttribute('data-theme', this.theme);
    },

    /** @description Toggles the theme. */
    toggleTheme() {
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
  transition 'transform %s' % Transitions.DEFAULT
  width '%s' % Layout.HeaderHeights.BASE

  @media Breakpoints.MEDIUM
    height '%s' % Layout.HeaderHeights.MEDIUM
    width '%s' % Layout.HeaderHeights.MEDIUM

.theme:hover
  cursor pointer

.theme:active
  transform scale(.8)

.theme-icon
  width '%s' % Layout.IconSizes.Theme.BASE

  @media Breakpoints.MEDIUM
    width '%s' % Layout.IconSizes.Theme.MEDIUM

// @type Hash
Themes = {
  dark: {
    App: {
      BACKGROUND: '%s' % Colors.DARK_GREY
      TEXT: white
    }
    Button: {
      LINK: white
      ACTIVE: '%s' % Colors.DARK_GREY
      BACKGROUND: rgba(white, .1)
      BACKGROUND_ACTIVE: white
    }
    Controls: {
      BACKGROUND: '%s' % rgba(Colors.DARK_GREY, .9)
      BORDER: rgba(white, .2)
      LINK: rgba(white, .5)
      ACTIVE: white
    }
    Cover: {
      BACKGROUND: '%s' % rgba(Colors.DARK_GREY, .8)
      LINK: '%s' % Colors.DARK_GREY
      ACTIVE: white
      LINK_BACKGROUND: white
      LINK_BACKGROUND_ACTIVE: transparent
    }
    Header: {
      BACKGROUND: '%s' % rgba(Colors.DARK_GREY, .9)
      LINK: white
      HOVER: rgba(white, .7)
      ACTIVE: white
    }
    Link: {
      BASE: white
      ACTIVE: rgba(white, .7)
    }
  }
  light: {
    App: {
      BACKGROUND: '%s' % Colors.OFF_WHITE
      TEXT: '%s' % Colors.DARK_GREY
    }
    Button: {
      LINK: '%s' % Colors.DARK_GREY
      ACTIVE: white
      BACKGROUND: '%s' % rgba(Colors.DARK_GREY, .1)
      BACKGROUND_ACTIVE: '%s' % Colors.DARK_GREY
    } 
    Controls: {
      BACKGROUND: '%s' % rgba(Colors.OFF_WHITE, .85)
      BORDER: '%s' % rgba(Colors.DARK_GREY, .3)
      LINK: '%s' % rgba(Colors.DARK_GREY, .5)
      ACTIVE: '%s' % Colors.DARK_GREY
    }
    Cover: {
      BACKGROUND: rgba(white, .8)
      LINK: white
      ACTIVE: '%s' % Colors.DARK_GREY
      LINK_BACKGROUND: '%s' % Colors.DARK_GREY
      LINK_BACKGROUND_ACTIVE: transparent
    }
    Header: {
      BACKGROUND: '%s' % rgba(Colors.OFF_WHITE, .95)
      LINK: '%s' % Colors.DARK_GREY
      HOVER: '%s' % rgba(Colors.DARK_GREY, .7)
      ACTIVE: '%s' % Colors.DARK_GREY
    }
    Link: {
      BASE: '%s' % Colors.DARK_GREY
      ACTIVE: '%s' % rgba(Colors.DARK_GREY, .7)
    }
  }
}

for name, theme in Themes
  body[data-theme=\"{name}\"]
    background '%s' % theme.App.BACKGROUND
    color '%s' % theme.App.TEXT

  [data-theme=\"{name}\"]
    // footer navigation
    .controls
      background '%s' % theme.Controls.BACKGROUND
      border-top .5px solid '%s' % theme.Controls.BORDER

      @media Breakpoints.LARGE
        background 0
        border 0

    // header and header navigation
    .header
      background '%s' % theme.Header.BACKGROUND

      @media Breakpoints.LARGE
        background 0

    .header--cover
      background 0

    .header--thumbs
      @media Breakpoints.LARGE
        background '%s' % theme.Header.BACKGROUND

    .header__link
      link(theme.Header.LINK, theme.Header.LINK, theme.Header.HOVER, theme.Header.ACTIVE)

    .header__link--home.current
    .header__link--home.current:hover
      color '%s' % theme.Header.LINK

    .header__link--back:link .header__link__label::before
    .header__link--back:visited .header__link__label::before
      border-right-color '%s' % theme.Header.LINK

    .header__link--back:active .header__link__label::before
    [no-touch] .header__link--back:hover .header__link__label::before
      border-right-color '%s' % theme.Header.ACTIVE

    // contrast toggle icon
    .theme-icon__circle
    .theme-icon__path
      fill '%s' % theme.App.TEXT
      stroke '%s' % theme.App.TEXT

    // slideshow cover
    .cover__frame
      background-color '%s' % theme.Cover.BACKGROUND

    // links
    .slideshow__link
    .counter__link
      link(theme.Link.BASE, theme.Link.BASE, theme.Link.ACTIVE, theme.Link.ACTIVE)

    .cover__link
      border-color '%s' % theme.Cover.ACTIVE
      link(theme.Cover.LINK, theme.Cover.LINK, theme.Cover.ACTIVE, theme.Cover.ACTIVE)
      link_background(theme.Cover.LINK_BACKGROUND, theme.Cover.LINK_BACKGROUND, theme.Cover.LINK_BACKGROUND_ACTIVE, theme.Cover.LINK_BACKGROUND_ACTIVE)

    .prev-next__link:link .arrow-icon__path
    .prev-next__link:visited .arrow-icon__path
      stroke '%s' % theme.Controls.LINK

    .prev-next__link:active .arrow-icon__path
      stroke '%s' % theme.Controls.ACTIVE

    &[no-touch] .prev-next__link:hover .arrow-icon__path
      stroke '%s' % theme.Controls.ACTIVE

    .publication__link
      link(theme.Button.LINK, theme.Button.LINK, theme.Button.ACTIVE, theme.Button.ACTIVE)
      link_background(theme.Button.BACKGROUND, theme.Button.BACKGROUND, theme.Button.BACKGROUND_ACTIVE, theme.Button.BACKGROUND_ACTIVE)

</style>
