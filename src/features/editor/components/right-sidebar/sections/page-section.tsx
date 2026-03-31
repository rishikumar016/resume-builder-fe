import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { useResumeEditorStore } from '@/stores/use-resume-editor-store';

export function PageSection() {
  const page = useResumeEditorStore((s) => s.resume.meta.page)
  const updateResumeData = useResumeEditorStore((s) => s.updateResumeData)

  return (
    <div className='space-y-3'>
      <h3 className='text-xs font-semibold text-muted-foreground uppercase tracking-wider'>
        Page Settings
      </h3>

      <div className='space-y-3'>
        <div className='space-y-1.5'>
          <Label className='text-xs'>Paper Format</Label>
          <Select
            value={page.format}
            onValueChange={(v: 'a4' | 'letter') =>
              updateResumeData((draft) => {
                draft.meta.page.format = v
              })
            }
          >
            <SelectTrigger className='h-8 text-xs w-full'>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='a4' className='text-xs'>
                A4 (210 × 297 mm)
              </SelectItem>
              <SelectItem value='letter' className='text-xs'>
                Letter (8.5 × 11 in)
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className='space-y-1.5'>
          <Label className='text-xs'>Margin (px)</Label>
          <Input
            type='number'
            min={0}
            max={100}
            value={page.margin}
            onChange={(e) =>
              updateResumeData((draft) => {
                draft.meta.page.margin = Number(e.target.value) || 0
              })
            }
            className='h-8 text-xs'
          />
        </div>
      </div>
    </div>
  )
}
