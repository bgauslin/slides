// TODO(env): Set API base URL via environment instead of within compiled JS.
/** @enum {string} */
const Config = {
  API_DEV: 'http://gauslin.test/api',
  API_PROD: 'https://gauslin.com/api',
  API_VERSION: 'v2',
  DOMAIN: 'slides.gauslin.com',
  GA_ID: 'UA-626192-17',
}

/** @class */
export default class {
  /** Intializes site-wide widgets, utilities, etc. */
  static init() {
    this.noTouch_();
    this.viewportHeight_();
    this.resize_();
    this.googleAnalytics_();
  }

  /**
   * Adds 'no-touch' attribute if not a touch-enabled device.
   * @private
   */
  static noTouch_() {
    if (('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch) {
      return;
    } else {
      document.body.setAttribute('no-touch', '');
    }
  }

  /**
   * Gets JSON API's base URL based on server environment.
   * @return {string}
   * @public
   */
  static apiBaseURL() {
    const baseURL = (window.location.hostname !== Config.DOMAIN) ? Config.API_DEV : Config.API_PROD;
    return `${baseURL}/${Config.API_VERSION}`;
  }

  /**
   * Initializes Google Analytics.
   * @private
   */
  static googleAnalytics_() {
    if (window.location.hostname === Config.DOMAIN) {
      (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
      (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
      m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
      })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');
      ga('create', Config.GA_ID, 'auto');
    }
  }

  /**
   * Gets breakpoint name as set by CSS as a hook for JS methods that occur at
   * media query breakpoints.
   * @return {string}
   * @public
   */
  static getBreakpointValue() {
    return window.getComputedStyle(document.body,'::after').getPropertyValue('content').replace(/\"/g, '');
  }

  /**
   * Updates viewport units when window is resized.
   * @listens resize
   * @private
   */
  static resize_() {
    window.addEventListener('resize', () => {
      this.viewportHeight_();
    });
  }

  /**
   * Sets custom property for viewport height that updates 'vh' calculation
   * due to iOS Safari behavior where chrome appears and disappears when
   * scrolling.
   * @private
   */
  static viewportHeight_() {
    const viewportUnit = window.innerHeight / 100;
    document.documentElement.style.setProperty('--viewport-unit', `${viewportUnit}px`);
  }
}
