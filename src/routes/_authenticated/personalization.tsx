import { createFileRoute } from '@tanstack/react-router'
import { Personalization } from '@/features/personalization/Personalization'

export const Route = createFileRoute('/_authenticated/personalization')({
  component: Personalization,
})
