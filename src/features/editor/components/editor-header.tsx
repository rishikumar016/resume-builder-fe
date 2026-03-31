import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { useAutosave } from '@/hooks/use-autosave';
import { cn } from '@/lib/utils';
import { useResumeEditorStore } from '@/stores/use-resume-editor-store';
import { useNavigate } from '@tanstack/react-router';
import {
    Check,
    ChevronLeft,
    Download,
    FileText,
    Loader2,
    Redo2,
    Undo2
} from 'lucide-react';

export function EditorHeader() {
  const navigate = useNavigate()
  const title = useResumeEditorStore((s) => s.resume.title)
  const updateResumeData = useResumeEditorStore((s) => s.updateResumeData)
  const undo = useResumeEditorStore((s) => s.undo)
  const redo = useResumeEditorStore((s) => s.redo)
  const canUndo = useResumeEditorStore((s) => s.canUndo())
  const canRedo = useResumeEditorStore((s) => s.canRedo())
  const { isDirty, isSaving } = useAutosave()

  return (
    <header className='flex h-14 shrink-0 items-center gap-2 border-b bg-background px-4'>
      {/* Back button */}
      <Button
        variant='ghost'
        size='icon'
        className='size-8'
        onClick={() => navigate({ to: '/dashboard' })}
      >
        <ChevronLeft className='size-4' />
      </Button>

      <Separator orientation='vertical' className='h-5' />

      {/* Document icon + title */}
      <div className='flex items-center gap-2 min-w-0'>
        <FileText className='size-4 shrink-0 text-primary' />
        <input
          type='text'
          value={title}
          onChange={(e) =>
            updateResumeData((draft) => {
              draft.title = e.target.value
            })
          }
          className='bg-transparent text-sm font-semibold outline-none border-none truncate max-w-[200px] focus:ring-1 focus:ring-primary/30 rounded px-1'
        />
      </div>

      <div className='ml-auto flex items-center gap-1'>
        {/* Save indicator */}
        <span
          className={cn(
            'text-xs text-muted-foreground mr-2 flex items-center gap-1 transition-opacity',
            !isDirty && !isSaving && 'opacity-60'
          )}
        >
          {isSaving ? (
            <>
              <Loader2 className='size-3 animate-spin' />
              Saving…
            </>
          ) : isDirty ? (
            <>
              <span className='size-1.5 rounded-full bg-amber-500 inline-block' />
              Unsaved
            </>
          ) : (
            <>
              <Check className='size-3 text-green-600' />
              Saved
            </>
          )}
        </span>

        <Separator orientation='vertical' className='h-5' />

        {/* Undo */}
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant='ghost'
              size='icon'
              className='size-8'
              disabled={!canUndo}
              onClick={undo}
            >
              <Undo2 className='size-4' />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Undo (Ctrl+Z)</TooltipContent>
        </Tooltip>

        {/* Redo */}
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant='ghost'
              size='icon'
              className='size-8'
              disabled={!canRedo}
              onClick={redo}
            >
              <Redo2 className='size-4' />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Redo (Ctrl+Shift+Z)</TooltipContent>
        </Tooltip>

        <Separator orientation='vertical' className='h-5' />

        {/* Export */}
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant='ghost' size='icon' className='size-8'>
              <Download className='size-4' />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Export PDF</TooltipContent>
        </Tooltip>
      </div>
    </header>
  )
}
