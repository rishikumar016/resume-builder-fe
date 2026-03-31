import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { basicsSchema, type Basics } from '@/schema/resume.schema';
import { useResumeEditorStore } from '@/stores/use-resume-editor-store';
import { zodResolver } from '@hookform/resolvers/zod';
import { User } from 'lucide-react';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { SectionWrapper } from '../shared/section-wrapper';

export function BasicsSection() {
  const basics = useResumeEditorStore((s) => s.resume.basics)
  const updateResumeData = useResumeEditorStore((s) => s.updateResumeData)

  const form = useForm<Basics>({
    resolver: zodResolver(basicsSchema) as any,
    defaultValues: basics,
  })

  // Sync form to store on change
  useEffect(() => {
    const subscription = form.watch((values) => {
      updateResumeData((draft) => {
        Object.assign(draft.basics, values)
      })
    })
    return () => subscription.unsubscribe()
  }, [form, updateResumeData])

  return (
    <SectionWrapper
      id='basics'
      title='Basics'
      icon={<User className='size-4' />}
      defaultOpen
    >
      <Form {...form}>
        <div className='space-y-3'>
          <div className='grid grid-cols-2 gap-3'>
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='text-xs'>Full Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder='John Doe'
                      className='h-8 text-sm'
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='label'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='text-xs'>Job Title</FormLabel>
                  <FormControl>
                    <Input
                      placeholder='Software Engineer'
                      className='h-8 text-sm'
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>

          <div className='grid grid-cols-2 gap-3'>
            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='text-xs'>Email</FormLabel>
                  <FormControl>
                    <Input
                      type='email'
                      placeholder='john@example.com'
                      className='h-8 text-sm'
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='phone'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='text-xs'>Phone</FormLabel>
                  <FormControl>
                    <Input
                      placeholder='+1 (555) 123-4567'
                      className='h-8 text-sm'
                      {...field}
                    />
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
                <FormLabel className='text-xs'>Website</FormLabel>
                <FormControl>
                  <Input
                    placeholder='https://johndoe.com'
                    className='h-8 text-sm'
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='summary'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='text-xs'>Summary</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder='Brief professional summary...'
                    className='min-h-[80px] text-sm resize-y'
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          {/* Location fields */}
          <div>
            <Label className='text-xs font-medium text-muted-foreground mb-2 block'>
              Location
            </Label>
            <div className='grid grid-cols-2 gap-3'>
              <FormField
                control={form.control}
                name='location.city'
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder='City'
                        className='h-8 text-sm'
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='location.region'
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder='State/Region'
                        className='h-8 text-sm'
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='location.countryCode'
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder='Country Code'
                        className='h-8 text-sm'
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='location.postalCode'
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder='Postal Code'
                        className='h-8 text-sm'
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
          </div>
        </div>
      </Form>
    </SectionWrapper>
  )
}
