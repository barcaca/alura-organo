'use client'
import { useCollaborator } from '@/contexts/collaborator-context'
import { HeartIcon, Trash2Icon } from 'lucide-react'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import imagePlaceholder from '../public/placeholder-image.svg'
import { CollaboratorCardSkeleton } from './skeletons'
import { Button } from './ui/button'
import { Card, CardContent, CardTitle } from './ui/card'
import { Input } from './ui/input'

export function CollaboratorCards() {
  const { state, removeCollaborator, changeTeamColor, favoriteCollaborator } =
    useCollaborator()
  const [isLoading, setIsLoading] = useState(true)

  function handleRemoveCollaborator(collaboratorId: string) {
    removeCollaborator(collaboratorId)
  }

  function handleChangeTeamColor(teamId: string, color: string) {
    const team = {
      name: teamId,
      color,
    }
    changeTeamColor(team)
  }

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 1000)
  }, [])

  if (isLoading) return <CollaboratorCardSkeleton />

  return state.teams.map(team => {
    const teamCollaborators = state.collaborators.filter(
      c => c.team === team.name
    )
    if (teamCollaborators.length === 0) return null

    return (
      <section
        key={team.name}
        className="relative mb-12 rounded-lg p-6 shadow-md"
        aria-labelledby={`team-${team.name}`}
        style={{ backgroundColor: `${team.color}20` }}
      >
        <Input
          className="absolute top-4 right-4 w-20"
          type="color"
          value={team.color}
          onChange={e => handleChangeTeamColor(team.name, e.target.value)}
        />
        <div className="flex items-center justify-center py-6">
          <h3
            id={`team-${team.name}`}
            className="mb-6 inline-block border-b-2 px-4 pb-2 text-center font-bold font-prata text-2xl leading-tight tracking-wide"
            style={{
              borderColor: `${team.color}`,
              color: `${team.color}`,
            }}
          >
            {team.name}
          </h3>
        </div>
        <ul className="grid list-none grid-cols-1 gap-6 p-0 md:grid-cols-2 lg:grid-cols-3">
          {teamCollaborators.map(collaborator => (
            <li key={collaborator.id}>
              <Card className="relative border-0 shadow-shape">
                <div
                  className="absolute top-0 h-1/3 w-full rounded-t-lg"
                  style={{ backgroundColor: `${team.color}` }}
                />
                <CardContent className="flex flex-col items-center p-6">
                  <figure className="z-20 mx-auto mb-4 h-32 w-32 flex-shrink-0 overflow-hidden rounded-full">
                    <Image
                      src={collaborator.image || imagePlaceholder}
                      alt={`${collaborator.name}'s profile picture`}
                      width={256}
                      height={256}
                      className="h-full w-full object-cover"
                    />
                  </figure>
                  <CardTitle className="mb-2 text-center font-prata text-xl leading-tight tracking-wide">
                    {collaborator.name}
                  </CardTitle>
                  <p className="text-center font-montserrat text-muted-foreground leading-relaxed">
                    {collaborator.position}
                  </p>
                </CardContent>
                <Button
                  className="absolute bottom-2 left-2"
                  variant="ghost"
                  size="icon"
                  onClick={() => favoriteCollaborator(collaborator.id)}
                >
                  <HeartIcon
                    className={
                      collaborator.favorite ? 'fill-red-500 text-red-500' : ''
                    }
                  />
                </Button>
                <Button
                  className="-right-2 -bottom-2 absolute"
                  variant="destructive"
                  size="icon"
                  onClick={() => handleRemoveCollaborator(collaborator.id)}
                >
                  <Trash2Icon />
                </Button>
              </Card>
            </li>
          ))}
        </ul>
      </section>
    )
  })
}
