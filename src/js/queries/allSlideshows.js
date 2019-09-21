import { ImageHeight, ImageWidth } from './imageSizing';

/** @const {string} */
const allSlideshows = `
query AllSlideshows {
  slideshows: entries(section: "slides", type: "slideDeck") {
    ...SlideDeck
  }
}

fragment SlideDeck on slides_slideDeck_Entry {
  title
  summary
  slug
  image: slideshowCover {
    ...SlideshowCover
  }
}

fragment SlideshowCover on slides_Asset {
  alt: title
  src_small: url @transform(width: ${ImageWidth.SMALL}, height: ${ImageHeight.SMALL}, immediately: true)
  src_medium: url @transform(width: ${ImageWidth.MEDIUM}, height: ${ImageHeight.MEDIUM}, immediately: true)
  src_large: url @transform(width: ${ImageWidth.LARGE}, height: ${ImageHeight.LARGE}, immediately: true)
  placeholder: url @transform(width: ${ImageWidth.PLACEHOLDER}, height: ${ImageHeight.PLACEHOLDER}, immediately: true)
}
`;

export default allSlideshows;
