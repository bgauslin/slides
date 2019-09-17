import { ImageHeight, ImageWidth } from './imageSizing';

// TODO(graphql): Add srcset images to query.

/** @const {string} */
const slideshow = `
query Slideshow ($slideshow: [String!]) {
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
  summary
  image: slideshowCover {
    ...Cover
  }
}

fragment Cover on slides_Asset {
  alt: title
  src: url @transform(width: ${ImageWidth.MEDIUM}, height: ${ImageHeight.MEDIUM}, immediately: true)
  placeholder: url @transform(width: ${ImageWidth.PLACEHOLDER}, height: ${ImageHeight.PLACEHOLDER}, immediately: true)
}

fragment Slide on slides_slide_Entry {
  title
  id
  slug
}
`;

export default slideshow;
