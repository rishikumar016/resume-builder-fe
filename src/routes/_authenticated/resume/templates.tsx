import { createFileRoute } from '@tanstack/react-router'
import { TemplateGallery } from '@/features/resume/create/templates/TemplateGallery'

export const Route = createFileRoute('/_authenticated/resume/templates')({
  component: TemplateGallery,
})
