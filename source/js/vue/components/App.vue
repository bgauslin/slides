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

    thumbs () {
      return this.$store.getters.thumbs;
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

       // Set slug for slide id lookup.
      this.$store.commit('updateSlug', this.$route.params.slug);

      const fetchData = async () => {
        // Get the slideshow first, then the slide (or the slide won't have a slot to get stored in).
        if (!this.slideshow) {
          await this.fetchJson(this.endpoint('slideshow'), 'slideshow');
        }
        // Wait until we've confirmed that the slide doesn't have media before fetching the full slide
        // and storing its media.
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

    getDataThumbs () {
      this.app.showControls = false;

      const fetchData = async () => {
        // Fetch thumbs, then slideshow if we don't have it yet.
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
@import '../../../stylus/config/'

@media BREAKPOINT_MEDIUM
  .view
    display grid
    grid-template-columns minmax(auto, 1fr)
    grid-template-rows HEADER_HEIGHT_MEDIUM 1fr CONTROLS_HEIGHT_MEDIUM

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
  animation-duration SLIDE_TRANSITION
  animation-timing-function ease-out

  @media BREAKPOINT_LARGE
    animation-duration SLIDE_TRANSITION_LARGE

</style>
