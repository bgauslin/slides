<template lang="pug">
  div(
    :class="[className, orientation()]",
  )
    figure.image__frame(
      :style="aspectRatio()",
    )
      preloader(
        v-if="loading",
        position="absolute",
        :options="preloaderOptions",
      )
      img.image__placeholder(
        :src="image.placeholder",
        :alt="image.alt",
      )
      img.image__hi-res(
        :ready="!loading",
        :alt="image.alt",
        :src="image.src_medium",
        :srcset="srcsetValues()",
        :sizes="sizes",
      )
</template>

<script>
import Preloader from './Preloader.vue';

export default {
  components: { Preloader },

  props: {
    className: String,
    image: {
      src_small: String,
      src_medium: String,
      src_large: String,
      alt: String,
      placeholder: String,
      width: String,
      height: String,
    },
    width: String,
    height: String,
    srcset: Object,
    sizes: String,
  },

  data() {
    return {
      loading: true,
      preloaderOptions: {
        length: 5,
        lines: 8,
        radius: 5,
        width: 2,
      },
    }
  },

  mounted() {
    this.loadImage();
  },

  methods: {
    /**
     * @return {string} The image's aspect ratio as a percentage applied to
     *     bottom padding of an inline 'style' element.
     */
    aspectRatio() {
      // If height and width are passed in as props, use those values.
      // Otherwise, get the values from the image object.
      const height = this.height ? this.height : this.image.height;
      const width = this.width ? this.width : this.image.width;

      const ratio = parseInt(height) / parseInt(width) * 100;
      return `padding: 0 0 ${ratio}%;`;
    },

    /**
     * Sets 'ready' attribute on the image after it has fully downloaded.
     */
    loadImage() {
      const fullImage = this.$el.querySelector('.image__hi-res');
      let img = new Image();
      img = fullImage;
      img.onload = () => {
        this.loading = false;
        fullImage.setAttribute('ready', '');
      };
    },

    /**
     * @return {string}
     */
    orientation() {
      if (this.image.height && this.image.width) {
        return (this.image.height > this.image.width) ? 'image--portrait' : 'image--landscape';
      }
    },

    /**
     * @return {string}
     */
    placeholder() {
      return `background: url(${this.image.placeholder}) center / contain no-repeat;`;
    },

    /**
     * @return {string}
     */
    srcsetValues() {
      return `${this.image.src_small} ${this.srcset.small}w,${this.image.src_medium} ${this.srcset.medium}w,${this.image.src_large} ${this.srcset.large}w`;
    },
  },
}
</script>
