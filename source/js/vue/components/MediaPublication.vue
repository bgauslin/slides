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
