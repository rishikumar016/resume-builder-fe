import { Button } from '@/components/ui/button';
import { GenericItemDialog } from '@/features/editor/dialogs/generic-item-dialog';
import { volunteerSchema } from '@/schema/resume.schema';
import { useResumeEditorStore } from '@/stores/use-resume-editor-store';
import { HeartHandshake, Plus } from 'lucide-react';
import { useState } from 'react';
import { SectionItem } from '../shared/section-item';
import { SectionWrapper } from '../shared/section-wrapper';

export function VolunteerSection() {
  const items = useResumeEditorStore((s) => s.resume.volunteer)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editIndex, setEditIndex] = useState<number | null>(null)

  return (
    <SectionWrapper id='volunteer' title='Volunteer' icon={<HeartHandshake className='size-4' />}>
      <div className='space-y-2'>
        {items.map((item, index) => (
          <SectionItem
            key={item.id}
            section='volunteer'
            index={index}
            title={item.organization}
            subtitle={item.position}
            totalItems={items.length}
            onEdit={() => { setEditIndex(index); setDialogOpen(true) }}
          />
        ))}
      </div>
      <Button variant='outline' size='sm' className='w-full border-dashed' onClick={() => { setEditIndex(null); setDialogOpen(true) }}>
        <Plus className='size-3.5 mr-1.5' /> Add Volunteer Experience
      </Button>
      <GenericItemDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        editIndex={editIndex}
        section='volunteer'
        title='Volunteer Experience'
        schema={volunteerSchema}
        fields={[
          { name: 'organization', label: 'Organization', placeholder: 'Red Cross' },
          { name: 'position', label: 'Position', placeholder: 'Volunteer Coordinator' },
          { name: 'url', label: 'URL', placeholder: 'https://...' },
          { name: 'startDate', label: 'Start Date', placeholder: '2023-01' },
          { name: 'endDate', label: 'End Date', placeholder: '2024-01' },
          { name: 'summary', label: 'Summary', placeholder: 'Description of your work...', multiline: true },
        ]}
      />
    </SectionWrapper>
  )
}
