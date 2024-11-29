import { useCollaborator } from '@/contexts/collaborator-context'
import { zodResolver } from '@hookform/resolvers/zod'
import Image from 'next/image'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'
import imagePlaceholder from '../public/placeholder-image.svg'
import { FormFieldText } from './form-field-text'
import { Button } from './ui/button'
import { Card, CardContent, CardTitle } from './ui/card'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './ui/form'
import { Input } from './ui/input'

const formSchema = z.object({
  name: z.string().min(2, {
    message: 'Nome deve ter pelo menos 2 caracteres.',
  }),
  color: z.string().refine(color => /^#[0-9A-Fa-f]{6}$/.test(color), {
    message: 'Invalid color format. Use hex color code (e.g., #FF0000).',
  }),
})

type FormSchema = z.infer<typeof formSchema>

export function TeamRegistrationForm() {
  const { teams, addTeam } = useCollaborator()
  const [selectedColor, setSelectedColor] = useState('#000000')

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      color: '#000000',
    },
  })

  function onSubmit(data: FormSchema) {
    const alreadyExists = teams.some(
      team => team.name.toLowerCase() === data.name.toLowerCase()
    )

    if (alreadyExists) {
      form.setError('name', {
        type: 'manual',
        message: 'Já existe um time com esse nome.',
      })
      return
    }
    addTeam(data)
    form.reset()
    setSelectedColor('#000000')
    toast.success('Novo time adicionado!', {
      description: `${data.name} foi adicionado com a cor ${data.color}.`,
    })
  }

  return (
    <Form {...form}>
      <form
        id="team-registration-form"
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full max-w-md space-y-4 rounded-lg bg-white p-6 pb-8 shadow-shape"
      >
        <h2 className="mb-4 text-center font-bold font-prata text-2xl">
          Novo Time
        </h2>
        <FormFieldText name="name" label="Nome do time" placeholder="Time A" />
        <FormField
          control={form.control}
          name="color"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-montserrat">Cor do time</FormLabel>
              <div className="flex items-center gap-2">
                <Input
                  type="color"
                  {...field}
                  className="h-10 w-20 cursor-pointer rounded-md p-1"
                  onChange={e => {
                    field.onChange(e)
                    setSelectedColor(e.target.value)
                  }}
                />
                <FormControl>
                  <Input
                    type="text"
                    value={field.value}
                    onChange={e => {
                      let value = e.target.value
                        .replace(/[^0-9A-Fa-f]/g, '')
                        .slice(0, 6)
                      if (!value.startsWith('#')) {
                        value = `#${value}`
                      }
                      field.onChange(value)
                      setSelectedColor(value)
                    }}
                    placeholder="#000000"
                    className="flex-grow font-montserrat"
                    maxLength={7}
                  />
                </FormControl>
              </div>
              <FormMessage className="font-montserrat" />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full font-montserrat">
          Adicionar Time
        </Button>
        <div>
          <h3 className="mb-1 font-medium text-sm leading-none">Previa</h3>
          <Card className={'relative overflow-hidden border-0 shadow-shape'}>
            <div
              className={'absolute top-0 h-1/3 w-full '}
              style={{ backgroundColor: `${selectedColor}` }}
            />
            <CardContent className="flex flex-col items-center p-3">
              <figure className="z-20 h-16 w-16 overflow-hidden rounded-full">
                <Image
                  src={imagePlaceholder}
                  alt={'John Doe example'}
                  width={128}
                  height={128}
                  className="h-full w-full object-cover"
                  aria-hidden={true}
                />
              </figure>
              <CardTitle className="mb-2 text-center font-prata leading-tight tracking-wide">
                JohnDoe
              </CardTitle>
              <p className="text-center font-montserrat text-muted-foreground text-xs leading-relaxed">
                Software Engineer
              </p>
            </CardContent>
          </Card>
        </div>
      </form>
    </Form>
  )
}
