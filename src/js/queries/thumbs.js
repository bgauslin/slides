/** @const {number} */
const thumbSize = 160;

/** @const {string} */
const thumbs = `
query ($slideshow: [String!]) {
  slideshow: entries(section: "slides", type: ["slide", "slideDeck"], slug: $slideshow) {
    ...SlideDeck
    slides: children {
      ...Slide
    }
  }
}

fragment SlideDeck on slides_slideDeck_Entry {
  title
  id
  slug
}

fragment Slide on slides_slide_Entry {
  title
  id
  slug
  media: slideshowMedia {
    ...Images
    ...on slideshowMedia_publication_BlockType {
      publication {
        ...Publication
      }
    }
  }
}

fragment Images on slideshowMedia_images_BlockType {
  images {
    ...on slides_Asset {
      alt: title
      src: url @transform(width: ${thumbSize}, height: ${thumbSize}, immediately: true)
    }
  }
}

fragment Publication on publications_publication_Entry {
  images: publicationPhoto {
    ...on publications_Asset {
      alt: title
      src: url @transform(width: ${thumbSize}, height: ${thumbSize}, immediately: true)
    }
  }
}
`;

export default thumbs;
