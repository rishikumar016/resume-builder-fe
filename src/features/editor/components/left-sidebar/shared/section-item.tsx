import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import type { SectionKey } from '@/schema/resume.schema';
import { useResumeEditorStore } from '@/stores/use-resume-editor-store';
import {
    ArrowDown,
    ArrowUp,
    Eye,
    EyeOff,
    GripVertical,
    Pencil,
    Trash2,
} from 'lucide-react';

interface SectionItemProps {
  section: SectionKey
  index: number
  title: string
  subtitle?: string
  totalItems: number
  onEdit: () => void
}

export function SectionItem({
  section,
  index,
  title,
  subtitle,
  totalItems,
  onEdit,
}: SectionItemProps) {
  const deleteSectionItem = useResumeEditorStore((s) => s.deleteSectionItem)
  const reorderSectionItem = useResumeEditorStore((s) => s.reorderSectionItem)
  const toggleItemVisibility = useResumeEditorStore(
    (s) => s.toggleItemVisibility
  )
  const item = useResumeEditorStore(
    (s) => (s.resume[section] as Array<{ visible: boolean }>)[index]
  )
  const isVisible = item?.visible !== false

  return (
    <div
      className={cn(
        'group flex items-center gap-2 rounded-md border bg-background p-2 transition-colors hover:bg-accent/50',
        !isVisible && 'opacity-50'
      )}
    >
      <GripVertical className='size-4 text-muted-foreground shrink-0 cursor-grab' />

      <div className='flex-1 min-w-0 cursor-pointer' onClick={onEdit}>
        <p className='text-sm font-medium truncate'>{title || 'Untitled'}</p>
        {subtitle && (
          <p className='text-xs text-muted-foreground truncate'>{subtitle}</p>
        )}
      </div>

      <div className='flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity'>
        <Button
          variant='ghost'
          size='icon'
          className='size-6'
          disabled={index === 0}
          onClick={() => reorderSectionItem(section, index, index - 1)}
        >
          <ArrowUp className='size-3' />
        </Button>
        <Button
          variant='ghost'
          size='icon'
          className='size-6'
          disabled={index === totalItems - 1}
          onClick={() => reorderSectionItem(section, index, index + 1)}
        >
          <ArrowDown className='size-3' />
        </Button>
        <Button
          variant='ghost'
          size='icon'
          className='size-6'
          onClick={() => toggleItemVisibility(section, index)}
        >
          {isVisible ? (
            <Eye className='size-3' />
          ) : (
            <EyeOff className='size-3' />
          )}
        </Button>
        <Button
          variant='ghost'
          size='icon'
          className='size-6'
          onClick={onEdit}
        >
          <Pencil className='size-3' />
        </Button>
        <Button
          variant='ghost'
          size='icon'
          className='size-6 text-destructive hover:text-destructive'
          onClick={() => deleteSectionItem(section, index)}
        >
          <Trash2 className='size-3' />
        </Button>
      </div>
    </div>
  )
}
