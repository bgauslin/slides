// TODO: JSDoc annotations.
import attachFastClick from 'fastclick';
import noTouch from './modules/noTouch';
import viewportHeight from './modules/viewportHeight';
import './vue/app';
import googleAnalytics from './modules/googleAnalytics';

const gaData = {
  domain: 'slides.gauslin.com',
  id: 'UA-626192-17',
}

// TODO: Move all modules into a single Utilities class.
attachFastClick(document.body);
googleAnalytics(gaData);
noTouch();
viewportHeight();

window.addEventListener('resize', () => viewportHeight());