// TODO(graphql): Add srcset images to query.
// TODO(graphql): Use 'id' instead of 'slug' for query.
// TODO(graphql): Include parent slideshow info in query.

/** @enum {number} */
const ImageSmall = {
  HEIGHT: 400,
};

/** @enum {number} */
const ImageMedium = {
  HEIGHT: 600,
};

/** @enum {number} */
const ImageLarge = {
  HEIGHT: 800,
};

/** @enum {number} */
const PublicationSmall = {
  WIDTH: 320,
};

/** @enum {number} */
const PublicationMedium = {
  WIDTH: 480,
};

/** @enum {number} */
const PublicationLarge = {
  WIDTH: 640,
};

/** @enum {number} */
const ImagePlaceholder = {
  HEIGHT: 40,
  WIDTH: 60,
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
              src: url @transform(height: ${ImageLarge.HEIGHT}, immediately: true)
              placeholder: url @transform(height: ${ImagePlaceholder.HEIGHT}, immediately: true)
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
              		src: url @transform(width: ${PublicationLarge.WIDTH}, immediately: true)
                  placeholder: url @transform(width: ${ImagePlaceholder.WIDTH}, immediately: true)
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