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
import { projectSchema, type ProjectItem } from '@/schema/resume.schema';
import { useResumeEditorStore } from '@/stores/use-resume-editor-store';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

interface ProjectDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  editIndex: number | null
}

export function ProjectDialog({
  open,
  onOpenChange,
  editIndex,
}: ProjectDialogProps) {
  const items = useResumeEditorStore((s) => s.resume.projects)
  const addSectionItem = useResumeEditorStore((s) => s.addSectionItem)
  const updateSectionItem = useResumeEditorStore((s) => s.updateSectionItem)

  const isEditing = editIndex !== null
  const editItem = isEditing ? items[editIndex] : undefined

  const form = useForm<ProjectItem>({
    resolver: zodResolver(projectSchema) as any,
    defaultValues: editItem ?? projectSchema.parse({}),
  })

  useEffect(() => {
    if (open) {
      form.reset(editItem ?? projectSchema.parse({}))
    }
  }, [open, editItem, form])

  const onSubmit = (values: ProjectItem) => {
    if (isEditing) {
      updateSectionItem('projects', editIndex, values)
    } else {
      addSectionItem('projects', { ...values, id: crypto.randomUUID() })
    }
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='sm:max-w-lg'>
        <DialogHeader>
          <DialogTitle>{isEditing ? 'Edit' : 'Add'} Project</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Project Name</FormLabel>
                  <FormControl>
                    <Input placeholder='My Awesome Project' {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='description'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder='What is this project about?'
                      className='min-h-[80px] resize-y'
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <div className='grid grid-cols-2 gap-3'>
              <FormField
                control={form.control}
                name='startDate'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Start Date</FormLabel>
                    <FormControl>
                      <Input placeholder='2023-01' {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='endDate'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>End Date</FormLabel>
                    <FormControl>
                      <Input placeholder='2024-01' {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name='url'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>URL</FormLabel>
                  <FormControl>
                    <Input placeholder='https://github.com/...' {...field} />
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
