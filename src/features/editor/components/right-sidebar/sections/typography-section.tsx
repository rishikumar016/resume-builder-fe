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

const fontFamilies = [
  'Inter',
  'Roboto',
  'Open Sans',
  'Lato',
  'Montserrat',
  'Poppins',
  'Source Sans Pro',
  'Merriweather',
  'Georgia',
  'Times New Roman',
  'Arial',
]

export function TypographySection() {
  const typography = useResumeEditorStore((s) => s.resume.meta.typography)
  const updateResumeData = useResumeEditorStore((s) => s.updateResumeData)

  return (
    <div className='space-y-3'>
      <h3 className='text-xs font-semibold text-muted-foreground uppercase tracking-wider'>
        Typography
      </h3>

      <div className='space-y-3'>
        <div className='space-y-1.5'>
          <Label className='text-xs'>Body Font</Label>
          <Select
            value={typography.fontFamily}
            onValueChange={(v) =>
              updateResumeData((draft) => {
                draft.meta.typography.fontFamily = v
              })
            }
          >
            <SelectTrigger className='h-8 text-xs w-full'>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {fontFamilies.map((f) => (
                <SelectItem key={f} value={f} className='text-xs'>
                  <span style={{ fontFamily: f }}>{f}</span>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className='space-y-1.5'>
          <Label className='text-xs'>Header Font</Label>
          <Select
            value={typography.headerFontFamily}
            onValueChange={(v) =>
              updateResumeData((draft) => {
                draft.meta.typography.headerFontFamily = v
              })
            }
          >
            <SelectTrigger className='h-8 text-xs w-full'>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {fontFamilies.map((f) => (
                <SelectItem key={f} value={f} className='text-xs'>
                  <span style={{ fontFamily: f }}>{f}</span>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className='grid grid-cols-2 gap-3'>
          <div className='space-y-1.5'>
            <Label className='text-xs'>Font Size</Label>
            <Input
              value={typography.fontSize}
              onChange={(e) =>
                updateResumeData((draft) => {
                  draft.meta.typography.fontSize = e.target.value
                })
              }
              placeholder='14px'
              className='h-8 text-xs'
            />
          </div>
          <div className='space-y-1.5'>
            <Label className='text-xs'>Line Height</Label>
            <Input
              value={typography.lineHeight}
              onChange={(e) =>
                updateResumeData((draft) => {
                  draft.meta.typography.lineHeight = e.target.value
                })
              }
              placeholder='1.5'
              className='h-8 text-xs'
            />
          </div>
        </div>
      </div>
    </div>
  )
}
