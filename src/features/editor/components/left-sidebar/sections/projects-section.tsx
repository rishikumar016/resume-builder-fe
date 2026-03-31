import { Button } from '@/components/ui/button';
import { ProjectDialog } from '@/features/editor/dialogs/project-dialog';
import { useResumeEditorStore } from '@/stores/use-resume-editor-store';
import { FolderKanban, Plus } from 'lucide-react';
import { useState } from 'react';
import { SectionItem } from '../shared/section-item';
import { SectionWrapper } from '../shared/section-wrapper';

export function ProjectsSection() {
  const items = useResumeEditorStore((s) => s.resume.projects)
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
      id='projects'
      title='Projects'
      icon={<FolderKanban className='size-4' />}
    >
      <div className='space-y-2'>
        {items.map((item, index) => (
          <SectionItem
            key={item.id}
            section='projects'
            index={index}
            title={item.name}
            subtitle={item.description}
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
        Add Project
      </Button>

      <ProjectDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        editIndex={editIndex}
      />
    </SectionWrapper>
  )
}
