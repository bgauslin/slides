// http://gauslin.test/api/v2/slideshows

const allSlideshows = `{
  slideshows: entries(section: "slides", type: "slideDeck") {
    ...on slides_slideDeck_Entry {
    	title
    	summary
      id
      slug
      image: slideshowCover {
        ...on slides_Asset {
          alt: title
          small: url @transform(width: 600, height: 400, immediately: true)
          medium: url @transform(width: 900, height: 600, immediately: true)
          large: url @transform(width: 1200, height: 800, immediately: true)
          placeholder: url @transform(width: 60, height: 40, immediately: true)
        }
      }
    }
  }
}`;

export default allSlideshows;
