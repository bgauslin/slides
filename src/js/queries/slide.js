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
fragment Images on slides_Asset {
  alt: title
  src: url @transform(height: ${ImageHeight.LARGE}, immediately: true)
  placeholder: url @transform(height: ${ImageHeight.PLACEHOLDER}, immediately: true)
  height
  width
}

fragment MagazineCover on publications_Asset {
  alt: title
  src: url @transform(width: ${PublicationWidth.LARGE}, immediately: true)
  placeholder: url @transform(width: ${PublicationWidth.PLACEHOLDER}, immediately: true)
  height
  width
}

fragment Publication on publications_publication_Entry {
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

query ($slug: [String!]) {
  slide: entries(section: "slides", type: "slide", slug: $slug) {
    ...on slides_slide_Entry {
      title
      id
      caption: copy
      slug
      media: slideshowMedia {
        ...on slideshowMedia_images_BlockType {
          images {
            ...Images
          }
        }
        ...on slideshowMedia_publication_BlockType {
          publication {
            ...Publication
          }
        }
      }
    }
  }
}`;

export default slide;