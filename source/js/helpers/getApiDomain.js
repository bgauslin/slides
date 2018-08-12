import getTLD from './getTLD';

export default () => {
  const apiDomain = (getTLD() === 'com') ? 'https://gauslin.com' : 'http://gauslin.test';
  return apiDomain;
}