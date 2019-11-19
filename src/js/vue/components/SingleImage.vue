<template lang="pug">
  div(
    :class="classNames",
  )
    figure.image__frame(
      :style="aspectRatio",
    )
      preloader(
        v-if="loading",
        :options="preloaderOptions",
        position="absolute",
      )
      img.image__placeholder(
        :src="image.placeholder",
        :alt="image.alt",
      )
      img.image__hi-res(
        :ready="!loading",
        :alt="image.alt",
        :src="image.src_medium",
        :srcset="srcsetValues",
        :sizes="sizes",
      )
</template>

<script>
import Preloader from './Preloader.vue';

export default {
  components: { Preloader },

  props: {
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
    type: String,
  },

  data() {
    return {
      className: 'image',
      loading: true,
      preloaderOptions: {
        length: 8,
        lines: 12,
        radius: 8,
        width: 3,
      },
    }
  },

  mounted() {
    this.loadImage();
  },

  computed: {
    /** @return {string} */
    classNames() {
      return `${this.className} ${this.className}--${this.orientation} ${this.className}--${this.type}`;
    },

    /**
     * The image's aspect ratio as a percentage applied to vertical padding
     * via inline 'style' on a container element.
     * @return {string}
     */
    aspectRatio() {
      const height = this.height ? this.height : this.image.height;
      const width = this.width ? this.width : this.image.width;
      const ratio = parseInt(height, 10) / parseInt(width, 10) * 100;

      return `padding-bottom: ${ratio}%;`;
    },

    /** @return {string} */
    orientation() {
      const height = this.height ? this.height : this.image.height;
      const width = this.width ? this.width : this.image.width;
      
      return (height > width) ? 'portrait' : 'landscape';
    },

    /** @return {string} */
    placeholder() {
      return `background: url(${this.image.placeholder}) center / contain no-repeat;`;
    },

    /** @return {string} */
    sizes() {
      switch (this.type) {
        case 'preview':
          return '(min-width: 45rem) 45vw, (min-width: 60rem) 576px, 90vw';
        case 'publication':
          return '(min-width: 45rem) 33vw, (min-width: 60rem) 300px, 50vw';
        case 'multiple':
          return '(min-width: 60rem) 436px, 50vw';
        case 'single':
          switch (this.orientation) {
            case 'landscape':
              return '(min-width: 60rem) 896px, 100vw';
            case 'portrait':
              return '(min-width: 60rem) 448px, 50vw';
          }
        default:
          return '100vw';
      }
    },

    /** @return {string} */
    srcsetValues() {
      return `${this.image.src_small} ${this.srcset.small}w,${this.image.src_medium} ${this.srcset.medium}w,${this.image.src_large} ${this.srcset.large}w`;
    },
  },

  methods: {
    /**
     * Disables 'loading' flag and removes placeholder image after hi-res image
     * has downloaded.
     */
    loadImage() {
      const img = this.$el.querySelector(`.${this.className}__hi-res`);
      const placeholder = this.$el.querySelector(`.${this.className}__placeholder`);
      img.onload = () => {
        this.loading = false;
        img.addEventListener('transitionend', () => {
          if (placeholder) {
            placeholder.parentNode.removeChild(placeholder);
          }
        }, { once: true });
      };
    },
  },
}
</script>
