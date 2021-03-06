<template lang="pug">
  .app
    .progress-bar(
      v-if="isLoading"
    )
    app-header(
      v-if="!is404"
      :view="view"
    )
    transition(
      mode="out-in"
      @before-enter="beforeEnter"
      @after-enter="afterEnter"
      @before-leave="beforeLeave"
      @after-leave="afterLeave"
    )
      router-view(
        v-if="!is404"
        :content="content"
        :key="key"
      )
    not-found(
      v-if="is404"
    )
    controls(
      v-if="hasControls"
    )
</template>

<script>
import { mapGetters } from 'vuex';
import { Query } from '../../queries/index';
import AppHeader from './AppHeader.vue';
import Controls from './Controls.vue';
import NotFound from'./NotFound.vue';

export default {
  components: {
    AppHeader,
    Controls,
    NotFound,
  },

  data() {
    return {
      content: null,
      hasAllSlides: false,
      is404: false,
      isLoading: false,
      key: null,
    }
  },

  computed: {
    ...mapGetters([
      'direction',
      'slide',
      'slideshow',
      'thumbs',
    ]),

    /** @return {boolean} */
    hasControls() {
      return this.view === 'slide' && !this.is404;
    },

    /** @return {string} */
    view() {
      return this.$route.name;
    },
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
     * Enables the loading spinner and calls a data-fetching method based
     * on the current view.
     */
    getContent() {
      this.isLoading = true;

      // Set slideshowSlug if it exists for slideshow lookup.
      if (this.$route.params.slideshow) {
        this.$store.commit('updateSlideshowSlug', this.$route.params.slideshow);
      }

      switch (this.view) {
        case 'home':
          this.getHome();
          break;
        case 'cover':
          this.getCover();
          break;
        case 'slide':
          this.getSlide();
          this.backgroundFetchSlides();
          break;
        case 'thumbs':
          this.getThumbs();
          break;
        case '404':
          this.ready(null);
          break;
      }
    },

    /**
     * Fetches all of the slides in the background to speed up subsequent page
     * views after initial page load.
     * @async
     */
    async backgroundFetchSlides() {
      if (this.slideshow && !this.hasAllSlides) {
        const ids = this.slideshow.slides.map(slide => slide.id)
        for (let i = 0; i < ids.length; i++) {
          const slide = this.slideshow.slides.find(slide => slide.id === ids[i]);
          if (slide.media === undefined) {
            await this.fetchData('slide', ids[i]);
          }
        }
        this.hasAllSlides = true;
      }
    },

    /**
     * Fetches and renders data for the 'home' view.
     * @async
     */
    async getHome() {
      const content = await this.fetchData('home');
      this.ready(content);
    },

    /**
     * Fetches and renders data for the 'cover' view.
     * @async
     */
    async getCover() {
      if (this.slideshow) {
        this.ready(this.slideshow);
      } else {
        const content = await this.fetchData('cover');
        this.ready(content);
      }
    },

    /**
     * Fetches and renders data for the 'slide' view and fetches full
     * 'slideshow' data if it hasn't been fetched and stored yet.
     * @async
     */
    async getSlide() {
      // Set slideSlug first for slide lookup in the slideshow.
      this.$store.commit('updateSlideSlug', this.$route.params.slug);

      // If the slide has media, then it's already been fetched and stored.
      if (this.slide && this.slide.media !== undefined) {
        this.ready(this.slide);
      } else {
        // If the slideshow hasn't been fetched and stored yet, fetch the
        // slideshow first, so the slide has a slot to be stored in.
        if (!this.slideshow) {
          await this.fetchData('slideshow');
        }
        const content = await this.fetchData('slide', this.slide.id);
        this.ready(content);
      }
    },

    /**
     * Fetches and renders data for the 'thumbs' view and fetches full
     * 'slideshow' data if it hasn't been fetched and stored yet.
     * @async
     */
    async getThumbs() {
      if (this.thumbs) {
        this.ready(this.thumbs);
      } else {
        if (!this.slideshow) {
          await this.fetchData('slideshow');
        }
        const content = await this.fetchData('thumbs');
        this.ready(content);
      }
    },

    /**
     * Sets Graph QL query depending on the view.
     * @param {!string} view - Route name.
     * @param {?string} slideId - Slide ID when the view is 'slide'.
     * @return {string}
     */
    getQuery(view, slideId = null) {
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
            id: slideId,
          };
        case 'thumbs':
          return {
            name: Query.thumbs,
            slideshow: this.$route.params.slideshow,
          };
      }
    },

    /**
     * Fetches API data from a GraphQL endpoint, then stores the data to avoid
     * redundant API calls on subsequent route changes.
     * @param {!string} view - Which view.
     * @param {?string} slideId - Slide ID when the view is 'slide'.
     * @async
     */
    async fetchData(view, slideId = null) {
      const endpoint = (process.env.NODE_ENV === 'production') ?
          process.env.GRAPHQL_PROD : process.env.GRAPHQL_DEV;

      const query = this.getQuery(view, slideId);

      // Bail if there's no query and jump out of the method to show the
      // 404 message.
      if (!query) {
        this.ready(null);
        return;
      }

      // Set GraphQL query variables.
      const id = slideId ? slideId : null;
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
        console.warn('Currently unable to fetch data. :(');
      }
    },

    /**
     * Passes fetched data as a prop, stops displaying the loading spinner, and
     * updates the document title if there's valid content. Otherwise displays
     * the 404 page.
     * @param {?Object} content
     */
    ready(content) {
      // Show 404 page if there's no content in the API response.
      if (!content) {
        this.content = null;
        this.is404 = true;

      // Otherwise, proceed as usual.
      } else {
        this.content = content;
        this.key = content.id;
        document.title = this.setDocumentTitle();
      }

      this.isLoading = false;
      this.sendPageview();
    },

    /**
     * Formats and updates document title based on the current route.
     * @return {string}
     */
    setDocumentTitle() {
      switch (this.view) {
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
     * Adds CSS class to an element before entering a new route.
     * @param {!Element} el
     */
    beforeEnter(el) {
      el.classList.add(this.enterCssClass());
    },

    /**
     * Removes CSS class from an element after entering a new route.
     * @param {!Element} el
     */
    afterEnter(el) {
      el.classList.remove(this.enterCssClass());
    },

    /**
     * Removes CSS class from an element before leaving the current route.
     * @param {!Element} el
     */
    beforeLeave(el) {
      el.classList.add(this.leaveCssClass());
    },

    /**
     * Removes CSS class from an element after leaving the current route.
     * @param {!Element} el
     */
    afterLeave(el) {
      el.classList.remove(this.leaveCssClass());
    },

    /**
     * The CSS class to apply on transition's 'enter' tick based on current
     * 'direction' value.
     * @return {string} 
     */
    enterCssClass() {
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
    leaveCssClass() {
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
