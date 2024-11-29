import { Network } from 'lucide-react'
import Image from 'next/image'

export default function Banner() {
  return (
    <header className="bg-gradient-to-r from-blue-600 to-blue-800">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between md:flex-row">
          <div className="space-y-4 text-center text-primary-foreground md:text-left">
            <div className="flex items-center justify-center gap-3 md:justify-start">
              <Network className="h-12 w-12" />
              <h1 className="font-extrabold font-prata text-3xl leading-tight tracking-wide sm:text-4xl lg:text-5xl ">
                organo
              </h1>
            </div>
            <p className="text-xl leading-relaxed sm:text-2xl">
              Organize e celebre o talento da sua equipe em um lindo lugar
            </p>
          </div>
          <div className="flex h-full w-full justify-center md:justify-end">
            <figure className="relative aspect-square w-full max-w-lg">
              <Image
                src="/organo-example.png"
                alt="Organizational chart example"
                fill
                className="h-full w-full rounded-lg object-contain "
              />
              <figcaption className="sr-only">
                An example of an organizational chart created with Organo
              </figcaption>
            </figure>
          </div>
        </div>
      </div>
    </header>
  )
}
