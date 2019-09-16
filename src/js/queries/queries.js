// TODO(graphql): Use 'id' instead of 'slug' for 'Slide' query variable.
// TODO(graphql): Add srcset images to query.

/** @const {number} */
const thumbSize = 160;

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

/** @enum {number} */
const PublicationWidth = {
  SMALL: 320,
  MEIDUM: 480,
  LARGE: 640,
  PLACEHOLDER: 60,
};

/** @const {string} */
const queries = `
query AllSlideshows {
  slideshows: entries(section: "slides", type: "slideDeck") {
    ...SlideDeck
  }
}

query Slideshow ($slideshow: [String!]) {
  slideshow: entries(section: "slides", type: ["slide", "slideDeck"], slug: $slideshow) {
    ...SlideDeck
    slides: children {
      ...SlideSnapshot
    }
  }
}

query Slide ($slug: [String!]) {
  slide: entries(section: "slides", type: "slide", slug: $slug) {
    ...SlideFull
  }
}

query SlideshowThumbs ($slideshow: [String!]) {
  slideshow: entries(section: "slides", type: ["slide", "slideDeck"], slug: $slideshow) {
    ...SlideDeck
    slides: children {
      ...SlidePartial
    }
  }
}

# TODO: Make SlideDeck 'image' field conditional.
# (Fragment is used by AllSlideshows and SlideshowThumbs queries.)
fragment SlideDeck on slides_slideDeck_Entry {
  title
  summary
  slug
  image: slideshowCover {
    ...SlideshowCover
  }
}

# NOTE: SlideSnapshot is used for 'slideshow' view.
fragment SlideSnapshot on slides_slide_Entry {
  title
  id
  slug
}

# NOTE: SlideFull is used for 'slide' view.
fragment SlideFull on slides_slide_Entry {
  title
  id
  caption: copy
  slug
  media: slideshowMedia {
    ...SlideImages
    ...on slideshowMedia_publication_BlockType {
      publication {
        ...SlidePublication
      }
    }
  }
}

# NOTE: SlidePartial is used for 'thumbs' view.
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

fragment SlideshowCover on slides_Asset {
  alt: title
  src: url @transform(width: ${ImageWidth.MEDIUM}, height: ${ImageHeight.MEDIUM}, immediately: true)
  placeholder: url @transform(width: ${ImageWidth.PLACEHOLDER}, height: ${ImageHeight.PLACEHOLDER}, immediately: true)
}

fragment SlideImages on slideshowMedia_images_BlockType {
  images {
    ...on slides_Asset {
      alt: title
      src: url @transform(height: ${ImageHeight.LARGE}, immediately: true)
      placeholder: url @transform(height: ${ImageHeight.PLACEHOLDER}, immediately: true)
      height
      width   
    }
  }
}

fragment SlidePublication on publications_publication_Entry {
  title
  publisher
  date: publicationDate
  images: publicationPhoto {
    ...MagazineCover
  }
  link: publicationLink {
    ...Download
    ...ExternalLink
  }
}

fragment MagazineCover on publications_Asset {
  alt: title
  src: url @transform(width: ${PublicationWidth.LARGE}, immediately: true)
  placeholder: url @transform(width: ${PublicationWidth.PLACEHOLDER}, immediately: true)
  height
  width
}

fragment Download on publicationLink_download_BlockType {
  file {
    ...on pdf_Asset {
      url
    }
  }
}

fragment ExternalLink on publicationLink_link_BlockType {
  url: externalUrl
}

fragment SlideThumbs on slideshowMedia_images_BlockType {
  images {
    ...on slides_Asset {
      alt: title
      src: url @transform(width: ${thumbSize}, height: ${thumbSize}, immediately: true)
    }
  }
}

fragment PublicationThumbs on publications_publication_Entry {
  images: publicationPhoto {
    ...on publications_Asset {
      alt: title
      src: url @transform(width: ${thumbSize}, height: ${thumbSize}, immediately: true)
    }
  }
}
`;

export default queries;
