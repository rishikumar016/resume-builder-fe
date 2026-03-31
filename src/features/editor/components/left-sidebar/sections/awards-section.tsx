import { Button } from '@/components/ui/button';
import { GenericItemDialog } from '@/features/editor/dialogs/generic-item-dialog';
import { awardSchema } from '@/schema/resume.schema';
import { useResumeEditorStore } from '@/stores/use-resume-editor-store';
import { Plus, Trophy } from 'lucide-react';
import { useState } from 'react';
import { SectionItem } from '../shared/section-item';
import { SectionWrapper } from '../shared/section-wrapper';

export function AwardsSection() {
  const items = useResumeEditorStore((s) => s.resume.awards)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editIndex, setEditIndex] = useState<number | null>(null)

  return (
    <SectionWrapper id='awards' title='Awards' icon={<Trophy className='size-4' />}>
      <div className='space-y-2'>
        {items.map((item, index) => (
          <SectionItem
            key={item.id}
            section='awards'
            index={index}
            title={item.title}
            subtitle={item.awarder}
            totalItems={items.length}
            onEdit={() => { setEditIndex(index); setDialogOpen(true) }}
          />
        ))}
      </div>
      <Button variant='outline' size='sm' className='w-full border-dashed' onClick={() => { setEditIndex(null); setDialogOpen(true) }}>
        <Plus className='size-3.5 mr-1.5' /> Add Award
      </Button>
      <GenericItemDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        editIndex={editIndex}
        section='awards'
        title='Award'
        schema={awardSchema}
        fields={[
          { name: 'title', label: 'Title', placeholder: 'Best Developer Award' },
          { name: 'awarder', label: 'Awarder', placeholder: 'Google' },
          { name: 'date', label: 'Date', placeholder: '2024-06' },
          { name: 'summary', label: 'Summary', placeholder: 'Details about the award...', multiline: true },
        ]}
      />
    </SectionWrapper>
  )
}
