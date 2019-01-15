// TODO: move app.js up to this file.
import attachFastClick from 'fastclick';
import './vue/app'; 

/**
 * Initializes module methods when DOM is ready.
 * @listens DOMContentLoaded
 */
window.addEventListener('DOMContentLoaded', () => { 
  attachFastClick(document.body);
});
