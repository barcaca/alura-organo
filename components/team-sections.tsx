'use client'
import { PlusIcon } from 'lucide-react'
import { useState } from 'react'
import { CollaboratorCards } from './collaborator-cards'
import { FormContainer } from './form-container'
import { Button } from './ui/button'

export function TeamSection() {
  const [isFormVisible, setIsFormVisible] = useState(false)

  const toggleFormVisibility = () => {
    setIsFormVisible(!isFormVisible)
  }

  return (
    <section className="px-4 py-12" aria-labelledby="our-teams">
      <div className="mx-auto max-w-7xl">
        <div className="relative mb-8 flex items-center justify-center">
          <h2
            id="our-teams"
            className="mb-6 border-primary border-b-2 px-4 pb-2 text-center font-bold font-prata text-2xl leading-tight tracking-wide"
          >
            Nosso times
          </h2>
          <Button
            onClick={toggleFormVisibility}
            className="absolute right-0 z-50 rounded-full"
            aria-expanded={isFormVisible}
            aria-controls="employee-form"
            variant={isFormVisible ? 'destructive' : 'default'}
            size={'icon'}
          >
            <PlusIcon
              className={` ${isFormVisible ? 'rotate-45' : ''} transition-all `}
            />
            <span className="sr-only">
              {isFormVisible ? 'Fechar' : 'Adicionar'}
            </span>
          </Button>
        </div>
        <FormContainer isFormVisible={isFormVisible} />
        <CollaboratorCards />
      </div>
    </section>
  )
}
