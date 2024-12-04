import type { State } from '@/contexts/collaborator-context'
import { ActionTypes, type Actions } from './actions'

export function reducer(state: State, action: Actions) {
  switch (action.type) {
    case ActionTypes.SET_COLLABORATORS:
      return {
        ...state, // Mantém todas as outras propriedades do estado
        collaborators: action.payload, // Atualiza apenas a propriedade 'collaborators'
      }
    case ActionTypes.ADD_NEW_COLLABORATOR:
      return {
        ...state, // Mantém todas as outras propriedades do estado
        collaborators: [...state.collaborators, action.payload], // Adiciona um novo colaborador
      }
    case ActionTypes.DELETE_COLLABORATOR:
      return {
        ...state, // Mantém todas as outras propriedades do estado
        collaborators: state.collaborators.filter(
          collaborator => collaborator.id !== action.payload
        ),
      }
    case ActionTypes.TOGGLE_FAVORITE_COLLABORATOR:
      return {
        ...state, // Mantém todas as outras propriedades do estado
        collaborators: state.collaborators.map(collaborator => {
          if (collaborator.id === action.payload) {
            return { ...collaborator, favorite: !collaborator.favorite }
          }
          return collaborator
        }),
      }
    case ActionTypes.SET_TEAMS:
      return {
        ...state, // Mantém todas as outras propriedades do estado
        teams: action.payload, // Atualiza apenas a propriedade 'teams'
      }
    case ActionTypes.ADD_NEW_TEAM:
      return {
        ...state, // Mantém todas as outras propriedades do estado
        teams: [...state.teams, action.payload], // Adiciona uma nova equipe
      }
    case ActionTypes.DELETE_TEAM:
      return {
        ...state, // Mantém todas as outras propriedades do estado
        teams: state.teams.filter(team => team.name !== action.payload),
      }
    case ActionTypes.CHANGE_TEAM_COLOR:
      return {
        ...state, // Mantém todas as outras propriedades do estado
        teams: state.teams.map(team =>
          team.name === action.payload.name
            ? { ...team, color: action.payload.color }
            : team
        ),
      }

    default:
      return state // Retorna o estado original em caso de ação desconhecida
  }
}
