<template lang="pug">
  div.publication
    single-image(
      v-if="publication",
      class="publication__image",
      :image="publication.image",
    )
    a.publication__link(
      :href="publication.url",
    )
      h2.publication__title(
        v-html="publication.title",
      )
      h3.publication__publisher(
        v-html="publication.publisher",
      )
      p.publication__date {{ publication.date }}
</template>

<script>
import SingleImage from './SingleImage.vue';

export default {
  components: { SingleImage },
  props: ['publication'],
}
</script>

<style lang="stylus">
@import '../../../stylus/_config/'

.publication
  padding px_to_rem(16)

  @media BREAKPOINT_MEDIUM
    align-items center
    border-radius 2px
    display flex
    margin 0 px_to_rem(48)
    padding px_to_rem(24)
  
  @media BREAKPOINT_LARGE
    margin 0

.publication__image
  margin 0
  width 50%

  @media BREAKPOINT_MEDIUM
    flex 0 0 33.3333%
    width auto
  
  @media BREAKPOINT_MEDIUM
    margin 0

.publication__image .image__frame
  overflow visible
  shadow(2)

.publication__link
  color DARK_GREY
  display block
  padding 1rem 0 0

  @media BREAKPOINT_MEDIUM
    padding 2rem

.publication__title
  font-size H2_SIZE
  heading_font()
  margin 0 0 .5em

  @media BREAKPOINT_MEDIUM
    font-size H2_SIZE_MEDIUM

.publication__publisher
  font-size H3_SIZE
  font-weight normal
  margin 0 0 .5em

  @media BREAKPOINT_MEDIUM
    font-size H3_SIZE_MEDIUM

.publication__date
  font-size CAPTION_SIZE
  margin .7rem 0 0

  @media BREAKPOINT_MEDIUM
    font-size CAPTION_SIZE_MEDIUM

</style>