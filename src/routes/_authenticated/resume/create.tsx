import { createFileRoute } from '@tanstack/react-router'
import { CreateResume } from '@/features/resume/create'

export const Route = createFileRoute('/_authenticated/resume/create')({
  component: CreateResume,
})
