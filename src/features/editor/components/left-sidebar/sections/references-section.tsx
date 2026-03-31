import { Button } from '@/components/ui/button';
import { GenericItemDialog } from '@/features/editor/dialogs/generic-item-dialog';
import { referenceSchema } from '@/schema/resume.schema';
import { useResumeEditorStore } from '@/stores/use-resume-editor-store';
import { Contact, Plus } from 'lucide-react';
import { useState } from 'react';
import { SectionItem } from '../shared/section-item';
import { SectionWrapper } from '../shared/section-wrapper';

export function ReferencesSection() {
  const items = useResumeEditorStore((s) => s.resume.references)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editIndex, setEditIndex] = useState<number | null>(null)

  return (
    <SectionWrapper id='references' title='References' icon={<Contact className='size-4' />}>
      <div className='space-y-2'>
        {items.map((item, index) => (
          <SectionItem
            key={item.id}
            section='references'
            index={index}
            title={item.name}
            subtitle={item.reference}
            totalItems={items.length}
            onEdit={() => { setEditIndex(index); setDialogOpen(true) }}
          />
        ))}
      </div>
      <Button variant='outline' size='sm' className='w-full border-dashed' onClick={() => { setEditIndex(null); setDialogOpen(true) }}>
        <Plus className='size-3.5 mr-1.5' /> Add Reference
      </Button>
      <GenericItemDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        editIndex={editIndex}
        section='references'
        title='Reference'
        schema={referenceSchema}
        fields={[
          { name: 'name', label: 'Name', placeholder: 'Jane Smith' },
          { name: 'reference', label: 'Reference', placeholder: 'Contact details or quote...', multiline: true },
        ]}
      />
    </SectionWrapper>
  )
}
