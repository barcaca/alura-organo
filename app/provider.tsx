'use client'

import { CollaboratorProvider } from '@/contexts/collaborator-context'

export function Provider({ children }: { children: React.ReactNode }) {
  return <CollaboratorProvider>{children}</CollaboratorProvider>
}
