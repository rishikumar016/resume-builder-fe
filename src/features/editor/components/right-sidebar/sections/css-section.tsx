import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useResumeEditorStore } from '@/stores/use-resume-editor-store';

export function CssSection() {
  const css = useResumeEditorStore((s) => s.resume.meta.css)
  const updateResumeData = useResumeEditorStore((s) => s.updateResumeData)

  return (
    <div className='space-y-3'>
      <h3 className='text-xs font-semibold text-muted-foreground uppercase tracking-wider'>
        Custom CSS
      </h3>
      <div className='space-y-1.5'>
        <Label className='text-xs text-muted-foreground'>
          Apply custom CSS to the resume preview. Scoped to the preview
          container.
        </Label>
        <Textarea
          value={css}
          onChange={(e) =>
            updateResumeData((draft) => {
              draft.meta.css = e.target.value
            })
          }
          placeholder={`.resume-header {\n  border-bottom: 2px solid #333;\n}`}
          className='min-h-[120px] font-mono text-xs resize-y'
        />
      </div>
    </div>
  )
}
