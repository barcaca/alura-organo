'use client'

import data from '@/data/data.json'

import type { Collaborator, Team } from '@/types/type'
import { createContext, useContext, useEffect, useState } from 'react'

type CollaboratorContextType = {
  collaborators: Collaborator[]
  addCollaborator: (newCollaborator: Collaborator) => void
  removeCollaborator: (collaboratorId: string) => void
  favoriteCollaborator: (collaboratorId: string) => void
  teams: Team[]
  addTeam: (newTeam: Team) => void
  changeTeamColor: (teamId: string, color: string) => void
}

export const CollaboratorContext = createContext<CollaboratorContextType>(
  {} as CollaboratorContextType
)

export function CollaboratorProvider({
  children,
}: { children: React.ReactNode }) {
  const [collaborators, setCollaborators] = useState<Collaborator[]>([])
  const [teams, setTeams] = useState<Team[]>([])

  useEffect(() => {
    async function fetchData() {
      const collaboratorsData: Collaborator[] = await fetchCollaborators()
      const teamsData: Team[] = await fetchTeams()

      setCollaborators(collaboratorsData)
      setTeams(teamsData)
    }

    fetchData()
  }, [])

  const addCollaborator = (newCollaborator: Collaborator) => {
    setCollaborators(prev => [...prev, newCollaborator])
  }

  const removeCollaborator = (collaboratorId: string) => {
    setCollaborators(prev => prev.filter(c => c.id !== collaboratorId))
  }

  const favoriteCollaborator = (collaboratorId: string) => {
    setCollaborators(prev =>
      prev.map(collaborator =>
        collaborator.id === collaboratorId
          ? { ...collaborator, favorite: !collaborator.favorite }
          : collaborator
      )
    )
  }

  const addTeam = (newTeam: Team) => {
    setTeams(prev => [...prev, newTeam])
  }

  const changeTeamColor = (teamId: string, color: string) => {
    setTeams(prev =>
      prev.map(team => (team.name === teamId ? { ...team, color } : team))
    )
  }

  const values = {
    collaborators,
    addCollaborator,
    removeCollaborator,
    favoriteCollaborator,
    teams,
    addTeam,
    changeTeamColor,
  }

  return (
    <CollaboratorContext.Provider value={values}>
      {children}
    </CollaboratorContext.Provider>
  )
}

async function fetchCollaborators(): Promise<Collaborator[]> {
  const initialCollaborators = data.collaborators as Collaborator[]
  return initialCollaborators
}

async function fetchTeams(): Promise<Team[]> {
  const initialTeams = data.teams as Team[]
  return initialTeams
}

export const useCollaborator = () => useContext(CollaboratorContext)
