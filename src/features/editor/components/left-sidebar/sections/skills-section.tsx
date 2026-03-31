import { Button } from '@/components/ui/button';
import { SkillDialog } from '@/features/editor/dialogs/skill-dialog';
import { useResumeEditorStore } from '@/stores/use-resume-editor-store';
import { Plus, Wrench } from 'lucide-react';
import { useState } from 'react';
import { SectionItem } from '../shared/section-item';
import { SectionWrapper } from '../shared/section-wrapper';

export function SkillsSection() {
  const items = useResumeEditorStore((s) => s.resume.skills)
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
      id='skills'
      title='Skills'
      icon={<Wrench className='size-4' />}
    >
      <div className='space-y-2'>
        {items.map((item, index) => (
          <SectionItem
            key={item.id}
            section='skills'
            index={index}
            title={item.name}
            subtitle={item.level || (item.keywords?.length ? item.keywords.join(', ') : undefined)}
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
        Add Skill
      </Button>

      <SkillDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        editIndex={editIndex}
      />
    </SectionWrapper>
  )
}
