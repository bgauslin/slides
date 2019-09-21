import { ImageHeight, PublicationWidth } from './imageSizing';

/** @const {string} */
const slide = `
query Slide ($id: [Int!]) {
  slide: entries(section: "slides", type: "slide", id: $id) {
    ...Slide
  }
}

fragment Slide on slides_slide_Entry {
  title
  id
  caption: copy
  slug
  media: slideshowMedia {
    ...Images
    ...on slideshowMedia_publication_BlockType {
      publication {
        ...Publication
      }
    }
  }
}

fragment Images on slideshowMedia_images_BlockType {
  images {
    ...on slides_Asset {
      alt: title
      src_small: url @transform(height: ${ImageHeight.SMALL}, immediately: true)
      src_medium: url @transform(height: ${ImageHeight.MEDIUM}, immediately: true)
      src_large: url @transform(height: ${ImageHeight.LARGE}, immediately: true)
      placeholder: url @transform(height: ${ImageHeight.PLACEHOLDER}, immediately: true)
      height
      width   
    }
  }
}

fragment Publication on publications_publication_Entry {
  title
  publisher
  date: publicationDate
  images: publicationPhoto {
    ...MagazineCover
  }
  link: publicationLink {
    ...Download
    ...ExternalLink
  }
}

fragment MagazineCover on publications_Asset {
  alt: title
  src: url @transform(width: ${PublicationWidth.LARGE}, immediately: true)
  placeholder: url @transform(width: ${PublicationWidth.PLACEHOLDER}, immediately: true)
  height
  width
}

fragment Download on publicationLink_download_BlockType {
  file {
    ...on pdf_Asset {
      url
    }
  }
}

fragment ExternalLink on publicationLink_link_BlockType {
  url: externalUrl
}
`;

export default slide;