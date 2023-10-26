import gql from "graphql-tag"

import { DatoImage } from "./types"

export const mainImageFragment = gql`
  fragment mainImageFragment on FishRecord {
    mainImage {
      alt
      responsiveImage {
        aspectRatio
        sizes
        src
      }
    }
  }
`

export type AdditionalImages = Array<DatoImage>

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
