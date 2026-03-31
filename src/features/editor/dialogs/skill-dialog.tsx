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
import { skillSchema, type SkillItem } from '@/schema/resume.schema';
import { useResumeEditorStore } from '@/stores/use-resume-editor-store';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

interface SkillDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  editIndex: number | null
}

export function SkillDialog({
  open,
  onOpenChange,
  editIndex,
}: SkillDialogProps) {
  const items = useResumeEditorStore((s) => s.resume.skills)
  const addSectionItem = useResumeEditorStore((s) => s.addSectionItem)
  const updateSectionItem = useResumeEditorStore((s) => s.updateSectionItem)

  const isEditing = editIndex !== null
  const editItem = isEditing ? items[editIndex] : undefined

  const form = useForm<SkillItem>({
    resolver: zodResolver(skillSchema) as any,
    defaultValues: editItem ?? skillSchema.parse({}),
  })

  useEffect(() => {
    if (open) {
      form.reset(editItem ?? skillSchema.parse({}))
    }
  }, [open, editItem, form])

  const onSubmit = (values: SkillItem) => {
    // Parse keywords from comma-separated string
    const processed = {
      ...values,
      keywords:
        typeof values.keywords === 'string'
          ? (values.keywords as unknown as string)
              .split(',')
              .map((k) => k.trim())
              .filter(Boolean)
          : values.keywords,
    }

    if (isEditing) {
      updateSectionItem('skills', editIndex, processed)
    } else {
      addSectionItem('skills', {
        ...processed,
        id: crypto.randomUUID(),
      })
    }
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='sm:max-w-md'>
        <DialogHeader>
          <DialogTitle>{isEditing ? 'Edit' : 'Add'} Skill</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Skill Name</FormLabel>
                  <FormControl>
                    <Input placeholder='React' {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='level'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Level</FormLabel>
                  <FormControl>
                    <Input
                      placeholder='Expert / Advanced / Intermediate'
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='keywords'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Keywords (comma-separated)</FormLabel>
                  <FormControl>
                    <Input
                      placeholder='hooks, context, next.js'
                      value={
                        Array.isArray(field.value)
                          ? field.value.join(', ')
                          : field.value
                      }
                      onChange={(e) => field.onChange(e.target.value)}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

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
