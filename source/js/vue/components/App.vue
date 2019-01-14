<template lang="pug">
  div.view(
    data-full-height="",
  )
    app-header(
      :view="view",
    )
    preloader(
      v-if="!app.dataLoaded",
      position="fixed",
      :options="preloaderOptions",
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
      preloaderOptions: {
        length: 8,
        lines: 12,
        radius: 8,
        width: 3,
      },
      transition: {
        enter: null,
        leave: null,
      },
    }
  },

  computed: {
    /** @return {Object} */
    currentSlide() {
      return this.$store.getters.slide;
    },
    
    /** @return {string} */
    direction() {
      return this.$store.getters.direction;
    },

    /** @return {boolean} */
    hasSlideMedia() {
      return this.$store.getters.hasSlideMedia;
    },

    /** @return {Object} */
    slideshow() {
      return this.$store.getters.slideshow;
    },

    /** @return {Object}  */
    thumbs() {
      return this.$store.getters.thumbs;
    },

    /** @return {string} */
    view() {
      return this.$route.name;
    }
  },

  mounted() {
    this.getContent();
  },

  watch: {
    '$route' (to, from) {      
      this.getContent();
    }
  },

  methods: {
    /**
     * @param {!Element} element - DOM element to remove a CSS class from after
     * entering a new route.
     */
    afterEnter(element) {
      element.classList.remove(this.transition.enter);
    },

    /**
     * @param {!Element} element - DOM element to remove a CSS class from after
     * leaving the current route.
     */
    afterLeave(element) {
      element.classList.remove(this.transition.leave);
    },

    /**
     * @param {!Element} element - DOM element to add a CSS class to before
     * entering a new route.
     */
    beforeEnter(element) {
      element.classList.add(this.transitionEnterClass());
    },

    /**
     * @param {!Element} element - DOM element to remove a CSS class from before
     * leaving the current route.
     */
    beforeLeave(element) {
      element.classList.add(this.transitionLeaveClass());
    },

    /**
     * @return {string} Formats the title based on the current route.
     */
    docTitle() {
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

    /**
     * Sets the API endpoint depending on the route/view.
     * @param {!string} view - Route name.
     * @return {string}
     */
    endpoint(view) {
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

    /**
     * Fetches API data from an endpoint (which is based on the view/route),
     * then stores that data to avoid further (redundant) API calls.
     * @param {!string} endpoint - API endpoint.
     * @param {!string} view - Which route/view.
     */
    fetchJson: async function(endpoint, view) {
      const response = await fetch(endpoint);
      const data = await response.json();

      // NOTE: All store actions are async via 'dispatch' (instead of 'commit')
      // since we usually need to hit more than one endpoint on first run.
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
          this.$store.dispatch('updateThumbs', data);
          this.ready(data);
          break;
      }
    },

    /**
     * @description Sets the loaded flag to false and calls a method based
     * on the current route.
     */
    getContent() {
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

    /**
     * @description Fetches API data for the 'cover' route/view.
     */
    getDataCover() {
      this.app.showControls = false;
      if (this.slideshow) {
        this.ready(this.slideshow);
      } else {
        this.fetchJson(this.endpoint('slideshow'), 'cover');
      }
    },

    /**
     * @description Fetches API data for the 'home' route/view.
     */
    getDataHome() {
      this.app.showControls = false;
      this.fetchJson(this.endpoint('home'), 'home');
    },

    /**
     * @description Fetches API data for the 'slide' route/view and fetches
     * full 'slideshow' data if it hasn't been fetched and stored yet.
     * @async
     */
    getDataSlide() {
      this.app.showControls = true;

       // Set slug for slide id lookup.
      this.$store.commit('updateSlug', this.$route.params.slug);

      const fetchData = async () => {
        // Get the slideshow first, then the slide (or the slide won't have
        // a slot to get stored in).
        if (!this.slideshow) {
          await this.fetchJson(this.endpoint('slideshow'), 'slideshow');
        }
        // Wait until we've confirmed that the slide doesn't have media before
        // fetching the full slide and storing its media.
        if (!this.hasSlideMedia) {
          await this.fetchJson(this.endpoint('slide'), 'slide');
        }
      }

      if (this.hasSlideMedia) {
        this.ready(this.currentSlide);
      } else {
        fetchData();
      }
    },

    /**
     * @description Fetches API data for the 'thumbs' route/view and fetches
     * full 'slideshow' data if it hasn't been fetched and stored yet.
     * @async
     */
    getDataThumbs() {
      this.app.showControls = false;

      const fetchData = async () => {
        await this.fetchJson(this.endpoint('thumbs'), 'thumbs');

        if (!this.slideshow) {
          await this.fetchJson(this.endpoint('slideshow'), 'slideshow');
        }
      }

      if (this.thumbs) {
        this.ready(this.thumbs);
      } else {
        fetchData();
      }
    },

    /**
     * Passes API data as a prop, sets loaded flag to true, and updates the
     * document title.
     * @param {Object} data
     */
    ready(data) {
      this.app.content = data;
      this.app.dataLoaded = true;
      document.title = this.docTitle();
    },

    /**
     * @return {string} The CSS class to apply on transition's 'enter' tick
     * based on the current 'direction'.
     */
    transitionEnterClass() {
      switch (this.direction) {
        case 'forward':
          return 'slide-in-right';
        case 'back':
          return 'slide-in-left';
        default:
          return 'first-run';
      }
    },

    /**
     * @return {string} The CSS class to apply on transition's 'leave' tick
     * based on the current 'direction'.
     */
    transitionLeaveClass() {
      switch (this.direction) {
        case 'forward':
          return 'slide-out-left';
        case 'back':
          return 'slide-out-right';
        default:
          return 'first-run';
      }
    },
  },
}
</script>

<style lang="stylus">
@import '../../../stylus/config/'

@media Breakpoints.MEDIUM
  .view
    display grid
    grid-template-columns minmax(auto, 1fr)
    grid-template-rows '%s 1fr %s' % (Layout.HeaderHeights.MEDIUM Layout.ControlsHeights.MEDIUM)

.first-run
  animation-name fadeIn

.slide-in-left
  animation-name slideInLeft

.slide-in-right
  animation-name slideInRight

.slide-out-left
  animation-name slideOutLeft

.slide-out-right
  animation-name slideOutRight

.first-run
.slide-in-left
.slide-in-right
.slide-out-left
.slide-out-right
  animation-duration '%s' % Transitions.SLIDE
  animation-timing-function ease-out

  @media Breakpoints.LARGE
    animation-duration '%s' % Transitions.SLIDE_LARGE

</style>
