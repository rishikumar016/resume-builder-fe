import { createFileRoute } from '@tanstack/react-router'
import { MyResume } from '@/features/resume/my-resume'

export const Route = createFileRoute('/_authenticated/resume/my-resume')({
  component: MyResume,
})
