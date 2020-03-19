import fastclick from 'fastclick';

export default class {
  /**
   * Intializes site-wide widgets, utilities, etc.
   * @public
   */
  static init() {
    this.touchEnabled_();
    this.setViewportHeight_();
    this.resize_();
    this.googleAnalytics_();
  }

  /**
   * Initializes Google Analytics.
   * @private
   */
  static googleAnalytics_() {
    if (process.env.NODE_ENV === 'production') {
      (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
      (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
      m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
      })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');
      ga('create', process.env.GA_ID, 'auto');
    }
  }

  /**
   * Updates viewport units when window is resized.
   * @private
   */
  static resize_() {
    window.addEventListener('resize', () => this.setViewportHeight_());
  }

  /**
   * Removes 'no-touch' attribute and adds fastclick if device is touch-enabled.
   * @private
   */
  static touchEnabled_() {
    if ('ontouchstart' in window || window.DocumentTouch) {
      fastclick.attach(document.body);
      document.body.removeAttribute('no-touch');
    }
  }

  /**
   * Sets custom property for viewport height that updates 'vh' calculation
   * due to iOS Safari behavior where chrome appears and disappears when
   * scrolling.
   * @private
   */
  static setViewportHeight_() {
    document.documentElement.style.setProperty('--vh', `${window.innerHeight / 100}px`);
  }
}
