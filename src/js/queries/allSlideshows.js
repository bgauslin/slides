import { ImageHeight, ImageWidth } from './imageSizing';

// TODO(graphql): Add srcset images to query.

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
  src: url @transform(width: ${ImageWidth.MEDIUM}, height: ${ImageHeight.MEDIUM}, immediately: true)
  placeholder: url @transform(width: ${ImageWidth.PLACEHOLDER}, height: ${ImageHeight.PLACEHOLDER}, immediately: true)
}
`;

export default allSlideshows;
