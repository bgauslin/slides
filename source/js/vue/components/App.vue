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
    prev-next(
      v-if="showPrevNext",
    )
</template>

<script>
import Preloader from './Preloader.vue';
import PrevNext from './PrevNext.vue';

import getApiDomain from '../../helpers/getApiDomain';
const apiDomain = getApiDomain();

export default {
  components: {
    Preloader,
    PrevNext,
  },

  data () {
    return {
      apiBaseUrl: apiDomain + '/api/v2',
      content: null,
      dataLoaded: false,
      metaDescription: null,
      showPrevNext: false,
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

        // Index of all slideshows.
        case 'home': {
          this.showPrevNext = false;
          const fetchData = async () => {
            const response = await fetch(`${this.apiBaseUrl}/slideshows`);
            const data = await response.json();
            this.content = data.data;
            this.dataLoaded = true;
          }
          fetchData();
          break;
        }

        // Cover image for a slideshow.
        case 'start': {
          this.showPrevNext = false;
          const fetchData = async () => {
            const response = await fetch(`${this.apiBaseUrl}/slideshow/${this.$route.params.slug}`);
            const data = await response.json();
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
          this.showPrevNext = true;

          // Store the current slide count for slide id lookup in the index.
          this.$store.commit('storeCurrentSlideCount', this.$route.params.count);
          this.$store.commit('storeSlug', this.$route.params.slug);

          const fetchData = async () => {
            // Fetch the index of all slide ids' and store it for subsequent lookups if we don't already have it.
            if (!this.$store.getters.hasSlidesIndex) {
              const indexResponse = await fetch(`${this.apiBaseUrl}/slideshow/ids/${this.$route.params.slug}`);
              const indexData = await indexResponse.json();
              this.$store.dispatch('storeSlidesIndex', indexData.slides);
            }

            // TODO: See if we already have the slide in the store.
            const slideId = this.$store.getters.slideId;
            const slideResponse = await fetch(`${this.apiBaseUrl}/slide/${slideId}`)
            const slideData = await slideResponse.json();

            // Set up app view when data is available.
            this.showSlide(slideData);
          }

          fetchData();
          break;
        }

        // Thumbnail images for a slideshow.
        case 'thumbs': {
          this.showPrevNext = false;
          const fetchData = async () => {
            const response = await fetch(`${this.apiBaseUrl}/slideshow/thumbs/${this.$route.params.slug}`);
            const data = await response.json();
            this.content = data;
            // TODO: updateTitle() is throwing an error here
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
      this.$store.dispatch('storeSlide', data);
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
      // Shorthand references
      const site = this.siteName;
      const slide = `Slide ${this.$route.params.count}`;
      const slideshow = this.content.slideshow.title;
      const title = this.content.title;

      switch(this.$route.name) {
        case 'start':
          document.title = `${title} · ${site}`;
          break;
        case 'slide':
          document.title = `${slide} · ${title} · ${slideshow}`;
          break;
        case 'thumbs':
          document.title = `${title} · ${slideshow}`;
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
