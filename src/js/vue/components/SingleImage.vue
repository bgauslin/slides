<template lang="pug">
  div(
    :class="classNames"
  )
    figure(
      :class="['image__frame', 'image__frame--' + view]"
      :ready="!loading"
      :style="aspectRatio"
    )
      preload-spinner(
        v-if="loading"
      )
      img(
        :class="['img', 'img--hi-res', 'img--' + view]"
        :alt="image.alt"
        :src="image.src_medium"
        :srcset="srcsetValues"
        :sizes="sizes"
        :ready="!loading"
      )
      img(
        :class="['img', 'img--placeholder', 'img--' + view]"
        :src="image.placeholder"
        alt=""
      )
</template>

<script>
import PreloadSpinner from './PreloadSpinner.vue';

export default {
  components: { PreloadSpinner },

  props: {
    image: {
      alt: String,
      width: String,
      height: String,
      src_small: String,
      src_medium: String,
      src_large: String,
      placeholder: String,
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
      selectorHiRes: '.img--hi-res',
      selectorPlaceholder: '.img--placeholder',
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
              return '(min-width: 60rem) 600px, 67vw';
          }
        default:
          return '100vw';
      }
    },

    /** @return {string} */
    srcsetValues() {
      return `${this.image.src_small} ${this.srcset.small}w,${this.image.src_medium} ${this.srcset.medium}w,${this.image.src_large} ${this.srcset.large}w`;
    },

    /** @return {string} */
    view() {
      return this.$route.name;
    }
  },

  methods: {
    /**
     * Disables 'loading' flag and removes placeholder image after hi-res image
     * has downloaded.
     */
    loadImage() {
      const img = this.$el.querySelector(this.selectorHiRes);
      img.onload = () => {
        this.loading = false;
        img.addEventListener('transitionend', () => {
          const placeholder = this.$el.querySelector(this.selectorPlaceholder);
          if (placeholder) {
            // TODO(#34): Remove 'transitionend' listener and 'ready' attribute.
            placeholder.setAttribute('ready', '');
            placeholder.addEventListener('transitionend', () => {
              placeholder.parentNode.removeChild(placeholder);
            }, { once: true });
          }
        }, { once: true });
      };
    },
  },
}
</script>
