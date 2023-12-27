import gql from "graphql-tag"

export type mainImage = {
  alt: string
  responsiveImage: {
    src: string
    aspectRatio: number
    sizes: string
    width: number
    height: number
  }
}

export const mainImageFragment = gql`
  fragment mainImageFragment on FishRecord {
    mainImage {
      alt
      responsiveImage(imgixParams: { fit: crop, ar: "3:1" }) {
        aspectRatio
        sizes
        src
        width
        height
      }
    }
  }
`

export type AdditionalImages = Array<{
  alt: string
  responsiveImage: {
    src: string
    aspectRatio: number
    sizes: string
  }
}>

export const additionalImagesFragment = gql`
  fragment additionalImagesFragment on FishRecord {
    additionalImages {
      alt
      responsiveImage(imgixParams: { fit: crop, ar: "3:5" }) {
        aspectRatio
        sizes
        src
      }
    }
  }
`
