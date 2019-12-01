import { ImageHeight, PublicationWidth } from './imageSizing';

/** @const {string} */
const slide = `
query Slide ($id: [QueryParameter!]) {
  slide: entries(site: ["slideshows"], type: "slide", id: $id) {
    ...Slide
  }
}

fragment Slide on slides_slide_Entry {
  title
  id
  caption: copy @markdown
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
      src_small: url @transform(height: ${ImageHeight.SMALL}, interlace: "partition", immediately: true)
      src_medium: url @transform(height: ${ImageHeight.MEDIUM}, interlace: "partition", immediately: true)
      src_large: url @transform(height: ${ImageHeight.LARGE}, interlace: "partition", immediately: true)
      placeholder: url @transform(height: ${ImageHeight.PLACEHOLDER}, interlace: "partition", immediately: true)
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
  src_small: url @transform(width: ${PublicationWidth.SMALL}, interlace: "partition", immediately: true)
  src_medium: url @transform(width: ${PublicationWidth.MEDIUM}, interlace: "partition", immediately: true)
  src_large: url @transform(width: ${PublicationWidth.LARGE}, interlace: "partition", immediately: true)
  placeholder: url @transform(width: ${PublicationWidth.PLACEHOLDER}, interlace: "partition", immediately: true)
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