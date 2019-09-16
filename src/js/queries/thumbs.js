import { THUMB_SIZE } from './imageSizing';

/** @const {string} */
const thumbs = `
query SlideshowThumbs ($slideshow: [String!]) {
  slideshow: entries(section: "slides", type: ["slide", "slideDeck"], slug: $slideshow) {
    ...SlideDeck
    slides: children {
      ...SlidePartial
    }
  }
}

fragment SlideDeck on slides_slideDeck_Entry {
  title
  id
  slug
}

fragment SlidePartial on slides_slide_Entry {
  title
  id
  slug
  media: slideshowMedia {
    ...SlideThumbs
    ...on slideshowMedia_publication_BlockType {
      publication {
        ...PublicationThumbs
      }
    }
  }
}

fragment SlideThumbs on slideshowMedia_images_BlockType {
  images {
    ...on slides_Asset {
      alt: title
      src: url @transform(width: ${THUMB_SIZE}, height: ${THUMB_SIZE}, immediately: true)
    }
  }
}

fragment PublicationThumbs on publications_publication_Entry {
  images: publicationPhoto {
    ...on publications_Asset {
      alt: title
      src: url @transform(width: ${THUMB_SIZE}, height: ${THUMB_SIZE}, immediately: true)
    }
  }
}
`;

export default thumbs;
