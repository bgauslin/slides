export default () => {
  const hostnameParts = window.location.hostname.split('.');
  const tld =  hostnameParts[hostnameParts.length - 1];
  return tld === 'com' ? 'https://gauslin.com' : 'http://gauslin.test';
}