import { Button } from '@/components/ui/button';
import { GenericItemDialog } from '@/features/editor/dialogs/generic-item-dialog';
import { certificateSchema } from '@/schema/resume.schema';
import { useResumeEditorStore } from '@/stores/use-resume-editor-store';
import { Award, Plus } from 'lucide-react';
import { useState } from 'react';
import { SectionItem } from '../shared/section-item';
import { SectionWrapper } from '../shared/section-wrapper';

export function CertificatesSection() {
  const items = useResumeEditorStore((s) => s.resume.certificates)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editIndex, setEditIndex] = useState<number | null>(null)

  return (
    <SectionWrapper id='certificates' title='Certifications' icon={<Award className='size-4' />}>
      <div className='space-y-2'>
        {items.map((item, index) => (
          <SectionItem
            key={item.id}
            section='certificates'
            index={index}
            title={item.name}
            subtitle={item.issuer}
            totalItems={items.length}
            onEdit={() => { setEditIndex(index); setDialogOpen(true) }}
          />
        ))}
      </div>
      <Button variant='outline' size='sm' className='w-full border-dashed' onClick={() => { setEditIndex(null); setDialogOpen(true) }}>
        <Plus className='size-3.5 mr-1.5' /> Add Certification
      </Button>
      <GenericItemDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        editIndex={editIndex}
        section='certificates'
        title='Certification'
        schema={certificateSchema}
        fields={[
          { name: 'name', label: 'Name', placeholder: 'AWS Solutions Architect' },
          { name: 'issuer', label: 'Issuer', placeholder: 'Amazon Web Services' },
          { name: 'date', label: 'Date', placeholder: '2024-01' },
          { name: 'url', label: 'URL', placeholder: 'https://...' },
        ]}
      />
    </SectionWrapper>
  )
}
