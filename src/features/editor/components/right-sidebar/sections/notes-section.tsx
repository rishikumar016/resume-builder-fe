import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useResumeEditorStore } from '@/stores/use-resume-editor-store';

export function NotesSection() {
  const notes = useResumeEditorStore((s) => s.resume.meta.notes)
  const updateResumeData = useResumeEditorStore((s) => s.updateResumeData)

  return (
    <div className='space-y-3'>
      <h3 className='text-xs font-semibold text-muted-foreground uppercase tracking-wider'>
        Notes
      </h3>
      <div className='space-y-1.5'>
        <Label className='text-xs text-muted-foreground'>
          Private notes — not shown on the resume.
        </Label>
        <Textarea
          value={notes}
          onChange={(e) =>
            updateResumeData((draft) => {
              draft.meta.notes = e.target.value
            })
          }
          placeholder='Your personal notes about this resume...'
          className='min-h-[80px] text-sm resize-y'
        />
      </div>
    </div>
  )
}
