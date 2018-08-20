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
  margin 1rem

  @media BREAKPOINT_MEDIUM
    align-items center
    display flex
    margin 0 auto
    padding 0 4rem
    max-width 60rem // TODO: use constant here

.image.publication__image
  margin-left 0
  width 50%

  @media BREAKPOINT_MEDIUM
    flex 0 0 33.3333%
    margin-left 2rem
    width auto

.publication__link
  display block

  @media BREAKPOINT_MEDIUM
    padding 2rem

.publication__link > *
  color WHITE

.publication__title
  font-size H2_BASE
  heading_font()
  margin 0 0 .5em

  @media BREAKPOINT_MEDIUM
    font-size H2_MEDIUM

.publication__publisher
  font-size H3_BASE
  font-weight normal
  margin 0 0 .5em

  @media BREAKPOINT_MEDIUM
    font-size H3_MEDIUM

.publication__date
  font-size CAPTION_BASE
  margin .7rem 0 0

  @media BREAKPOINT_MEDIUM
    font-size CAPTION_MEDIUM

</style>