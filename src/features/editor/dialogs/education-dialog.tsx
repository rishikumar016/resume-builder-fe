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
import { educationSchema, type EducationItem } from '@/schema/resume.schema';
import { useResumeEditorStore } from '@/stores/use-resume-editor-store';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

interface EducationDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  editIndex: number | null
}

export function EducationDialog({
  open,
  onOpenChange,
  editIndex,
}: EducationDialogProps) {
  const items = useResumeEditorStore((s) => s.resume.education)
  const addSectionItem = useResumeEditorStore((s) => s.addSectionItem)
  const updateSectionItem = useResumeEditorStore((s) => s.updateSectionItem)

  const isEditing = editIndex !== null
  const editItem = isEditing ? items[editIndex] : undefined

  const form = useForm<EducationItem>({
    resolver: zodResolver(educationSchema) as any,
    defaultValues: editItem ?? educationSchema.parse({}),
  })

  useEffect(() => {
    if (open) {
      form.reset(editItem ?? educationSchema.parse({}))
    }
  }, [open, editItem, form])

  const onSubmit = (values: EducationItem) => {
    if (isEditing) {
      updateSectionItem('education', editIndex, values)
    } else {
      addSectionItem('education', { ...values, id: crypto.randomUUID() })
    }
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='sm:max-w-lg'>
        <DialogHeader>
          <DialogTitle>{isEditing ? 'Edit' : 'Add'} Education</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
            <FormField
              control={form.control}
              name='institution'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Institution</FormLabel>
                  <FormControl>
                    <Input placeholder='Stanford University' {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            <div className='grid grid-cols-2 gap-3'>
              <FormField
                control={form.control}
                name='area'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Area of Study</FormLabel>
                    <FormControl>
                      <Input placeholder='Computer Science' {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='studyType'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Degree</FormLabel>
                    <FormControl>
                      <Input placeholder="Bachelor's" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            <div className='grid grid-cols-2 gap-3'>
              <FormField
                control={form.control}
                name='startDate'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Start Date</FormLabel>
                    <FormControl>
                      <Input placeholder='2018-09' {...field} />
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
                      <Input placeholder='2022-06' {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            <div className='grid grid-cols-2 gap-3'>
              <FormField
                control={form.control}
                name='score'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Score / GPA</FormLabel>
                    <FormControl>
                      <Input placeholder='3.8/4.0' {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='url'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>URL</FormLabel>
                    <FormControl>
                      <Input placeholder='https://...' {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

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
