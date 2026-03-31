import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useResumeEditorStore } from '@/stores/use-resume-editor-store';

const colorFields = [
  { key: 'primary' as const, label: 'Primary' },
  { key: 'secondary' as const, label: 'Secondary' },
  { key: 'accent' as const, label: 'Accent' },
  { key: 'text' as const, label: 'Text' },
  { key: 'background' as const, label: 'Background' },
]

const presets = [
  { primary: '#005bbf', text: '#1a1a2e', background: '#ffffff' },
  { primary: '#059669', text: '#111827', background: '#ffffff' },
  { primary: '#7c3aed', text: '#1f2937', background: '#ffffff' },
  { primary: '#dc2626', text: '#1c1917', background: '#ffffff' },
  { primary: '#ea580c', text: '#1a1a2e', background: '#ffffff' },
  { primary: '#0891b2', text: '#1e293b', background: '#ffffff' },
]

export function ColorsSection() {
  const colors = useResumeEditorStore((s) => s.resume.meta.colorPalette)
  const updateResumeData = useResumeEditorStore((s) => s.updateResumeData)

  return (
    <div className='space-y-3'>
      <h3 className='text-xs font-semibold text-muted-foreground uppercase tracking-wider'>
        Colors
      </h3>

      {/* Presets */}
      <div className='flex gap-1.5'>
        {presets.map((preset, i) => (
          <button
            key={i}
            className='size-6 rounded-full border-2 border-background shadow-sm ring-1 ring-border hover:scale-110 transition-transform'
            style={{ backgroundColor: preset.primary }}
            onClick={() =>
              updateResumeData((draft) => {
                draft.meta.colorPalette.primary = preset.primary
                draft.meta.colorPalette.text = preset.text
                draft.meta.colorPalette.background = preset.background
              })
            }
          />
        ))}
      </div>

      {/* Color pickers */}
      <div className='space-y-2'>
        {colorFields.map(({ key, label }) => (
          <div key={key} className='flex items-center gap-2'>
            <input
              type='color'
              value={colors[key] || '#000000'}
              onChange={(e) =>
                updateResumeData((draft) => {
                  draft.meta.colorPalette[key] = e.target.value
                })
              }
              className='size-7 rounded border cursor-pointer p-0.5'
            />
            <Label className='text-xs flex-1'>{label}</Label>
            <Input
              value={colors[key] || ''}
              onChange={(e) =>
                updateResumeData((draft) => {
                  draft.meta.colorPalette[key] = e.target.value
                })
              }
              className='h-7 w-20 text-xs font-mono'
            />
          </div>
        ))}
      </div>
    </div>
  )
}
