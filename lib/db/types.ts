export type Continent = "Afrika" | "Sydamerika" | "Nordamerika" | "Europa" | "Asien"
export type Diet = "allätare" | "växtätare"
export type WaterType = "sötvatten" | "saltvatten"

export type Fish = {
  scientificName: string
  continent: Continent
  origin: string
  aquarium_min_size: number
  aquarium_min_volume: number
  min_temperature: number
  max_temperature: number
  min_pH_value: number
  max_pH_value: number
  length: number
  difficulty: number
  diet: Diet
  water_type: WaterType
  commonName: string
  family: string
  id: number
}
