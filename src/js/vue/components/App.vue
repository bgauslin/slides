<template lang="pug">
  div.app
    app-header(
      v-if="!notFound",
      :view="view",
    )
    preloader(
      v-if="!dataLoaded",
      position="fixed",
      :options="preloaderOptions",
    )
    transition(
      v-if="content && !notFound",
      @before-enter="beforeEnter",
      @after-enter="afterEnter",
      @before-leave="beforeLeave",
      @after-leave="afterLeave",
      mode="out-in",
    )
      router-view(
        v-if="dataLoaded",
        :content="content",
        :key="key",
      )
    not-found(
      v-if="notFound"
    )
    controls(
      v-if="content && showControls && !notFound",
    )
    app-footer(
      v-if="!notFound",
    )
</template>

<script>
import { mapGetters } from 'vuex';
import { Query } from '../../queries/index';
import AppFooter from './AppFooter.vue';
import AppHeader from './AppHeader.vue';
import Controls from './Controls.vue';
import NotFound from'./NotFound.vue';
import Preloader from './Preloader.vue';

export default {
  components: {
    AppFooter,
    AppHeader,
    Controls,
    NotFound,
    Preloader,
  },

  data() {
    return {
      content: null,
      dataLoaded: false,
      key: null,
      notFound: false,
      showControls: false,
      preloaderOptions: {
        length: 8,
        lines: 12,
        radius: 8,
        width: 3,
      },
    }
  },

  computed: {
    ...mapGetters([
      'direction',
      'hasSlideMedia',
      'slide',
      'slideshow',
      'thumbs',
    ]),

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
     * Sets the loaded flag to false and calls a data-fetching method based on
     * the current route.
     */
    getContent() {
      this.dataLoaded = false;
      this.showControls = (this.$route.name === 'slide');

      switch (this.$route.name) {
        case 'home':
          this.getDataHome();
          break;
        case 'cover':
          this.getDataCover();
          break;
        case 'slide':
          this.getDataSlide();
          break;
        case 'thumbs':
          this.getDataThumbs();
          break;
        case '404':
          this.ready(null);
          break;
      }
    },

    /**
     * Fetches data for the 'home' route/view.
     * @async
     */
    async getDataHome() {
      const content = await this.fetchJson('home');
      this.ready(content);
    },

    /**
     * Fetches data for the 'cover' route/view.
     * @async
     */
    async getDataCover() {
      if (this.slideshow) {
        this.ready(this.slideshow);
      } else {
        const content = await this.fetchJson('cover');
        this.ready(content);
      }
    },

    /**
     * Fetches data for the 'slide' route/view and fetches full 'slideshow'
     * data if it hasn't been fetched and stored yet.
     * @async
     */
    async getDataSlide() {
       // Set slug for slide lookup.
      this.$store.commit('updateSlug', this.$route.params.slug);

      const fetchData = async () => {
        // Get the slideshow first, then the slide. Otherwise, the slide won't
        // have a slot to be stored in.
        if (!this.slideshow) {
          await this.fetchJson('slideshow');
        }

        // Wait until we've confirmed that the slide doesn't have media before
        // fetching the full slide and storing its media.
        if (!this.hasSlideMedia) {
          const content = await this.fetchJson('slide');
          this.ready(content);
        }
      }

      if (this.hasSlideMedia) {
        this.ready(this.slide);
      } else {
        fetchData();
      }
    },

    /**
     * Fetches data for the 'thumbs' route/view and fetches full 'slideshow'
     * data if it hasn't been fetched and stored yet.
     * @async
     */
    async getDataThumbs() {
      const fetchData = async () => {
        if (!this.slideshow) {
          await this.fetchJson('slideshow');
        }
        const content = await this.fetchJson('thumbs');
        this.ready(content);
      }

      if (this.thumbs) {
        this.ready(this.thumbs);
      } else {
        fetchData();
      }
    },

    /**
     * Sets Graph QL query depending on the route/view.
     * @param {!string} view - Route name.
     * @return {string}
     */
    getQuery(view) {
      // GraphQL returns the first slide if there's no ID, so return nothing
      // instead.
      if (view === 'slide' && !this.slide) {
        return;
      }

      switch (view) {
        case 'home':
          return {
            name: Query.allSlideshows
          };
        case 'cover':
        case 'slideshow':
          return {
            name: Query.slideshow,
            slideshow: this.$route.params.slideshow,
          };
        case 'slide':
          return {
            name: Query.slide,
            id: this.slide.id
          };
        case 'thumbs':
          return {
            name: Query.thumbs,
            slideshow: this.$route.params.slideshow,
          };
      }
    },

    /**
     * Fetches API data from an endpoint based on the route, then stores it to
     * avoid redundant API calls.
     * @param {!string} view - Which route/view.
     * @async
     */
    async fetchJson(view) {
      const endpoint = (process.env.NODE_ENV === 'production') ?
          process.env.GRAPHQL_PROD : process.env.GRAPHQL_DEV;

      const query = this.getQuery(view);

      // Bail if there's no query and jump out of the method to show the
      // 404 message.
      if (!query) {
        this.ready(null);
        return;
      }
      
      // Set GraphQL query variables.
      const id = query.id ? query.id : null;
      const slideshow = query.slideshow ? query.slideshow : null;

      try {
        const response = await fetch(endpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          body: JSON.stringify({
            query: query.name,
            variables: { id, slideshow },
          }),
        });

        const resp = await response.json();

        let action = null;
        let content = null;
        switch (view) {
          case 'home':
            content = resp.data;
            break;
          case 'cover':
          case 'slideshow':
            action = 'updateSlideshow';
            content = resp.data.slideshow[0];
            break;
          case 'slide':          
            action = 'updateSlide';
            content = resp.data.slide[0];
            break;
          case 'thumbs':
            action = 'updateThumbs';
            content = resp.data.slideshow[0];
            break;
        }

        // Save data to the store to prevent over-fetching on subsequent route
        // changes.
        if (action && content) {
          this.$store.dispatch(action, content);
        }

        return content;

      } catch (e) {
        alert('Currently unable to fetch data. :(');
      }
    },

    /**
     * Passes fetched data as a prop, sets 'loaded' flag to true, and updates
     * the document title if there's valid content. Otherwise displays the
     * 404 page.
     * @param {?Object} content
     */
    ready(content) {
      // Show 404 page if there's no content in the API response.
      if (!content) {
        this.content = null;
        this.showControls = false;
        this.notFound = true;

      // Otherwise, proceed as usual.
      } else {
        this.content = content;
        this.key = content.id;
        document.title = this.docTitle();
      }

      this.dataLoaded = true;
      this.sendPageview();
    },

    /**
     * Formats and updates document title based on the current route.
     * @return {string}
     */
    docTitle() {
      switch (this.$route.name) {
        case 'cover':
          return `${this.content.title}`;
        case 'slide':
          return `${this.content.title} · ${this.slideshow.title}`;
        case 'thumbs':
          return `Thumbnails · ${this.content.title}`;
        default:
          return document.title;
      }
    },

    /**
     * Gets global Google Analytics object and sends a new pageview.
     */
    sendPageview() {
      const ga = window.ga;
      if (ga) {
        ga('set', 'page', this.$route.path);
        ga('set', 'title', document.title);
        ga('send', 'pageview');
      }
    },

    /**
     * Removes CSS class from an element after entering a new route.
     * @param {!Element} element
     */
    afterEnter(element) {
      element.classList.remove(this.transitionEnterClass());
    },

    /**
     * Removes CSS class from an element after leaving the current route.
     * @param {!Element} element
     */
    afterLeave(element) {
      element.classList.remove(this.transitionLeaveClass());
    },

    /**
     * Adds CSS class to an element before entering a new route.
     * @param {!Element} element
     */
    beforeEnter(element) {
      element.classList.add(this.transitionEnterClass());
    },

    /**
     * Removes CSS class from an element before leaving the current route.
     * @param {!Element} element
     */
    beforeLeave(element) {
      element.classList.add(this.transitionLeaveClass());
    },

    /**
     * The CSS class to apply on transition's 'enter' tick based on current
     * 'direction' value.
     * @return {string} 
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
     * The CSS class to apply on transition's 'leave' tick based on current
     * 'direction' value.
     * @return {string} 
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
