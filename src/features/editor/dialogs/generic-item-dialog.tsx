import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import type { ResumeData, SectionKey } from '@/schema/resume.schema';
import { useResumeEditorStore } from '@/stores/use-resume-editor-store';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import type { z } from 'zod';

interface FieldDef {
  name: string
  label: string
  placeholder?: string
  multiline?: boolean
}

interface GenericItemDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  editIndex: number | null
  section: SectionKey
  title: string
  schema: z.ZodType<any>
  fields: FieldDef[]
}

export function GenericItemDialog({
  open,
  onOpenChange,
  editIndex,
  section,
  title,
  schema,
  fields,
}: GenericItemDialogProps) {
  const items = useResumeEditorStore(
    (s) => s.resume[section] as Array<Record<string, unknown>>
  )
  const addSectionItem = useResumeEditorStore((s) => s.addSectionItem)
  const updateSectionItem = useResumeEditorStore((s) => s.updateSectionItem)

  const isEditing = editIndex !== null
  const editItem = isEditing ? items[editIndex] : undefined

  const form = useForm({
    resolver: zodResolver(schema as any) as any,
    defaultValues: (editItem as Record<string, unknown>) ?? schema.parse({}),
  })

  useEffect(() => {
    if (open) {
      form.reset(
        (editItem as Record<string, unknown>) ?? schema.parse({})
      )
    }
  }, [open, editItem, form, schema])

  const onSubmit = (values: Record<string, unknown>) => {
    if (isEditing) {
      updateSectionItem(
        section,
        editIndex,
        values as Partial<ResumeData[typeof section][number]>
      )
    } else {
      addSectionItem(section, {
        ...values,
        id: crypto.randomUUID(),
      } as ResumeData[typeof section][number])
    }
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='sm:max-w-md'>
        <DialogHeader>
          <DialogTitle>
            {isEditing ? 'Edit' : 'Add'} {title}
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
            {fields.map((fieldDef) => (
              <FormField
                key={fieldDef.name}
                control={form.control}
                name={fieldDef.name}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{fieldDef.label}</FormLabel>
                    <FormControl>
                      {fieldDef.multiline ? (
                        <Textarea
                          placeholder={fieldDef.placeholder}
                          className='min-h-[80px] resize-y'
                          {...field}
                          value={(field.value as string) ?? ''}
                        />
                      ) : (
                        <Input
                          placeholder={fieldDef.placeholder}
                          {...field}
                          value={(field.value as string) ?? ''}
                        />
                      )}
                    </FormControl>
                  </FormItem>
                )}
              />
            ))}

            <DialogFooter>
              <Button
                type='button'
                variant='outline'
                onClick={() => onOpenChange(false)}
              >
                Cancel
              </Button>
              <Button type='submit'>{isEditing ? 'Save' : 'Add'}</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
