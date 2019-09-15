/** @const {number} */
const imageSize = 160;

/** @const {string} */
const thumbs = `query ($slideshow: [String!]) {
  slideshow: entries(section: "slides", type: ["slide", "slideDeck"], slug: $slideshow) {
    ...on slides_slideDeck_Entry {
    	title
      id
      slug
    }
    slides: children {
      ...on slides_slide_Entry {
        title
        id
        slug
        media: slideshowMedia {
          ...on slideshowMedia_images_BlockType {
            images {
              ...on slides_Asset {
                alt: title
                src: url @transform(width: ${imageSize}, height: ${imageSize}, immediately: true)
              }
            }
          }
          ...on slideshowMedia_publication_BlockType {
            publication {
              ...on publications_publication_Entry {
                images: publicationPhoto {
                  ...on publications_Asset {
                    alt: title
                    src: url @transform(width: ${imageSize}, height: ${imageSize}, immediately: true)
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}`;

export default thumbs;
