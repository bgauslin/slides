// TODO(graphql): Add srcset images to query.
// TODO(graphql): Use 'id' instead of 'slug' for query.
// TODO(graphql): Include parent slideshow info in query.

/** @enum {number} */
const ImageHeight = {
  SMALL: 400,
  MEDIUM: 600,
  LARGE: 800,
  PLACEHOLDER: 40,
};

/** @enum {number} */
const PublicationWidth = {
  SMALL: 320,
  MEIDUM: 480,
  LARGE: 640,
  PLACEHOLDER: 60,
};

/** @const {string} */
const slide = `
query Slide ($slug: [String!]) {
  slide: entries(section: "slides", type: "slide", slug: $slug) {
    ...SlideFull
  }
}

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
`;

export default slide;