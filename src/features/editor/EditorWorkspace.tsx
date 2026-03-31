import { Button } from '@/components/ui/button';
import { TooltipProvider } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import { defaultResumeData } from '@/schema/resume.schema';
import { useResumeEditorStore } from '@/stores/use-resume-editor-store';
import { PanelLeft, PanelRight } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Artboard } from './components/artboard';
import { EditorHeader } from './components/editor-header';
import { LeftSidebar } from './components/left-sidebar';
import { RightSidebar } from './components/right-sidebar';

export function EditorWorkspace() {
  const isInitialized = useResumeEditorStore((s) => s.isInitialized)
  const initialize = useResumeEditorStore((s) => s.initialize)
  const undo = useResumeEditorStore((s) => s.undo)
  const redo = useResumeEditorStore((s) => s.redo)

  const [leftOpen, setLeftOpen] = useState(true)
  const [rightOpen, setRightOpen] = useState(true)

  // Initialize with default data (replace with API fetch when backend is ready)
  useEffect(() => {
    if (!isInitialized) {
      initialize(defaultResumeData)
    }
  }, [isInitialized, initialize])

  // Global keyboard shortcuts
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const mod = e.ctrlKey || e.metaKey
      if (mod && e.key === 'z' && !e.shiftKey) {
        e.preventDefault()
        undo()
      }
      if (mod && e.key === 'z' && e.shiftKey) {
        e.preventDefault()
        redo()
      }
      if (mod && e.key === 'y') {
        e.preventDefault()
        redo()
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [undo, redo])

  if (!isInitialized) {
    return (
      <div className='flex h-svh items-center justify-center'>
        <div className='animate-pulse text-sm text-muted-foreground'>
          Loading editor…
        </div>
      </div>
    )
  }

  return (
    <TooltipProvider delayDuration={200}>
      <div className='flex h-svh flex-col overflow-hidden bg-background'>
        {/* Editor Header */}
        <EditorHeader />

        {/* Main editor body */}
        <div className='flex flex-1 overflow-hidden'>
          {/* Left sidebar toggle */}
          <div className='flex items-start pt-2 pl-1'>
            <Button
              variant='ghost'
              size='icon'
              className='size-7'
              onClick={() => setLeftOpen((v) => !v)}
            >
              <PanelLeft className='size-4' />
            </Button>
          </div>

          {/* Left sidebar — content editing */}
          <div
            className={cn(
              'shrink-0 border-r bg-card transition-all duration-300 overflow-hidden',
              leftOpen ? 'w-80' : 'w-0'
            )}
          >
            <LeftSidebar />
          </div>

          {/* Artboard — live preview */}
          <Artboard />

          {/* Right sidebar — design controls */}
          <div
            className={cn(
              'shrink-0 border-l bg-card transition-all duration-300 overflow-hidden',
              rightOpen ? 'w-72' : 'w-0'
            )}
          >
            <RightSidebar />
          </div>

          {/* Right sidebar toggle */}
          <div className='flex items-start pt-2 pr-1'>
            <Button
              variant='ghost'
              size='icon'
              className='size-7'
              onClick={() => setRightOpen((v) => !v)}
            >
              <PanelRight className='size-4' />
            </Button>
          </div>
        </div>
      </div>
    </TooltipProvider>
  )
}
