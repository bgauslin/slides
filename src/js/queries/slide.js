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

// TODO: Fix console error for /shotgun/homes-lifestyles:
// external link instead of file download
/** @const {string} */
const slide = `query ($slug: [String!]) {
  slide: entries(section: "slides", type: "slide", slug: $slug) {
    ...on slides_slide_Entry {
    	title
      id
      caption: copy
      slug
      media: slideshowMedia {
        ...on slideshowMedia_images_BlockType {
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
        ...on slideshowMedia_publication_BlockType {
          publication {
            ...on publications_publication_Entry {
              title
              publisher
              date: publicationDate
              images: publicationPhoto {
                ...on publications_Asset {
                  alt: title
              		src: url @transform(width: ${PublicationWidth.LARGE}, immediately: true)
                  placeholder: url @transform(width: ${PublicationWidth.PLACEHOLDER}, immediately: true)
                  height
                  width
                }
              }
              link: publicationLink {
                ...on publicationLink_download_BlockType {
                  file {
                    ...on pdf_Asset {
                      url
                    }
                  }
                }
                ...on publicationLink_link_BlockType {
                  url: externalUrl
                }
              }
            }
          }
        }
      }
    }
  }
}`;

export default slide;