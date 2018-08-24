<template lang="pug">
  div.view
    preloader(
      v-if="!dataLoaded",
    )
    transition(
      @before-enter="beforeEnter",
      @after-enter="afterEnter",
      @before-leave="beforeLeave",
      @after-leave="afterLeave",
      mode="out-in",
    )
      router-view(
        v-if="dataLoaded",
        :content="content",
        :key="content.id",
      )
    controls(
      v-if="showControls",
    )
</template>

<script>
import Preloader from './Preloader.vue';
import Controls from './Controls.vue';

import getApiDomain from '../../helpers/getApiDomain';
const apiDomain = getApiDomain();

export default {
  components: {
    Controls,
    Preloader,
  },

  data () {
    return {
      apiBaseUrl: apiDomain + '/api/v2',
      content: null,
      dataLoaded: false,
      metaDescription: null,
      showControls: false,
      siteName: document.title,
      transitionEnter: null,
      transitionLeave: null,
    }
  },

  computed: {
    direction () {
      return this.$store.getters.direction;
    }
  },

  mounted () {
    this.getMetaDescription();
    this.fetchContent();
  },

  watch: {
    '$route' (to, from) {      
      this.fetchContent();
    }
  },

  methods: {
    afterEnter (el) {
      el.classList.remove(this.transitionEnter);
    },

    afterLeave (el) {
      el.classList.remove(this.transitionLeave);
    },

    // TODO: refactor 'beforeEnter' to be more concise
    beforeEnter (el) {
      switch (this.direction) {
        case 'forward':
          this.transitionEnter = 'slide-in-right';
          break;
        case 'back':
          this.transitionEnter = 'slide-in-left';
          break;
        default:
          this.transitionEnter = 'first-run';
          break;
      }
      el.classList.add(this.transitionEnter);
    },

    // TODO: refactor 'beforeLeave' to be more concise
    beforeLeave (el) {
      switch (this.direction) {
        case 'forward':
          this.transitionLeave = 'slide-out-left';
          break;
        case 'back':
          this.transitionLeave = 'slide-out-right';
          break;
        default:
          this.transitionEnter = 'first-run';
          break;
      }
      el.classList.add(this.transitionLeave);
    },

    fetchContent () {
      this.dataLoaded = false;

      switch (this.$route.name) {

        // List of all slideshows.
        case 'home': {
          this.showControls = false;

          const fetchData = async () => {
            const response = await fetch(`${this.apiBaseUrl}/slideshows`);
            const data = await response.json();
            this.content = data.data;
            this.dataLoaded = true;
          }

          fetchData();
          break;
        }

        // Slideshow cover image and base list of all slides.
        case 'cover': {
          this.showControls = false;

          const fetchData = async () => {
            const response = await fetch(`${this.apiBaseUrl}/slideshow/${this.$route.params.slideshow}`);
            const data = await response.json();
            this.$store.dispatch('updateSlideshow', data);
            this.content = data;
            // TODO: updateTitle() is throwing an error here
            // this.updateTitle();
            this.dataLoaded = true;
          }

          fetchData();
          break;
        }

        // Individual slide from a slideshow.
        case 'slide': {
          // Update slug for id lookup.
          this.$store.commit('updateSlug', this.$route.params.slug);

          // Show controls.
          this.showControls = true;

          const fetchData = async () => {
            // If we don't already have the slideshow, fetch it for slide id lookup.
            if (!this.$store.getters.hasSlideshow) {
              let response = await fetch(`${this.apiBaseUrl}/slideshow/${this.$route.params.slideshow}`);
              let data = await response.json();
              this.$store.dispatch('updateSlideshow', data);
            }

            // TODO: See if we already have the slide in the store.
            const slide = this.$store.getters.slide;
            let response = await fetch(`${this.apiBaseUrl}/slide/${slide.id}`)
            let data = await response.json();

            // Set up app view when data is available.
            this.showSlide(data);
          }

          fetchData();
          break;
        }

        // Thumbnail images for a slideshow.
        case 'thumbs': {
          this.showControls = true;

          const fetchData = async () => {
            // Fetch the index of all slide ids' and store it for subsequent lookups if we don't already have it.
            if (!this.$store.getters.hasSlideshow) {
              const response = await fetch(`${this.apiBaseUrl}/slideshow/${this.$route.params.slideshow}`);
              const data = await response.json();
              this.$store.dispatch('updateSlideshow', data);
            }

            const response = await fetch(`${this.apiBaseUrl}/slideshow/thumbs/${this.$route.params.slideshow}`);
            const data = await response.json();
            this.content = data;
            // this.updateTitle();
            this.dataLoaded = true;
          }

          fetchData();
          break;
        }
      }
    },

    showSlide(data) {
      this.content = data;
      // this.$store.dispatch('storeSlide', data);
      this.updateTitle();
      this.dataLoaded = true;
    },

    getMetaDescription() {
      const metaDescriptionEl = document.querySelector('meta[name="description"]');
      this.metaDescription = metaDescriptionEl.getAttribute('content');
    },

    updateMetaDescription(content) {
      const metaContent = (content !== null) ? content : this.metaDescription;
      const metaDescriptionEl = document.querySelector('meta[name="description"]');
      metaDescriptionEl.setAttribute('content', metaContent);
    },

    updateTitle() {
      // Define shorthand references.
      const site = this.siteName;
      const slideshow = this.content.slideshow.title;
      const title = this.content.title;

      // Set the title based on the route.
      switch(this.$route.name) {
        case 'cover':
          document.title = `${title} · ${site}`;
          break;
        case 'slide':
          document.title = `${title} · ${slideshow}`;
          break;
        case 'thumbs':
          document.title = `Thumbnails · ${title} · ${slideshow}`;
          break;
        default:
          document.title = site;
      }
    },
  },
}
</script>

<style lang="stylus">
@import '../../../stylus/_config/'

.view
  display grid
  grid-template-columns 1fr
  grid-template-rows 1fr PREV_NEXT_SIZE // min-content (?)
  min-height 100%

  @media BREAKPOINT_MEDIUM
    grid-template-rows 1fr PREV_NEXT_SIZE_MEDIUM

  @media BREAKPOINT_LARGE
    grid-template-rows PREV_NEXT_SIZE_MEDIUM 1fr PREV_NEXT_SIZE_MEDIUM

.slide-in-left
  animation slideInLeft SLIDE_TRANSITION

.slide-in-right
  animation slideInRight SLIDE_TRANSITION

.slide-out-left
  animation slideOutLeft SLIDE_TRANSITION

.slide-out-right
  animation slideOutRight SLIDE_TRANSITION

.first-run
  animation fadeIn SLIDE_TRANSITION

@media BREAKPOINT_MEDIUM
  .slide-in-left
  .slide-in-right
  .slide-out-left
  .slide-out-right
  .first-run
    animation-duration SLIDE_TRANSITION_MEDIUM

</style>
