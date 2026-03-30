import { createFileRoute } from '@tanstack/react-router'
import { AuthenticatedLayout } from '@/components/layout/authenticated-layout'

export const Route = createFileRoute('/_authenticated')({
  beforeLoad: async () => {
    // Bypassed for dummy data UI creation per user request
    return
  },
  component: AuthenticatedLayout,
})
