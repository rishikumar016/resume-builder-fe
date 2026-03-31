import { createFileRoute } from '@tanstack/react-router'
import { TemplateRegistry } from '@/features/resume/components/TemplateRegistry'
import { useEffect, useState } from 'react'
import type { ResumeData } from '@/types/resume.types'

// Setup the route to accept an optional token search param
type PrintSearch = {
  token?: string
}

export const Route = createFileRoute('/resume/$id/print')({
  validateSearch: (search: Record<string, unknown>): PrintSearch => ({
    token: typeof search.token === 'string' ? search.token : undefined,
  }),
  component: PrintResumePage,
})

function PrintResumePage() {
  const { id } = Route.useParams()
  const { token } = Route.useSearch()
  
  const [resumeData, setResumeData] = useState<ResumeData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchResume = async () => {
      try {
        setLoading(true)
        
        // Prepare headers. If token is passed in URL, use it for Auth.
        const headers: Record<string, string> = {
          'Content-Type': 'application/json'
        }
        if (token) {
          headers['Authorization'] = `Bearer ${token}`
        }

        const backendUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'
        
        const response = await fetch(`${backendUrl}/resumes/${id}`, {
          method: 'GET',
          headers,
        })

        if (!response.ok) {
          throw new Error(`Failed to load resume: ${response.status} ${response.statusText}`)
        }

        const json = await response.json()
        if (json.success && json.data) {
          setResumeData(json.data)
        } else {
          throw new Error('Resume data format is invalid')
        }
      } catch (err: any) {
        console.error("Failed to load resume for printing", err)
        setError(err.message || 'Unknown error occurred')
      } finally {
        setLoading(false)
      }
    }

    fetchResume()
  }, [id, token])

  if (loading) {
    return <div className="p-10 text-center font-sans text-gray-500">Preparing PDF for export...</div>
  }

  if (error || !resumeData) {
    return <div className="p-10 text-center text-red-500 font-sans">{error || 'Resume not found'}</div>
  }

  const SelectedTemplate = TemplateRegistry[resumeData.meta?.theme || "modern"] || TemplateRegistry["modern"]

  const colorPalette = resumeData.meta?.colorPalette || { primary: '#000', text: '#000', background: '#fff' }
  const typography = resumeData.meta?.typography || { fontFamily: 'sans-serif', fontSize: '14px' }

  const dynamicStyles = {
    "--color-primary": colorPalette.primary,
    "--color-secondary": colorPalette.secondary || colorPalette.primary,
    "--color-text": colorPalette.text,
    "--color-bg": colorPalette.background,
    "--font-main": typography.fontFamily,
    "--font-size-base": typography.fontSize,
  } as React.CSSProperties

  return (
    <div style={dynamicStyles} className="print-mode-wrapper bg-white min-h-screen">
      <div className="w-full h-full bg-[color:var(--color-bg)] print:m-0 print:p-0">
        <SelectedTemplate data={resumeData} />
      </div>
    </div>
  )
}
