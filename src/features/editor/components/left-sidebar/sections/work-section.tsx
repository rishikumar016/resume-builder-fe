import { Button } from '@/components/ui/button';
import { WorkDialog } from '@/features/editor/dialogs/work-dialog';
import { useResumeEditorStore } from '@/stores/use-resume-editor-store';
import { Briefcase, Plus } from 'lucide-react';
import { useState } from 'react';
import { SectionItem } from '../shared/section-item';
import { SectionWrapper } from '../shared/section-wrapper';

export function WorkSection() {
  const items = useResumeEditorStore((s) => s.resume.work)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editIndex, setEditIndex] = useState<number | null>(null)

  const handleAdd = () => {
    setEditIndex(null)
    setDialogOpen(true)
  }

  const handleEdit = (index: number) => {
    setEditIndex(index)
    setDialogOpen(true)
  }

  return (
    <SectionWrapper
      id='work'
      title='Work Experience'
      icon={<Briefcase className='size-4' />}
    >
      <div className='space-y-2'>
        {items.map((item, index) => (
          <SectionItem
            key={item.id}
            section='work'
            index={index}
            title={item.position}
            subtitle={`${item.name}${item.startDate ? ` • ${item.startDate}` : ''}`}
            totalItems={items.length}
            onEdit={() => handleEdit(index)}
          />
        ))}
      </div>

      <Button
        variant='outline'
        size='sm'
        className='w-full border-dashed'
        onClick={handleAdd}
      >
        <Plus className='size-3.5 mr-1.5' />
        Add Work Experience
      </Button>

      <WorkDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        editIndex={editIndex}
      />
    </SectionWrapper>
  )
}
