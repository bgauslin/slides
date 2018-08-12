<template lang="pug">
  div.site
    div.content
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
          key="foo",
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
      apiUrl: apiDomain + '/api/v2',
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
          fetch(`${this.apiUrl}/slideshows`)
            .then(response => response.json())
            .then(data => {
              this.content = data.data;
              this.dataLoaded = true;
            });
          break;
        }

        // Cover image for a slideshow.
        case 'start': {
          this.showPrevNext = false;
          fetch(`${this.apiUrl}/slideshow/${this.$route.params.slug}`)
            .then(response => response.json())
            .then(data => {
              this.content = data;
              this.updateTitle(this.content.title); // TODO: update param
              this.dataLoaded = true;
            });
          break;
        }

        // TODO: Refactor with async/await and functions.
        // Individual slide from a slideshow.
        case 'slide': {
          this.showPrevNext = true;

          // Store the current slide count for slide id lookup in the index.
          this.$store.dispatch('storeCurrentSlideCount', this.$route.params.count);
          this.$store.commit('storeSlug', this.$route.params.slug);

          // Get the slides index first, then get the slide.
          // TODO: refactor with async/await...
          fetch(`${this.apiUrl}/slideshow/ids/${this.$route.params.slug}`)
            .then(response => response.json())
            .then(data => {
              this.$store.dispatch('storeSlidesIndex', data.slides);
            })
            .then(() => {
              const slideId = this.$store.getters.slideId;
              // TODO: If slide data already store, get that instead of hitting the endpoint.
              fetch(`${this.apiUrl}/slide/${slideId}`)
                .then(response => response.json())
                .then(data => {
                  this.content = data;
                  this.$store.dispatch('storeSlide', data);
                  this.updateTitle(this.content.title); // TODO: update param
                  this.dataLoaded = true;
                })
            });

          break;
        }
      }
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

    updateTitle(pageTitle) {
      document.title = (pageTitle !== null) ? `${pageTitle} · ${this.siteName}` : this.siteName;
    },
  },
}
</script>

<style lang="stylus">
@import '../../../stylus/_config/'

TRANSITION = .2s ease-out
TRANSITION_MEDIUM = .35s

.slide-in-left
  animation slideInLeft TRANSITION

.slide-in-right
  animation slideInRight TRANSITION

.slide-out-left
  animation slideOutLeft TRANSITION

.slide-out-right
  animation slideOutRight TRANSITION

.first-run
  animation fadeIn TRANSITION

@media BREAKPOINT_MEDIUM
  .slide-in-left
  .slide-in-right
  .slide-out-left
  .slide-out-right
  .first-run
    animation-duration TRANSITION_MEDIUM

</style>
