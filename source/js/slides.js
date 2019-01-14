import attachFastClick from 'fastclick';
import { Utilities } from './modules/Utilities';
import './vue/app';

/** @instance */
const utils = new Utilities({
  analyticsData: {
    domain: 'slides.gauslin.com',
    id: 'UA-626192-17',
  }
});

/**
 * Initializes module methods when DOM is ready.
 * @listens DOMContentLoaded
 */
window.addEventListener('DOMContentLoaded', () => { 
  attachFastClick(document.body);
  utils.init();
});

/**
 * Calls module methods when window is resized.
 * @listens resize
 */
window.addEventListener('resize', () => {
  utils.viewportHeight();
});