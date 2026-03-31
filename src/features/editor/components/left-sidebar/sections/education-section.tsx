import { Button } from '@/components/ui/button';
import { EducationDialog } from '@/features/editor/dialogs/education-dialog';
import { useResumeEditorStore } from '@/stores/use-resume-editor-store';
import { GraduationCap, Plus } from 'lucide-react';
import { useState } from 'react';
import { SectionItem } from '../shared/section-item';
import { SectionWrapper } from '../shared/section-wrapper';

export function EducationSection() {
  const items = useResumeEditorStore((s) => s.resume.education)
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
      id='education'
      title='Education'
      icon={<GraduationCap className='size-4' />}
    >
      <div className='space-y-2'>
        {items.map((item, index) => (
          <SectionItem
            key={item.id}
            section='education'
            index={index}
            title={item.institution}
            subtitle={`${item.area}${item.studyType ? ` • ${item.studyType}` : ''}`}
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
        Add Education
      </Button>

      <EducationDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        editIndex={editIndex}
      />
    </SectionWrapper>
  )
}
