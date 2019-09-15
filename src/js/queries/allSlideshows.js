// TODO(graphql): Add srcset images to query.

/** @enum {number} */
const imageSmall = {
  height: 400,
};

/** @enum {number} */
const imageMedium = {
  height: 600,
  width: 900,
};

/** @enum {number} */
const imageLarge = {
  height: 800,
};

/** @enum {number} */
const imagePlaceholder = {
  height: 40,
  width: 60,
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
          src: url @transform(width: ${imageMedium.width}, height: ${imageMedium.height}, immediately: true)
          placeholder: url @transform(width: ${imagePlaceholder.width}, height: ${imagePlaceholder.height}, immediately: true)
        }
      }
    }
  }
}`;

export default allSlideshows;
