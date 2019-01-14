// TODO: Move this to Utilities class.
export default () => {
  const touch = 'ontouchstart' in window || navigator.msMaxTouchPoints > 0;

  if (!touch) {
    document.body.setAttribute('no-touch', '');
  }
}
