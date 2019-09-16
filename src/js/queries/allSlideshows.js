// TODO(graphql): Add srcset images to query.

/** @enum {number} */
const ImageHeight = {
  SMALL: 400,
  MEDIUM: 600,
  LARGE: 800,
  PLACEHOLDER: 40,
}

/** @enum {number} */
const ImageWidth = {
  SMALL: 600,
  MEDIUM: 900,
  LARGE: 1200,
  PLACEHOLDER: 60,
}

/** @const {string} */
const allSlideshows = `
query {
  slideshows: entries(section: "slides", type: "slideDeck") {
    ...SlideDeck
  }
}

fragment SlideDeck on slides_slideDeck_Entry {
  title
  summary
  id
  slug
  image: slideshowCover {
    ...Cover
  }
}

fragment Cover on slides_Asset {
  alt: title
  src: url @transform(width: ${ImageWidth.MEDIUM}, height: ${ImageHeight.MEDIUM}, immediately: true)
  placeholder: url @transform(width: ${ImageWidth.PLACEHOLDER}, height: ${ImageHeight.PLACEHOLDER}, immediately: true)
}
`;

export default allSlideshows;
