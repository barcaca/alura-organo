import { Skeleton } from './ui/skeleton'

export function CollaboratorCardSkeleton() {
  return (
    <Skeleton
      className="relative mb-12 rounded-lg p-6 shadow-md "
      aria-labelledby="skeleton-team"
    >
      <Skeleton className="absolute top-4 right-4 h-8 w-20 rounded-md" />
      <div className="flex items-center justify-center py-6">
        <Skeleton className="h-8 w-48 rounded-md" />
      </div>
      <ul className="grid list-none grid-cols-1 gap-6 p-0 md:grid-cols-2 lg:grid-cols-3">
        {[...Array(3)].map((_, index) => (
          // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
          <li key={index}>
            <div className="relative rounded-lg border-0 shadow-md">
              <Skeleton className="absolute top-0 h-1/3 w-full rounded-t-lg " />
              <div className="flex flex-col items-center p-6">
                <Skeleton className="z-20 mx-auto mb-4 h-32 w-32 rounded-full bg-primary/20" />
                <Skeleton className="mb-2 h-6 w-32 rounded-md" />
                <Skeleton className="h-4 w-48 rounded-md" />
              </div>
              <Skeleton className="absolute bottom-2 left-2 h-8 w-8 rounded-full" />
              <Skeleton className="-right-2 -bottom-2 absolute h-8 w-8 rounded-full" />
            </div>
          </li>
        ))}
      </ul>
    </Skeleton>
  )
}
