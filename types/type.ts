export interface Collaborator {
  id: string
  name: string
  position: string
  image?: string
  team: string
  favorite: boolean
}

export type Team = {
  name: string
  color: string
}
