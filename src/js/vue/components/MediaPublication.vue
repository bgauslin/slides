<template lang="pug">
  div.publication
    template(
      v-if="publication.images",
      v-for="image in publication.images",
    )
      single-image(
        class="publication__image",
        :image="image",
        :srcset="srcset",
        type="publication",
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
        v-if="publicationUrl",
        :href="publicationUrl",
        :title="'Read the ' + publication.publisher + ' article'",
        :url-type="publicationUrlType",
        rel="noopener",
        target="_blank",
      ) Read the article
</template>

<script>
import { PublicationWidth } from '../../queries/imageSizing';
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

  data() {
    return {
      srcset: {
        small: PublicationWidth.SMALL,
        medium: PublicationWidth.MEDIUM,
        large: PublicationWidth.LARGE,
      },
    }
  },

  computed: {
    /**
     * PDF link if there's a file; typical link otherwise.
     * @return {string}
     */
    publicationUrl() {
      const link = this.publication.link[0];
      if (link) {
        if (link.file && link.file[0].url) {
          return link.file[0].url;
        } else  if (link.url) {
          return link.url;
        }
      }
      return;
    },

    /**
     * Value for 'url-type' attribute depending on whether it's a file or a 
     * typical link.
     * @return {string}
     */
    publicationUrlType() {
      const link = this.publication.link[0];
      return link.file ? 'download' : 'link';
    },
  }
}
</script>
