import {ImageHeight, ImageWidth} from './imageSizing';

/** @const {string} */
const allSlideshows = `
query AllSlideshows {
  slideshows: entries(site: ["slideshows"], type: "slideDeck") {
    ... SlideDeck
  }
}

fragment SlideDeck on slides_slideDeck_Entry {
  title
  summary
  slug
  image: slideshowCover {
    ... SlideshowCover
  }
}

fragment SlideshowCover on slides_Asset {
  alt: title
  src_small: url @transform(width: ${ImageWidth.SMALL}, height: ${ImageHeight.SMALL}, interlace: "partition", immediately: true)
  src_medium: url @transform(width: ${ImageWidth.MEDIUM}, height: ${ImageHeight.MEDIUM}, interlace: "partition", immediately: true)
  src_large: url @transform(width: ${ImageWidth.LARGE}, height: ${ImageHeight.LARGE}, interlace: "partition", immediately: true)
  placeholder: url @transform(width: ${ImageWidth.PLACEHOLDER}, height: ${ImageHeight.PLACEHOLDER}, interlace: "partition", immediately: true)
}
`;

export default allSlideshows;
