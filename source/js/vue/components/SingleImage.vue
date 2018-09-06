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
      )
      img.image__hi-res(
        :ready="!loading",
        :alt="image.alt",
        :src="image.medium.src",
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

  data () {
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

  mounted () {
    this.loadImage();
  },

  methods: {
    aspectRatio(image) {
      const ratio = image.large.height / image.large.width * 100;
      return `padding: 0 0 ${ratio}%;`;
    },

    // TODO: Coordinate 'this.image.SIZE.src' with image from srcset that is actually loaded.
    // Fade-in works just fine with just 'src' - not so much with 'srcset'.
    loadImage () {
      const target = this.$el.querySelector('.image__hi-res');
      const img = new Image();
      img.src = this.image.medium.src; 
      img.onload = () => {
        this.loading = false;
        target.setAttribute('ready', '');
      };
    },

    orientation (image) {
      return (image.large.height > image.large.width) ? 'portrait' : 'landscape';
    },

    placeholder (image) {
      return `background: url(${image.placeholder}) center center / contain no-repeat;`;
    },

    srcset (image) {
      return `${image.medium.src} ${image.medium.width}w, ${image.large.src} ${image.large.width}w`;
    },
  },
}
</script>

<style lang="stylus">
@import '../../../stylus/_config/'

// Example: /shotgun/walk-in-closet
.image--portrait
  width 50%
  margin 0 auto

.image__frame
  overflow hidden
  position relative

.image__placeholder
.image__hi-res
  position absolute

.image__placeholder
  filter blur(5px)
  z-index -1

.image__hi-res
  opacity 0
  transition opacity IMAGE_TRANSITION

.image__hi-res[ready]
  opacity 1

// Example: /shotgun/bedroom-to-laundry
.image--multiple
  padding IMAGE_GAP 0 0 0

  @media BREAKPOINT_MEDIUM
    flex 0 0 50%
    padding IMAGE_GAP_MEDIUM 0 0 IMAGE_GAP_MEDIUM

</style>