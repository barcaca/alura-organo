import { EmployeeForm } from './employee-form'
import { TeamRegistrationForm } from './team-registration-form'

interface FormContainerProps {
  isFormVisible: boolean
}
export function FormContainer({ isFormVisible }: FormContainerProps) {
  return (
    <div
      id="employee-form"
      className="mb-6 flex flex-col items-center justify-center gap-2 overflow-hidden transition-all duration-300 ease-in-out data-[state=closed]:h-0 data-[state=open]:px-0.5 data-[state=open]:py-3 sm:flex-row"
      style={{
        opacity: isFormVisible ? 1 : 0,
      }}
      aria-hidden={!isFormVisible}
      data-state={isFormVisible ? 'open' : 'closed'}
    >
      <EmployeeForm />
      <TeamRegistrationForm />
    </div>
  )
}
