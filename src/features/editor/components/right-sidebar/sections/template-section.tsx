import { cn } from '@/lib/utils';
import { useResumeEditorStore } from '@/stores/use-resume-editor-store';
import { Check } from 'lucide-react';

const templates = [
  {
    id: 'executive',
    name: 'Executive',
    description: 'Clean & professional',
    accent: 'bg-primary',
  },
  {
    id: 'creative',
    name: 'Creative',
    description: 'Modern & bold',
    accent: 'bg-emerald-500',
  },
  {
    id: 'startup',
    name: 'Startup',
    description: 'Minimal & sharp',
    accent: 'bg-violet-500',
  },
] as const

export function TemplateSection() {
  const currentTemplate = useResumeEditorStore(
    (s) => s.resume.meta.template
  )
  const updateResumeData = useResumeEditorStore((s) => s.updateResumeData)

  return (
    <div className='space-y-3'>
      <h3 className='text-xs font-semibold text-muted-foreground uppercase tracking-wider'>
        Template
      </h3>
      <div className='grid grid-cols-3 gap-2'>
        {templates.map((t) => (
          <button
            key={t.id}
            onClick={() =>
              updateResumeData((draft) => {
                draft.meta.template = t.id
              })
            }
            className={cn(
              'relative rounded-lg border-2 p-3 text-left transition-all hover:border-primary/50',
              currentTemplate === t.id
                ? 'border-primary bg-primary/5'
                : 'border-border'
            )}
          >
            {currentTemplate === t.id && (
              <div className='absolute -top-1.5 -right-1.5 size-5 rounded-full bg-primary flex items-center justify-center'>
                <Check className='size-3 text-primary-foreground' />
              </div>
            )}
            <div
              className={cn('h-1 w-8 rounded-full mb-2', t.accent)}
            />
            <p className='text-xs font-medium'>{t.name}</p>
            <p className='text-[10px] text-muted-foreground'>
              {t.description}
            </p>
          </button>
        ))}
      </div>
    </div>
  )
}
