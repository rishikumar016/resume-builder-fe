import * as React from 'react'
import { useNavigate } from '@tanstack/react-router'
import { Upload, FileType } from 'lucide-react'
import { useOnboardingStore } from '@/stores/use-onboarding'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

interface UploadModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function UploadModal({ open, onOpenChange }: UploadModalProps) {
  const [isUploading, setIsUploading] = React.useState(false)
  const setResumeSource = useOnboardingStore((state) => state.setResumeSource)
  const navigate = useNavigate()

  const handleSimulateUpload = () => {
    setIsUploading(true)
    setTimeout(() => {
      setIsUploading(false)
      setResumeSource('upload')
      onOpenChange(false)
      // Map to template selection step directly after upload
      navigate({ to: '/templates' })
    }, 1500)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='border-outline-variant/20 bg-surface-container-lowest sm:max-w-md'>
        <DialogHeader>
          <DialogTitle className='font-manrope text-2xl font-bold'>
            Upload Resume
          </DialogTitle>
          <DialogDescription className='font-inter'>
            Select a source to import your existing resume data.
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue='local' className='mt-4 w-full'>
          <TabsList className='grid w-full grid-cols-3 bg-surface-container-low'>
            <TabsTrigger
              value='local'
              className='data-[state=active]:bg-brand-green data-[state=active]:text-brand-green-foreground'
            >
              Local
            </TabsTrigger>
            <TabsTrigger
              value='drive'
              className='data-[state=active]:bg-brand-green data-[state=active]:text-brand-green-foreground'
            >
              Drive
            </TabsTrigger>
            <TabsTrigger
              value='linkedin'
              className='data-[state=active]:bg-brand-green data-[state=active]:text-brand-green-foreground'
            >
              LinkedIn
            </TabsTrigger>
          </TabsList>

          <TabsContent value='local' className='mt-4'>
            <div className='flex cursor-pointer flex-col items-center justify-center gap-4 rounded-xl border-2 border-dashed border-outline-variant/50 p-8 text-center transition-colors hover:bg-surface-container-low'>
              <div className='rounded-full bg-primary/10 p-4'>
                <Upload className='size-8 text-primary' />
              </div>
              <div>
                <p className='font-semibold'>
                  Click or drag file to this area to upload
                </p>
                <p className='mt-1 text-sm text-muted-foreground'>
                  Supports PDF, DOCX (Max 5MB)
                </p>
              </div>
              <Button
                onClick={handleSimulateUpload}
                disabled={isUploading}
                className='mt-2 bg-[linear-gradient(to_right,var(--color-primary),var(--color-tertiary-container))] text-white hover:opacity-90'
              >
                {isUploading ? 'Parsing Document...' : 'Select File'}
              </Button>
            </div>
          </TabsContent>

          <TabsContent value='drive' className='mt-4'>
            <div className='flex flex-col items-center justify-center gap-4 rounded-xl border bg-surface-container-low p-8 text-center'>
              <FileType className='size-12 text-muted-foreground' />
              <p className='font-semibold'>Import from Google Drive</p>
              <Button
                onClick={handleSimulateUpload}
                variant='outline'
                className='mt-2'
                disabled={isUploading}
              >
                Connect Google Drive
              </Button>
            </div>
          </TabsContent>

          <TabsContent value='linkedin' className='mt-4'>
            <div className='flex flex-col items-center justify-center gap-4 rounded-xl border border-[#0a66c2]/20 bg-[#0a66c2]/10 p-8 text-center'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 24 24'
                fill='currentColor'
                className='size-12 rounded bg-white text-[#0a66c2]'
              >
                <path d='M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z' />
              </svg>
              <p className='font-semibold'>
                Import your LinkedIn Public Profile
              </p>
              <Button
                onClick={handleSimulateUpload}
                className='mt-2 bg-[#0a66c2] text-white hover:bg-[#084e96]'
                disabled={isUploading}
              >
                Sign in with LinkedIn
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
