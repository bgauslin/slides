export default () => {
  const viewportUnit = window.innerHeight / 100;
  document.documentElement.style.setProperty('--viewport-unit', `${viewportUnit}px`);
  return;
}
