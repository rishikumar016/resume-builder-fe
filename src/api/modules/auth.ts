import axios, { type InternalAxiosRequestConfig } from 'axios'
import { useMutation } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'
import { useAuthStore } from '@/stores/auth-store'

const baseURL = import.meta.env.VITE_BASE_URL

export const apiClient = axios.create({
  baseURL,
  withCredentials: true,
})

// ── Request interceptor: attach access token ──────────────────────────
apiClient.interceptors.request.use((config) => {
  const token = useAuthStore.getState().accessToken
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// ── Response interceptor: silent refresh on 401 ──────────────────────
let isRefreshing = false
let failedQueue: {
  resolve: (token: string) => void
  reject: (err: unknown) => void
}[] = []

function processQueue(error: unknown, token: string | null) {
  failedQueue.forEach(({ resolve, reject }) => {
    if (token) resolve(token)
    else reject(error)
  })
  failedQueue = []
}

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean
    }

    // Only attempt refresh for 401 errors that haven't been retried
    // and that aren't the refresh-token endpoint itself
    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url?.includes('/auth/refresh-token')
    ) {
      // If a refresh is already in progress, queue this request
      if (isRefreshing) {
        return new Promise<string>((resolve, reject) => {
          failedQueue.push({ resolve, reject })
        }).then((token) => {
          originalRequest.headers.Authorization = `Bearer ${token}`
          return apiClient(originalRequest)
        })
      }

      originalRequest._retry = true
      isRefreshing = true

      try {
        const { data } = await axios.get(`${baseURL}/auth/refresh-token`, {
          withCredentials: true,
        })

        const newToken: string = data.accessToken
        useAuthStore.getState().setAccessToken(newToken)
        processQueue(null, newToken)

        originalRequest.headers.Authorization = `Bearer ${newToken}`
        return apiClient(originalRequest)
      } catch (refreshError) {
        processQueue(refreshError, null)
        useAuthStore.getState().reset()
        return Promise.reject(refreshError)
      } finally {
        isRefreshing = false
      }
    }

    return Promise.reject(error)
  }
)

// ── Types ─────────────────────────────────────────────────────────────
interface LoginData {
  email: string
  password: string
}

interface SignupData {
  firstName: string
  lastName: string
  email: string
  password: string
}

// ── Raw API calls ─────────────────────────────────────────────────────
export const authApi = {
  login: (data: LoginData) =>
    apiClient.post<{ accessToken: string }>('/auth/login', {
      email: data.email,
      password: data.password,
    }),

  register: (data: SignupData) =>
    apiClient.post<{ message: string }>('/auth/register', {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      password: data.password,
    }),

  logout: () => apiClient.get('/auth/logout'),

  refreshToken: () =>
    apiClient.get<{ accessToken: string }>('/auth/refresh-token'),

  getUser: () =>
    apiClient.get('/auth/get-user', {
      headers: { 'Cache-Control': 'no-cache' },
    }),
}

// ── TanStack Query hooks ──────────────────────────────────────────────

export function useLogin() {
  const { setAccessToken } = useAuthStore()

  return useMutation({
    mutationFn: (data: LoginData) => authApi.login(data),
    onSuccess: (response) => {
      setAccessToken(response.data.accessToken)
    },
  })
}

export function useRegister() {
  return useMutation({
    mutationFn: (data: SignupData) => authApi.register(data),
  })
}

export function useLogout() {
  const { reset } = useAuthStore()
  const navigate = useNavigate()

  return useMutation({
    mutationFn: () => authApi.logout(),
    onSettled: () => {
      reset()
      navigate({ to: '/sign-in' })
    },
  })
}

export function useFetchUser() {
  const { setUser } = useAuthStore()

  return useMutation({
    mutationFn: () => authApi.getUser(),
    onSuccess: (response) => {
      setUser(response.data.user)
    },
    onError: () => {
      useAuthStore.getState().reset()
    },
  })
}
