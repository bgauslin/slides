// TODO(graphql): Add srcset images to query.

/** @enum {number} */
const ImageSmall = {
  HEIGHT: 400,
};

/** @enum {number} */
const ImageMedium = {
  HEIGHT: 600,
  WIDTH: 900,
};

/** @enum {number} */
const ImageLarge = {
  HEIGHT: 800,
};

/** @enum {number} */
const ImagePlaceholder = {
  HEIGHT: 40,
  WIDTH: 60,
};

/** @const {string} */
const allSlideshows = `query {
  slideshows: entries(section: "slides", type: "slideDeck") {
    ...on slides_slideDeck_Entry {
      title
      summary
      id
      slug
      image: slideshowCover {
        ...on slides_Asset {
          alt: title
          src: url @transform(width: ${ImageMedium.WIDTH}, height: ${ImageMedium.HEIGHT}, immediately: true)
          placeholder: url @transform(width: ${ImagePlaceholder.WIDTH}, height: ${ImagePlaceholder.HEIGHT}, immediately: true)
        }
      }
    }
  }
}`;

export default allSlideshows;
