import { createFileRoute } from '@tanstack/react-router'
import { Tailoring } from '@/features/tailoring/Tailoring'

export const Route = createFileRoute('/_authenticated/tailoring')({
  component: Tailoring,
})
