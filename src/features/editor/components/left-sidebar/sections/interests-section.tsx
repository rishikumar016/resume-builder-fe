import { Button } from '@/components/ui/button';
import { GenericItemDialog } from '@/features/editor/dialogs/generic-item-dialog';
import { interestSchema } from '@/schema/resume.schema';
import { useResumeEditorStore } from '@/stores/use-resume-editor-store';
import { Heart, Plus } from 'lucide-react';
import { useState } from 'react';
import { SectionItem } from '../shared/section-item';
import { SectionWrapper } from '../shared/section-wrapper';

export function InterestsSection() {
  const items = useResumeEditorStore((s) => s.resume.interests)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editIndex, setEditIndex] = useState<number | null>(null)

  return (
    <SectionWrapper id='interests' title='Interests' icon={<Heart className='size-4' />}>
      <div className='space-y-2'>
        {items.map((item, index) => (
          <SectionItem
            key={item.id}
            section='interests'
            index={index}
            title={item.name}
            subtitle={item.keywords?.join(', ')}
            totalItems={items.length}
            onEdit={() => { setEditIndex(index); setDialogOpen(true) }}
          />
        ))}
      </div>
      <Button variant='outline' size='sm' className='w-full border-dashed' onClick={() => { setEditIndex(null); setDialogOpen(true) }}>
        <Plus className='size-3.5 mr-1.5' /> Add Interest
      </Button>
      <GenericItemDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        editIndex={editIndex}
        section='interests'
        title='Interest'
        schema={interestSchema}
        fields={[
          { name: 'name', label: 'Name', placeholder: 'Open Source' },
        ]}
      />
    </SectionWrapper>
  )
}
