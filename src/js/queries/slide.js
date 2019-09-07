// http://gauslin.test/api/v2/slide/<entryId:\d+>

// TODO: publication
const slide = `{
  slide: entries(section: "slides", type: "slide", id: ${id}) {
    ...on slides_slide_Entry {
    	title
      id
    	caption: copy
      slug
      media: slideshowMedia {
        ...on slideshowMedia_images_BlockType {
          images {
            alt: title
            ...on slides_Asset {
      		    small: url @transform(height: 400, immediately: true)
          		medium: url @transform(height: 600, immediately: true)
          		large: url @transform(height: 800, immediately: true)
          		placeholder: url @transform(height: 40, immediately: true)
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