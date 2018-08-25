<template lang="pug">
  div.view(
    data-full-height="",
  )
    app-header(
      v-if="content",
      :heading="content.title",
    )
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
import AppHeader from './AppHeader.vue';
import Controls from './Controls.vue';
import Preloader from './Preloader.vue';

import getApiDomain from '../../helpers/getApiDomain';
const apiDomain = getApiDomain();

export default {
  components: {
    AppHeader,
    Controls,
    Preloader,
  },

  data () {
    return {
      apiBaseUrl: apiDomain + '/api/v2',
      content: null,
      dataLoaded: false,
      heading: '',
      // metaDescription: null,
      showControls: false,
      siteName: document.title,
      transitionEnter: null,
      transitionLeave: null,
    }
  },

  computed: {
    direction () {
      return this.$store.getters.direction;
    },

    slideshow () {
      return this.$store.getters.slideshow;
    }
  },

  mounted () {
    this.getContent();
    // this.getMetaDescription();
  },

  watch: {
    '$route' (to, from) {      
      this.getContent();
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

    fetchJson: async function(endpoint, view) {
      const response = await fetch(endpoint);
      const data = await response.json();

      switch (view) {
        case 'cover':
          this.$store.dispatch('updateSlideshow', data);
          this.ready(data);
          break;
        case 'home':
          this.ready(data.data);
          break;
        case 'slide':          
          this.$store.dispatch('updateSlide', data);
          this.ready(data, true);
          break;
        case 'slideshow':
          this.$store.dispatch('updateSlideshow', data);
          break;
        case 'thumbs':
          this.ready(data, true);
          break;
      }
    },

    getContent () {
      this.dataLoaded = false;

      const endpointHome = `${this.apiBaseUrl}/slideshows`;
      const endpointSlideshow = `${this.apiBaseUrl}/slideshow/${this.$route.params.slideshow}`;
      const endpointThumbs = `${this.apiBaseUrl}/slideshow/thumbs/${this.$route.params.slideshow}`

      switch (this.$route.name) {

        // Slideshow cover image.
        case 'cover': {
          this.showControls = false;
          if (this.slideshow) {
            this.ready(this.slideshow);
          } else {
            this.fetchJson(endpointSlideshow, 'cover');
          }
          break;
        }

        // List of all slideshows.
        case 'home': {
          this.showControls = false;
          this.fetchJson(endpointHome, 'home');
          break;
        }

        // Individual slide from a slideshow.
        case 'slide': {
          this.showControls = true;
          this.$store.commit('updateSlug', this.$route.params.slug); // Update slug for id lookup.

          const fetchData = async () => {
            // 
            if (!this.slideshow) {
              await this.fetchJson(endpointSlideshow, 'slideshow');
            }
            this.fetchJson(`${this.apiBaseUrl}/slide/${this.$store.getters.slide.id}`, 'slide');
          }

          if (this.$store.getters.hasSlideMedia) {
            this.ready(this.$store.getters.slide, true);
          } else {
            fetchData();
          }

          break;
        }

        // Thumbnail images for a slideshow.
        // TODO: Store the thumbnails in the store.
        case 'thumbs': {
          const fetchData = async () => {
            if (!this.slideshow) {
              await this.fetchJson(endpointSlideshow, 'slideshow');
            }
            this.fetchJson(endpointThumbs, 'thumbs');
          }
          fetchData();
          break;
        }
      }
    },

    ready(data, showControls = false) {
      this.content = data;
      this.showControls = showControls;
      this.dataLoaded = true;
      document.title = this.docTitle();
    },

    // getMetaDescription() {
    //   const metaDescriptionEl = document.querySelector('meta[name="description"]');
    //   this.metaDescription = metaDescriptionEl.getAttribute('content');
    // },

    // updateMetaDescription(content) {
    //   const metaContent = (content !== null) ? content : this.metaDescription;
    //   const metaDescriptionEl = document.querySelector('meta[name="description"]');
    //   metaDescriptionEl.setAttribute('content', metaContent);
    // },

    docTitle() {
      switch(this.$route.name) {
        case 'cover':
          return `${this.content.title}`;
        case 'slide':
          return `${this.content.title} · ${this.content.slideshow.title}`;
        case 'thumbs':
          return `Thumbnails · ${this.content.title}`;
        default:
          return this.siteName;
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
  grid-template-rows HEADER_HEIGHT 1fr CONTROLS_HEIGHT

  @media BREAKPOINT_MEDIUM
    grid-template-rows HEADER_HEIGHT 1fr CONTROLS_HEIGHT_MEDIUM

  @media BREAKPOINT_LARGE
    grid-template-rows CONTROLS_HEIGHT_MEDIUM 1fr CONTROLS_HEIGHT_MEDIUM

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
