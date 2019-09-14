// TODO: publication
// TODO: parent slideshow
const slide = `query ($slug: [String!]) {
  slide: entries(section: "slides", type: "slide", slug: $slug, ) {
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
              summary
              publisher
              publicationDate
              # publicationLink {
              #   ...on publicationLink_link_BlockType {
              #   }
              #   ...on publicationLink_download_BlockType {
              #   }
              # }
              publicationPhoto {
                ...on publications_Asset {
                  title
                  url
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