import type { Collaborator } from '@/types/type'

export const initialCollaborators: Collaborator[] = [
  {
    id: '1',
    name: 'John Doe',
    position: 'Software Engineer',
    image:
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60',
    team: 'Frontend',
  },
  {
    id: '2',
    name: 'Jane Smith',
    position: 'Product Manager',
    image:
      'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60',
    team: 'UX/UI Design',
  },
  {
    id: '3',
    name: 'Sarah Chen',
    position: 'Senior Backend Developer',
    image:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60',
    team: 'Backend',
  },
]

export const initialTeams = [
  { name: 'Frontend', color: '#ef4444' },
  { name: 'Developers', color: '#3B82F6' },
  { name: 'UX/UI Design', color: '#10B981' },
  { name: 'Mobile', color: '#F59E0B' },
  { name: 'Backend', color: '#8B5CF6' },
  { name: 'DevOps', color: '#EC4899' },
  { name: 'Data Science', color: '#6366F1' },
]
