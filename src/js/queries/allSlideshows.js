// TODO(srcset): Image transforms for slideshows index images:
// small.height: 400
// medium.height: 600
// large.height: 800
// placeholder.height: 40
const allSlideshows = `query {
  slideshows: entries(section: "slides", type: "slideDeck") {
    ...on slides_slideDeck_Entry {
      title
      summary
      id
      slug
      image: slideshowCover {
        ...on slides_Asset {
          alt: title
          src: url @transform(width: 900, height: 600, immediately: true)
          placeholder: url @transform(width: 60, height: 40, immediately: true)
        }
      }
    }
  }
}`;

export default allSlideshows;
