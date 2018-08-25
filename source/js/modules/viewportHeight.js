export default () => {
  const viewportHeight = window.innerHeight / 100;
  document.documentElement.style.setProperty('--viewport-height', `${viewportHeight}px`);
  return;
}
