// TODO(graphql): parent slideshow

// TODO(srcset): Image transforms for media images:
// small.height: 400
// medium.height: 600
// large.height: 800 ✅
// placeholder.height: 40 ✅

// TODO(srcset) Image transforms for publication images:
// small.width: 320
// medium.width: 480
// large.width: 640 ✅
// placeholder.width: 60 ✅

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
              placeholder: url @transform(height: 40, immediately: true)
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
              image: publicationPhoto {
                ...on publications_Asset {
                  alt: title
              		src: url @transform(width: 640, immediately: true)
              		placeholder: url @transform(width: 60, immediately: true)
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