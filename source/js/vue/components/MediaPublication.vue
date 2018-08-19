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
      h2.publication__title {{ publication.title }}
      h3.publication__publisher {{ publication.publisher }}
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
  align-items center
  display flex
  margin 0 auto
  max-width 48rem // TODO: use a constant here

.publication__image
  flex 0 0 50%

.publication__link
  margin-left 2rem

.publication__link > *
  color WHITE

// .publication__title

// .publication__publisher

// .publication__date

</style>
