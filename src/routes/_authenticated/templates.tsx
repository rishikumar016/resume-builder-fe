import { createFileRoute } from '@tanstack/react-router'
import { TemplateGallery } from '@/features/templates/TemplateGallery'

export const Route = createFileRoute('/_authenticated/templates')({
  component: TemplateGallery,
})
