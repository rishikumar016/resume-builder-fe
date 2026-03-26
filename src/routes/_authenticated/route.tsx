import { createFileRoute, redirect } from '@tanstack/react-router'
import { authApi } from '@/api/modules/auth'
import { useAuthStore } from '@/stores/auth-store'
import { AuthenticatedLayout } from '@/components/layout/authenticated-layout'

export const Route = createFileRoute('/_authenticated')({
  beforeLoad: async () => {
    const { accessToken, user, setAccessToken, setUser, reset } =
      useAuthStore.getState()

    // Already authenticated — skip network call
    if (accessToken && user) return

    // If we have an access token but no user, fetch the user
    if (accessToken) {
      try {
        const { data } = await authApi.getUser()
        setUser(data.user)
        return
      } catch {
        // Token might be expired — fall through to refresh
      }
    }

    // Attempt silent refresh via httpOnly cookie
    try {
      const { data } = await authApi.refreshToken()
      setAccessToken(data.accessToken)

      const userRes = await authApi.getUser()
      setUser(userRes.data.user)
    } catch {
      reset()
      throw redirect({
        to: '/sign-in',
        search: { redirect: location.pathname },
      })
    }
  },
  component: AuthenticatedLayout,
})
