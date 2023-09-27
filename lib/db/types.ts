import { StructuredTextDocument } from "react-datocms"

export type Continent = "Afrika" | "Sydamerika" | "Nordamerika" | "Europa" | "Asien"
export type Diet = "allätare" | "växtätare" | "köttätare"
export type WaterType = "sötvatten" | "saltvatten" | "brackvatten"
export type DepthLevel = "botten" | "mellan" | "yta"
export type socialNeeds = "stim" | "par" | "ensam"

export type Fish = {
  scientificName: string
  continentOfOrigin: Continent
  countryOfOrigin: string
  length: number
  difficulty: number
  diet: Diet
  commonName: string
  family: string
  id: number
  description: {
    value: StructuredTextDocument
  }
  mainImage: {
    alt: string
    url: string
  }
  waterType: string
  temperature: {
    min: number
    max: number
  }
  socialNeeds: string
  ph: {
    min: number
    max: number
  }
  additionalImages: {
    alt: string
    url: string
  }
  aquariumMinSize: number
  aquariumMinVolume: number
  depth: DepthLevel
  genderDifferences: string
}
