import { Button } from '@/components/ui/button';
import { GenericItemDialog } from '@/features/editor/dialogs/generic-item-dialog';
import { publicationSchema } from '@/schema/resume.schema';
import { useResumeEditorStore } from '@/stores/use-resume-editor-store';
import { BookOpen, Plus } from 'lucide-react';
import { useState } from 'react';
import { SectionItem } from '../shared/section-item';
import { SectionWrapper } from '../shared/section-wrapper';

export function PublicationsSection() {
  const items = useResumeEditorStore((s) => s.resume.publications)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editIndex, setEditIndex] = useState<number | null>(null)

  return (
    <SectionWrapper id='publications' title='Publications' icon={<BookOpen className='size-4' />}>
      <div className='space-y-2'>
        {items.map((item, index) => (
          <SectionItem
            key={item.id}
            section='publications'
            index={index}
            title={item.name}
            subtitle={item.publisher}
            totalItems={items.length}
            onEdit={() => { setEditIndex(index); setDialogOpen(true) }}
          />
        ))}
      </div>
      <Button variant='outline' size='sm' className='w-full border-dashed' onClick={() => { setEditIndex(null); setDialogOpen(true) }}>
        <Plus className='size-3.5 mr-1.5' /> Add Publication
      </Button>
      <GenericItemDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        editIndex={editIndex}
        section='publications'
        title='Publication'
        schema={publicationSchema}
        fields={[
          { name: 'name', label: 'Name', placeholder: 'My Research Paper' },
          { name: 'publisher', label: 'Publisher', placeholder: 'IEEE' },
          { name: 'releaseDate', label: 'Release Date', placeholder: '2024-03' },
          { name: 'url', label: 'URL', placeholder: 'https://...' },
          { name: 'summary', label: 'Summary', placeholder: 'Brief description...', multiline: true },
        ]}
      />
    </SectionWrapper>
  )
}
