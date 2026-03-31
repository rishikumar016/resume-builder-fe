import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useResumeEditorStore } from '@/stores/use-resume-editor-store';
import {
    ArrowDown,
    ArrowUp,
    Eye,
    EyeOff,
    GripVertical,
} from 'lucide-react';

const sectionLabels: Record<string, string> = {
  work: 'Work Experience',
  education: 'Education',
  skills: 'Skills',
  projects: 'Projects',
  certificates: 'Certifications',
  languages: 'Languages',
  awards: 'Awards',
  publications: 'Publications',
  volunteer: 'Volunteer',
  interests: 'Interests',
  references: 'References',
}

export function LayoutSection() {
  const order = useResumeEditorStore((s) => s.resume.meta.layout.order)
  const hiddenSections = useResumeEditorStore(
    (s) => s.resume.meta.layout.hiddenSections
  )
  const reorderSections = useResumeEditorStore((s) => s.reorderSections)
  const toggleSectionVisibility = useResumeEditorStore(
    (s) => s.toggleSectionVisibility
  )

  const moveSection = (from: number, to: number) => {
    const newOrder = [...order]
    const [item] = newOrder.splice(from, 1)
    newOrder.splice(to, 0, item)
    reorderSections(newOrder)
  }

  return (
    <div className='space-y-3'>
      <h3 className='text-xs font-semibold text-muted-foreground uppercase tracking-wider'>
        Section Order
      </h3>

      <div className='space-y-1'>
        {order.map((sectionId, index) => {
          const isHidden = hiddenSections.includes(sectionId)
          return (
            <div
              key={sectionId}
              className={cn(
                'flex items-center gap-2 rounded-md border px-2 py-1.5 text-xs',
                isHidden && 'opacity-50'
              )}
            >
              <GripVertical className='size-3 text-muted-foreground shrink-0' />
              <span className='flex-1 font-medium'>
                {sectionLabels[sectionId] || sectionId}
              </span>
              <Button
                variant='ghost'
                size='icon'
                className='size-5'
                disabled={index === 0}
                onClick={() => moveSection(index, index - 1)}
              >
                <ArrowUp className='size-3' />
              </Button>
              <Button
                variant='ghost'
                size='icon'
                className='size-5'
                disabled={index === order.length - 1}
                onClick={() => moveSection(index, index + 1)}
              >
                <ArrowDown className='size-3' />
              </Button>
              <Button
                variant='ghost'
                size='icon'
                className='size-5'
                onClick={() => toggleSectionVisibility(sectionId)}
              >
                {isHidden ? (
                  <EyeOff className='size-3' />
                ) : (
                  <Eye className='size-3' />
                )}
              </Button>
            </div>
          )
        })}
      </div>
    </div>
  )
}
