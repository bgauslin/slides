// TODO(graphql): Add srcset images to query.
// TODO(graphql): Use 'id' instead of 'slug' for query.
// TODO(graphql): Include parent slideshow info in query.

// Image transforms for media images:
// small.height: 400
// medium.height: 600
// large.height: 800 ✅

// Image transforms for publication images:
// small.width: 320
// medium.width: 480
// large.width: 640 ✅

/** @enum {number} */
const imagePlaceholder = {
  height: 40,
  width: 60,
};

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
              src: url @transform(height: 800, immediately: true)
              placeholder: url @transform(height: ${imagePlaceholder.height}, immediately: true)
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
              		src: url @transform(width: 640, immediately: true)
                  placeholder: url @transform(width: ${imagePlaceholder.width}, immediately: true)
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