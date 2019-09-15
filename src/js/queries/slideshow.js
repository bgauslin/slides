// TODO(graphql): Add srcset images to query.

/** @enum {number} */
const ImageHeight = {
  SMALL: 400,
  MEDIUM: 600,
  LARGE: 800,
  PLACEHOLDER: 40,
};

/** @enum {number} */
const ImageWidth = {
  SMALL: 600,
  MEDIUM: 900,
  LARGE: 1200,
  PLACEHOLDER: 60,
}

/** @const {string} */
const slideshow = `query ($slideshow: [String!]) {
  slideshow: entries(section: "slides", type: ["slide", "slideDeck"], slug: $slideshow) {
    ...on slides_slideDeck_Entry {
      title
      id
      slug
      summary
      image: slideshowCover {
        ...on slides_Asset {
          alt: title
          src: url @transform(width: ${ImageWidth.MEDIUM}, height: ${ImageHeight.MEDIUM}, immediately: true)
          placeholder: url @transform(width: ${ImageWidth.PLACEHOLDER}, height: ${ImageHeight.PLACEHOLDER}, immediately: true)
        }
      }
    }
    slides: children {
      title
      id
      slug
    }
  }
}`;

export default slideshow;