// http://gauslin.test/api/v2/slideshow/thumbs/<slug:{slug}>

const thumbs = (slug) => `{
  slideshow: entries(section: "slides", type: ["slide", "slideDeck"], slug: "${slug}") {
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
            thumbs: images {
              ...on slides_Asset {
                alt: title
                src: url @transform(width: 160, height: 160, immediately: true)
              }
            }
          }
        }
      }
    }
  }
}`;

export default thumbs;
