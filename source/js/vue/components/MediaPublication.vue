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
      ) Read the article
</template>

<script>
import SingleImage from './SingleImage.vue';

export default {
  components: { SingleImage },
  props: ['publication'],
}
</script>

<style lang="stylus">
@import '../../../stylus/config/'

.publication
  padding 0 px_to_rem(16)

  @media Breakpoint.MEDIUM
    align-items center
    display flex
    margin 0 px_to_rem(32)
    padding 0
  
  @media Breakpoint.LARGE
    margin 0

.publication__image
  margin 0
  width 50%

  @media Breakpoint.MEDIUM
    flex 0 0 33.33%
    width auto
  
  @media Breakpoint.MEDIUM
    margin 0

.publication__details
  padding 1rem 0 0

  @media Breakpoint.MEDIUM
    padding 2rem

.publication__title
  font-size '%s' % FontSize.Base.H2
  heading_font()
  margin 0 0 px_to_rem(4)

  @media Breakpoint.MEDIUM
    font-size '%s' % FontSize.Medium.H2

.publication__publisher
  font-size '%s' % FontSize.Base.H3
  font-weight normal
  margin 0 0 px_to_rem(6)

  @media Breakpoint.MEDIUM
    font-size '%s' % FontSize.Medium.H3

.publication__date
  font-size '%s' % FontSize.Base.CAPTION
  margin 0

  @media Breakpoint.MEDIUM
    font-size '%s' % FontSize.Medium.CAPTION

.publication__link
  align-items center
  border-radius '%s' % (Layout.LinkHeights.PUBLICATION / 2)
  display inline-flex
  heading_font(600)
  font-size px_to_em(14)
  height '%s' % Layout.LinkHeights.PUBLICATION
  margin px_to_rem(16) 0 0
  padding 0 px_to_rem(16)

[no-touch] .publication__link
  transition 'background %s, color %s' % (Transition.DEFAULT Transition.DEFAULT)

[href$="pdf"]::after
  bottom -.1em
  content '[PDF]'
  font-size 75%
  margin-left .5rem
  position relative

</style>