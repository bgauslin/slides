<template lang="pug">
  div(
    :class="['image', 'image--' + orientation(image), className]",
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
        :src="image.medium.src",
        :srcset="srcset(image)",
        sizes="100vw",
      )
</template>

<script>
import Preloader from './Preloader.vue';

export default {
  components: { Preloader },

  props: [
    'className',
    'image',
  ],

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
      const ratio = image.large.height / image.large.width * 100;
      return `padding: 0 0 ${ratio}%;`;
    },

    /**
     * @description Sets 'ready' attribute on the image after it has fully
     *     downloaded.
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
      return (image.large.height > image.large.width) ? 'portrait' : 'landscape';
    },

    /**
     * @param {!Object} image
     * @return {string}
     */
    placeholder(image) {
      return `background: url(${image.placeholder}) center / contain no-repeat;`;
    },

    /**
     * @param {!Object} image
     * @return {string}
     */
    srcset(image) {
      return `${image.medium.src} ${image.medium.width}w,${image.large.src} ${image.large.width}w`;
    },
  },
}
</script>
