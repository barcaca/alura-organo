import type { Collaborator, Team } from '@/types/type'

export enum ActionTypes {
  SET_COLLABORATORS = 'SET_COLLABORATORS',
  ADD_NEW_COLLABORATOR = 'ADD_NEW_COLLABORATOR',
  DELETE_COLLABORATOR = 'DELETE_COLLABORATOR',
  TOGGLE_FAVORITE_COLLABORATOR = 'TOGGLE_FAVORITE_COLLABORATOR',
  SET_TEAMS = 'SET_TEAMS',
  ADD_NEW_TEAM = 'ADD_NEW_TEAM',
  CHANGE_TEAM_COLOR = 'CHANGE_TEAM_COLOR',
}

export type Actions =
  | {
      type: ActionTypes.SET_COLLABORATORS
      payload: Collaborator[]
    }
  | {
      type: ActionTypes.ADD_NEW_COLLABORATOR
      payload: Collaborator
    }
  | {
      type: ActionTypes.DELETE_COLLABORATOR
      payload: string
    }
  | {
      type: ActionTypes.TOGGLE_FAVORITE_COLLABORATOR
      payload: string
    }
  | {
      type: ActionTypes.SET_TEAMS
      payload: Team[]
    }
  | {
      type: ActionTypes.ADD_NEW_TEAM
      payload: Team
    }
  | {
      type: ActionTypes.CHANGE_TEAM_COLOR
      payload: Team
    }

export const addCollaboratorAction = (collaborator: Collaborator) =>
  ({
    type: ActionTypes.ADD_NEW_COLLABORATOR,
    payload: collaborator,
  }) satisfies Actions

export const deleteCollaboratorAction = (collaboratorId: string) =>
  ({
    type: ActionTypes.DELETE_COLLABORATOR,
    payload: collaboratorId,
  }) satisfies Actions

export const toggleCollaboratorFavoriteAction = (collaboratorId: string) =>
  ({
    type: ActionTypes.TOGGLE_FAVORITE_COLLABORATOR,
    payload: collaboratorId,
  }) satisfies Actions

export const setCollaboratorsAction = (collaborators: Collaborator[]) =>
  ({
    type: ActionTypes.SET_COLLABORATORS,
    payload: collaborators,
  }) satisfies Actions

export const setTeamsAction = (teams: Team[]) =>
  ({
    type: ActionTypes.SET_TEAMS,
    payload: teams,
  }) satisfies Actions

export const addTeamAction = (team: Team) =>
  ({
    type: ActionTypes.ADD_NEW_TEAM,
    payload: team,
  }) satisfies Actions

export const changeTeamColorAction = (team: Team) =>
  ({
    type: ActionTypes.CHANGE_TEAM_COLOR,
    payload: team,
  }) satisfies Actions
