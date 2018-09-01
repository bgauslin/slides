<template lang="pug">
  div.view(
    data-full-height="",
  )
    app-header(
      :view="view",
    )
    preloader(
      v-if="!app.dataLoaded",
    )
    transition(
      @before-enter="beforeEnter",
      @after-enter="afterEnter",
      @before-leave="beforeLeave",
      @after-leave="afterLeave",
      mode="out-in",
    )
      router-view(
        v-if="app.dataLoaded",
        :content="app.content",
        :key="app.content.id",
      )
    controls(
      v-if="app.showControls",
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
      app: {
        content: null,
        dataLoaded: false,
        showControls: false,
      },
      meta: {
        description: null,
        title: document.title,
      },
      transition: {
        enter: null,
        leave: null,
      },
    }
  },

  computed: {
    currentSlide () {
      return this.$store.getters.slide;
    },

    direction () {
      return this.$store.getters.direction;
    },

    hasSlideMedia () {
      return this.$store.getters.hasSlideMedia;
    },

    slideshow () {
      return this.$store.getters.slideshow;
    },

    view () {
      return this.$route.name;
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
      el.classList.remove(this.transition.enter);
    },

    afterLeave (el) {
      el.classList.remove(this.transition.leave);
    },

    beforeEnter (el) {
      this.transition.enter = this.transitionEnterClass();
      el.classList.add(this.transition.enter);
    },

    beforeLeave (el) {
      this.transition.leave = this.transitionLeaveClass();
      el.classList.add(this.transition.leave);
    },

    docTitle () {
      switch(this.$route.name) {
        case 'cover':
          return `${this.app.content.title}`;
        case 'slide':
          return `${this.app.content.title} · ${this.app.content.slideshow.title}`;
        case 'thumbs':
          return `Thumbnails · ${this.app.content.title}`;
        default:
          return this.meta.title;
      }
    },

    endpoint (view) {
      switch (view) {
        case 'home':
          return `${this.apiBaseUrl}/slideshows`;
        case 'slide':
          return `${this.apiBaseUrl}/slide/${this.currentSlide.id}`;
        case 'slideshow':
          return `${this.apiBaseUrl}/slideshow/${this.$route.params.slideshow}`;
        case 'thumbs':
          return `${this.apiBaseUrl}/slideshow/thumbs/${this.$route.params.slideshow}`;
      }
    },

    fetchJson: async function (endpoint, view) {
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
          this.ready(data);
          break;
        case 'slideshow':
          this.$store.dispatch('updateSlideshow', data);
          break;
        case 'thumbs':
          this.ready(data);
          break;
      }
    },

    getContent () {
      this.app.dataLoaded = false;

      switch (this.$route.name) {
        case 'cover':
          this.getDataCover();
          break;
        case 'home':
          this.getDataHome();
          break;
        case 'slide':
          this.getDataSlide();
          break;
        case 'thumbs':
          this.getDataThumbs();
          break;
      }
    },

    getDataCover () {
      this.app.showControls = false;
      if (this.slideshow) {
        this.ready(this.slideshow);
      } else {
        this.fetchJson(this.endpoint('slideshow'), 'cover');
      }
    },

    getDataHome () {
      this.app.showControls = false;
      this.fetchJson(this.endpoint('home'), 'home');
    },

    getDataSlide () {
      this.app.showControls = true;
      this.$store.commit('updateSlug', this.$route.params.slug); // Set slug for slide id lookup.


      const fetchData = async () => {
        if (!this.slideshow) {
          await this.fetchJson(this.endpoint('slideshow'), 'slideshow');
        }
        await this.fetchJson(this.endpoint('slide'), 'slide');
      }

      if (this.hasSlideMedia) {
        this.ready(this.currentSlide);
      } else {
        fetchData();
      }
    },

    getDataThumbs () {
      this.app.showControls = false;

      // TODO: Store the thumbnails in the store.
      const fetchData = async () => {
        if (!this.slideshow) {
          await this.fetchJson(this.endpoint('slideshow'), 'slideshow');
        }
        await this.fetchJson(this.endpoint('thumbs'), 'thumbs');
      }
      fetchData();
    },

    ready(data) {
      this.app.content = data;
      this.app.dataLoaded = true;
      document.title = this.docTitle();
    },

    transitionEnterClass () {
      switch (this.direction) {
        case 'forward':
          return 'slide-in-right';
        case 'back':
          return 'slide-in-left';
        default:
          return 'first-run';
      }
    },

    transitionLeaveClass () {
      switch (this.direction) {
        case 'forward':
          return 'slide-out-left';
        case 'back':
          return 'slide-out-right';
        default:
          return 'first-run';
      }
    },

    // getMetaDescription() {
    //   const metaDescriptionEl = document.querySelector('meta[name="description"]');
    //   this.meta.description = metaDescriptionEl.getAttribute('content');
    // },

    // updateMetaDescription(content) {
    //   const metaContent = (content !== null) ? content : this.meta.description;
    //   const metaDescriptionEl = document.querySelector('meta[name="description"]');
    //   metaDescriptionEl.setAttribute('content', metaContent);
    // },
  },
}
</script>

<style lang="stylus">
@import '../../../stylus/_config/'

@media BREAKPOINT_MEDIUM
  .view
    display grid
    grid-template-columns minmax(auto, 1fr)
    grid-template-rows HEADER_HEIGHT_MEDIUM 1fr CONTROLS_HEIGHT_MEDIUM

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

</style>
