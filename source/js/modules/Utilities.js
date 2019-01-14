/** @enum {string} */
const Domains = {
  DEV: 'http://slides.gauslin.test',
  PROD: 'https://slides.gauslin.com',
}

/** @class */
class Utilities {
  /**
   * @param {Object} config
   * @param {Object} config.analyticsData
   */
  constructor(config) {
    /** @const {!Object} */
    this.analyticsData = config.analyticsData;
  }

  /**
   * @public
   */
  init() {
    this.googleAnalytics(this.analyticsData);
    this.noTouch();
    this.viewportHeight();
  }

  /**
   * @return {string}
   * @public
   */
  getApiDomain() {
    return this.getTLD_() === 'com' ? Domains.PROD : Domains.DEV;
  }

  /**
   * @return {string}
   * @private
   */
  getTLD_() {
    const hostnameParts = window.location.hostname.split('.');
    return hostnameParts[hostnameParts.length - 1];
  }

  /**
   * @param {!Object} data
   * @param {!string} data.domain
   * @param {!string} data.id
   * @public
   */
  googleAnalytics(data) {
    if (window.location.hostname === data.domain) {
      (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
      (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
      m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
      })(window,document,'script','//www.google-analytics.com/analytics.js','ga');
      ga('create', data.id, 'auto');
      ga('send', 'pageview');
    }
  }

  /**
   * @description TODO...
   * @public
   */
  noTouch() {
    const touch = 'ontouchstart' in window || navigator.msMaxTouchPoints > 0;
    if (!touch) {
      document.body.setAttribute('no-touch', '');
    }
  }

  /**
   * @description TODO...
   * @public
   */
  viewportHeight() {
    const viewportUnit = window.innerHeight / 100;
    document.documentElement.style.setProperty('--viewport-unit', `${viewportUnit}px`);
  }
}

export { Utilities };
