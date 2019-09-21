<template lang="pug">
  div(
    :class="[className, orientation(image)]",
  )
    figure.image__frame(
      :style="aspectRatio(image)",
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
    height: String, // optional
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
     * @param {!Object} image
     * @return {string} The image's aspect ratio as a percentage applied to
     *     bottom padding of an inline 'style' element.
     */
    aspectRatio(image) {
      // If height and width are passed in as props, use those values.
      // Otherwise, get the values from the image object.
      const height = this.height ? this.height : image.height;
      const width = this.width ? this.width : image.width;

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
     * @param {!Object} image
     * @return {string}
     */
    orientation(image) {
      if (image.height && image.width) {
        return (image.height > image.width) ? 'image--portrait' : 'image--landscape';
      }
    },

    /**
     * @param {!Object} image
     * @return {string}
     */
    placeholder(image) {
      return `background: url(${image.placeholder}) center / contain no-repeat;`;
    },

    // TODO(srcset): Restore 'srcset' and 'sizes' attributes.
    /**
     * @param {!Object} image
     * @return {string}
     */
    srcset(image) {
      return `${image.src_small} ${size.small}w,${image.src_large} ${size.large}w`;
    },
  },
}
</script>
