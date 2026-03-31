import { Button } from '@/components/ui/button';
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { cn } from '@/lib/utils';
import { useResumeEditorStore } from '@/stores/use-resume-editor-store';
import {
    ChevronDown,
    Eye,
    EyeOff,
} from 'lucide-react';
import * as React from 'react';

interface SectionWrapperProps {
  id: string
  title: string
  icon: React.ReactNode
  children: React.ReactNode
  defaultOpen?: boolean
}

export function SectionWrapper({
  id,
  title,
  icon,
  children,
  defaultOpen = false,
}: SectionWrapperProps) {
  const [open, setOpen] = React.useState(defaultOpen)
  const hiddenSections = useResumeEditorStore(
    (s) => s.resume.meta.layout.hiddenSections
  )
  const toggleSectionVisibility = useResumeEditorStore(
    (s) => s.toggleSectionVisibility
  )
  const isHidden = hiddenSections.includes(id)

  return (
    <Collapsible open={open} onOpenChange={setOpen}>
      <div
        className={cn(
          'rounded-lg border bg-card transition-colors',
          isHidden && 'opacity-50'
        )}
      >
        <div className='flex items-center justify-between px-4 py-3'>
          <CollapsibleTrigger asChild>
            <button className='flex items-center gap-2 text-sm font-medium hover:text-primary transition-colors'>
              <span className='text-muted-foreground'>{icon}</span>
              {title}
              <ChevronDown
                className={cn(
                  'size-3.5 text-muted-foreground transition-transform',
                  open && 'rotate-180'
                )}
              />
            </button>
          </CollapsibleTrigger>

          <Button
            variant='ghost'
            size='icon'
            className='size-7'
            onClick={() => toggleSectionVisibility(id)}
          >
            {isHidden ? (
              <EyeOff className='size-3.5 text-muted-foreground' />
            ) : (
              <Eye className='size-3.5 text-muted-foreground' />
            )}
          </Button>
        </div>

        <CollapsibleContent>
          <div className='px-4 pb-4 space-y-3'>{children}</div>
        </CollapsibleContent>
      </div>
    </Collapsible>
  )
}
