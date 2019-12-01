import { THUMB_SIZE } from './imageSizing';

/** @const {string} */
const thumbs = `
query SlideshowThumbs ($slideshow: [String!]) {
  slideshow: entries(site: ["slideshows"], type: ["slide", "slideDeck"], slug: $slideshow) {
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
    ...SlideImage
  }
}

fragment SlideImage on slides_Asset {
  alt: title
  src: url @transform(width: ${THUMB_SIZE}, height: ${THUMB_SIZE}, interlace: "partition", immediately: true)
}

fragment PublicationThumbs on publications_publication_Entry {
  images: publicationPhoto {
    ...PublicationImage
  }
}

fragment PublicationImage on publications_Asset {
  alt: title
  src: url @transform(width: ${THUMB_SIZE}, height: ${THUMB_SIZE}, interlace: "partition", immediately: true)
}
`;

export default thumbs;
