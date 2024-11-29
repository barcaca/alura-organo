import { Prata, Montserrat } from 'next/font/google'

export const prata = Prata({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-prata',
})

export const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
})
