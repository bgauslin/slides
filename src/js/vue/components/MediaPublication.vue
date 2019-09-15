<template lang="pug">
  div.publication
    template(
      v-if="publication.images",
      v-for="image in publication.images",
    )
      single-image(
        class="publication__image",
        :image="image",
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
        :href="publicationUrl",
        :title="'Read the ' + publication.publisher + ' article'",
        :url-type="publicationUrlType",
        rel="noopener",
        target="_blank",
      ) Read the article
</template>

<script>
import SingleImage from './SingleImage.vue';

export default {
  components: { SingleImage },

  props: {
    publication: {
      date: String,
      images: Array,
      link: Array,
      publisher: String,
      title: String,
    }
  },

  computed: {
    /**
     * Returns a PDF link if there's a file; typical link otherwise.
     * @return {string}
     */
    publicationUrl() {
      return this.publication.link[0].file
          ? this.publication.link[0].file[0].url
          : this.publication.link[0].url;
    },

    /**
     * Returns url-type attribute's value depending on whether it's a file
     * or a typical link.
     * @return {string}
     */
    publicationUrlType() {
      return this.publication.link[0].file ? 'download' : 'link';
    },
  }
}
</script>
