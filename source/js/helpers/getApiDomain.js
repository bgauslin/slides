import getTLD from './getTLD';

export default () => {
  return (getTLD() === 'com') ? 'https://gauslin.com' : 'http://gauslin.test';
}