import { createFileRoute } from '@tanstack/react-router'
import { Processing } from '@/features/processing/Processing'

export const Route = createFileRoute('/_authenticated/processing')({
  component: Processing,
})
