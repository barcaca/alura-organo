import { useFormContext } from 'react-hook-form'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './ui/form'
import { Input } from './ui/input'

interface FormFieldTextProps {
  name: string
  label: string
  placeholder: string
}

export function FormFieldText({
  name,
  label,
  placeholder,
}: FormFieldTextProps) {
  const { control } = useFormContext()
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="font-montserrat">{label}</FormLabel>
          <FormControl>
            <Input
              placeholder={placeholder}
              {...field}
              className="font-montserrat"
            />
          </FormControl>
          <FormMessage className="font-montserrat" />
        </FormItem>
      )}
    />
  )
}
