import { StructuredTextDocument } from "react-datocms"

import { AdditionalImages, mainImage } from "../cms/fragments"

export type Continent = "Afrika" | "Sydamerika" | "Nordamerika" | "Europa" | "Asien"
export type Diet = "allätare" | "växtätare" | "köttätare"
export type WaterType = "sötvatten" | "saltvatten" | "brackvatten"
export type DepthLevel = "botten" | "mellan" | "yta"
export type socialNeeds = "stim" | "par" | "ensam"

export type Fish = {
  inStock: boolean
  scientificName: string
  continentOfOrigin: Continent
  countryOfOrigin: string
  length: number
  difficulty: number
  diet: Diet
  commonName: string
  family: {
    name: string
  }
  id: number
  description: {
    value: StructuredTextDocument
  }
  additionalImages?: AdditionalImages
  mainImage: mainImage | null
  waterType: string
  temperature: Array<{
    min: number
    max: number
  }>
  socialNeeds: string
  ph: Array<{
    min: number
    max: number
  }>
  aquariumMinSize: number
  aquariumMinVolume: number
  depth: DepthLevel
  price: number
  genderDifferences: string
}
