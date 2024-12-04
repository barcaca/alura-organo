import { useCollaborator } from '@/contexts/collaborator-context'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'
import { FormFieldText } from './form-field-text'
import { Button } from './ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './ui/form'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select'

const formSchema = z.object({
  name: z.string().min(2, {
    message: 'Nome deve ter pelo menos 2 caracteres.',
  }),
  position: z.string().min(2, {
    message: 'Posição deve ter pelo menos 2 caracteres.',
  }),
  image: z.string().optional(),
  team: z.string({ required_error: 'Selecione um time.' }).min(1, {
    message: 'Selecione um time válido.',
  }),
  favorite: z.boolean().default(false),
})

type FormSchema = z.infer<typeof formSchema>

const defaultValues = {
  name: '',
  position: '',
  image: '',
  team: '',
}

export function EmployeeForm() {
  const {
    addCollaborator,
    state: { teams },
  } = useCollaborator()
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues,
  })

  async function onSubmit(data: FormSchema) {
    const { name, position, image, team, favorite } = data
    const id = crypto.randomUUID()
    const formData = { id, name, position, image, team, favorite }
    console.log(formData)

    addCollaborator(formData)
    form.reset(defaultValues)
    toast.success('Novo colaborador adicionado!', {
      description: `${data.name} foi adicionado ao ${data.team} time.`,
    })
  }

  return (
    <Form {...form}>
      <form
        id="employee-form"
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full max-w-md space-y-4 rounded-lg bg-white p-6 pb-8 shadow-shape"
      >
        <h2 className="mb-4 text-center font-bold font-prata text-2xl">
          Novo Colaborador
        </h2>
        <FormFieldText name="name" label="Nome" placeholder="John Doe" />
        <FormFieldText
          name="position"
          label="Posição"
          placeholder="Software Engineer"
        />
        <FormFieldText
          name="image"
          label="Image URL"
          placeholder="https://images.unsplash.com/photo-1500648767791-00dcc994a43e"
        />
        <FormField
          control={form.control}
          name="team"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-montserrat">Team</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
                value={field.value}
              >
                <FormControl>
                  <SelectTrigger className="font-montserrat">
                    <SelectValue placeholder="Selecione um time" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {teams.map(team => (
                    <SelectItem
                      key={team.name}
                      value={team.name}
                      className="font-montserrat"
                    >
                      {team.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage className="font-montserrat" />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full font-montserrat">
          Criar colaborador
        </Button>
      </form>
    </Form>
  )
}
