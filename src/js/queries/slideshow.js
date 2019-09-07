// http://gauslin.test/api/v2/slideshow/<slug:{slug}>

function slideshow() {
  const slug = 'shotgun';

  return `{
    slideshow: entries(section: "slides", type: ["slide", "slideDeck"], slug: "${slug}") {
      ...on slides_slideDeck_Entry {
        title
        id
        slug
        summary
        image: slideshowCover {
          ...on slides_Asset {
            alt: title
            src: url @transform(width: 900, height: 600, immediately: true)
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
  }`
};

export default slideshow;
