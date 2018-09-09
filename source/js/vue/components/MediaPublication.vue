<template lang="pug">
  div.publication
    single-image(
      v-if="publication",
      class="publication__image",
      :image="publication.image",
    )
    div.publication__details
      h2.publication__title(
        v-html="publication.title",
      )
      h3.publication__publisher(
        v-html="publication.publisher",
      )
      p.publication__date {{ publication.date }}
      a.publication__link(
        :data-url-type="publication.urlType",
        :href="publication.url",
        :title="'Read the ' + publication.publisher + ' article'",
        rel="noopener",
        target="_blank",
      ) {{ linkLabel }}
</template>

<script>
import SingleImage from './SingleImage.vue';

export default {
  components: { SingleImage },

  props: ['publication'],

  computed: {
    linkLabel () {
      return 'Read the article';
      // return (this.publication.urlType === 'link') ? 'Visit website' : 'Read article'
    }
  }
}
</script>

<style lang="stylus">
@import '../../../stylus/_config/'

.publication
  padding 0 px_to_rem(16)

  @media BREAKPOINT_MEDIUM
    align-items center
    display flex
    margin 0 px_to_rem(32)
    padding 0
  
  @media BREAKPOINT_LARGE
    margin 0

.publication__image
  margin 0
  width 50%

  @media BREAKPOINT_MEDIUM
    flex 0 0 33.33%
    width auto
  
  @media BREAKPOINT_MEDIUM
    margin 0

.publication__details
  padding 1rem 0 0

  @media BREAKPOINT_MEDIUM
    padding 2rem

.publication__title
  font-size H2_SIZE
  heading_font()
  margin 0 0 px_to_rem(4)

  @media BREAKPOINT_MEDIUM
    font-size H2_SIZE_MEDIUM

.publication__publisher
  font-size H3_SIZE
  font-weight normal
  margin 0 0 px_to_rem(6)

  @media BREAKPOINT_MEDIUM
    font-size H3_SIZE_MEDIUM

.publication__date
  font-size CAPTION_SIZE
  margin 0

  @media BREAKPOINT_MEDIUM
    font-size CAPTION_SIZE_MEDIUM

.publication__link
  align-items center
  border-radius (PUBLICATION_LINK_HEIGHT / 2)
  display inline-flex
  heading_font(600)
  font-size px_to_em(14)
  height PUBLICATION_LINK_HEIGHT
  margin px_to_rem(16) 0 0
  padding 0 px_to_rem(16)

[no-touch] .publication__link
  transition background DEFAULT_TRANSITION,
             color DEFAULT_TRANSITION

[href$="pdf"]::after
  bottom -.1em
  content '[PDF]'
  font-size 75%
  margin-left .5rem
  position relative

</style>