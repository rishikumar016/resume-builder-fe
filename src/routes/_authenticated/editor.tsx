import { createFileRoute } from '@tanstack/react-router'
import { EditorWorkspace } from '@/features/editor/EditorWorkspace'

export const Route = createFileRoute('/_authenticated/editor')({
  component: EditorWorkspace,
})
