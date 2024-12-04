'use client'

import data from '@/data/data.json'
import {
  addCollaboratorAction,
  addTeamAction,
  changeTeamColorAction,
  deleteCollaboratorAction,
  setCollaboratorsAction,
  setTeamsAction,
  toggleCollaboratorFavoriteAction,
} from '@/reducers/actions'
import { reducer } from '@/reducers/reducer'

import type { Collaborator, Team } from '@/types/type'
import { createContext, useContext, useEffect, useReducer } from 'react'

type CollaboratorContextType = {
  state: State
  addCollaborator: (newCollaborator: Collaborator) => void
  removeCollaborator: (collaboratorId: string) => void
  favoriteCollaborator: (collaboratorId: string) => void
  addTeam: (newTeam: Team) => void
  changeTeamColor: (team: Team) => void
}

export const CollaboratorContext = createContext<CollaboratorContextType>(
  {} as CollaboratorContextType
)

const COLLABORATOR_STORAGE_KEY = '@organo:collaborators'
const TEAMS_STORAGE_KEY = '@organo:teams'

export interface State {
  collaborators: Collaborator[]
  teams: Team[]
}

const initialState: State = {
  collaborators: [],
  teams: [],
}

export function CollaboratorProvider({
  children,
}: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState)
  const addCollaborator = (newCollaborator: Collaborator) => {
    dispatch(addCollaboratorAction(newCollaborator))
  }

  const removeCollaborator = (collaboratorId: string) => {
    dispatch(deleteCollaboratorAction(collaboratorId))
  }

  const favoriteCollaborator = (collaboratorId: string) => {
    dispatch(toggleCollaboratorFavoriteAction(collaboratorId))
  }

  const addTeam = (newTeam: Team) => {
    dispatch(addTeamAction(newTeam))
  }

  const changeTeamColor = (team: Team) => {
    dispatch(changeTeamColorAction(team))
  }

  // Usar useEffect para verificar e carregar dados do localStorage
  useEffect(() => {
    const storedCollaborators = localStorage.getItem(COLLABORATOR_STORAGE_KEY)
    const storedTeams = localStorage.getItem(TEAMS_STORAGE_KEY)

    if (storedCollaborators && storedTeams) {
      dispatch(setCollaboratorsAction(JSON.parse(storedCollaborators)))
      dispatch(setTeamsAction(JSON.parse(storedTeams)))
    } else {
      async function fetchData() {
        const [collaborators, teams] = await Promise.all([
          fetchCollaborators(),
          fetchTeams(),
        ])

        dispatch(setCollaboratorsAction(collaborators))
        dispatch(setTeamsAction(teams))

        localStorage.setItem(
          COLLABORATOR_STORAGE_KEY,
          JSON.stringify(collaborators)
        )
        localStorage.setItem(TEAMS_STORAGE_KEY, JSON.stringify(teams))
      }
      fetchData()
    }
  }, [])

  const saveToLocalStorage = (key: string, data: Collaborator[] | Team[]) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(key, JSON.stringify(data))
    }
  }

  // Sincronizar estado de colaboradores e equipes com localStorage
  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    saveToLocalStorage(COLLABORATOR_STORAGE_KEY, state.collaborators)
  }, [state.collaborators])

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    saveToLocalStorage(TEAMS_STORAGE_KEY, state.teams)
  }, [state.teams])

  const values = {
    state,
    addCollaborator,
    removeCollaborator,
    favoriteCollaborator,
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
