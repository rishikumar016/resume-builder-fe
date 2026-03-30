import { createFileRoute } from '@tanstack/react-router'
import { LatexEditor } from '@/features/editor/LatexEditor'

export const Route = createFileRoute('/_authenticated/latex-editor')({
  component: LatexEditor,
})
