// http://gauslin.test/api/v2/slideshow/<slug:{slug}>

const slideshow = `{
  slideshow: entries(section: "slides", type: ["slide", "slideDeck"], slug: "${slug}") {
    ...on slides_slideDeck_Entry {
    	title
      id
      slug
      summary
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
    slides: children {
      title
      id
      slug
    }
  }
}`;

export default slideshow;
