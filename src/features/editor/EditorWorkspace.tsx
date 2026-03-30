import * as React from 'react'
import { Main } from '@/components/layout/main'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useOnboardingStore } from '@/stores/use-onboarding'
import { FileText, Download, Briefcase, GraduationCap, Link as LinkIcon, DownloadCloud } from 'lucide-react'

export function EditorWorkspace() {
  const { experienceLevel, yearsOfExperience, selectedTemplate } = useOnboardingStore()

  return (
    <Main className='p-0 h-[calc(100vh-theme(spacing.16))] flex overflow-hidden bg-surface-container-low'>
      
      {/* Left Pane: Input Sidebar */}
      <div className='w-full max-w-sm border-r border-outline-variant/30 bg-surface-container-lowest h-full overflow-y-auto flex flex-col shadow-[4px_0_24px_rgba(0,0,0,0.02)] relative z-10'>
        <div className='p-6 border-b border-outline-variant/20 bg-surface sticky top-0 z-10'>
          <h2 className='text-xl font-manrope font-extrabold flex items-center gap-2'>
            <FileText className='size-5 text-primary' />
            Document Data
          </h2>
          <p className='text-xs text-muted-foreground mt-1'>
             {experienceLevel === 'fresher' ? 'Fresher Profile' : `Experienced (${yearsOfExperience}+ yrs)`} • {selectedTemplate || 'Default'} Template
          </p>
        </div>

        <div className='p-6 flex-1'>
          <Tabs defaultValue='basics' className='w-full'>
            <TabsList className='grid w-full grid-cols-2 mb-6 bg-surface-container-low'>
              <TabsTrigger value='basics' className='data-[state=active]:bg-brand-green data-[state=active]:text-brand-green-foreground'>Basics</TabsTrigger>
              <TabsTrigger value='experience' className='data-[state=active]:bg-primary data-[state=active]:text-primary-foreground'>Experience</TabsTrigger>
            </TabsList>
            
            <TabsContent value='basics' className='space-y-4'>
              <div className='space-y-2'>
                <Label htmlFor='fullName'>Full Name</Label>
                <Input id='fullName' placeholder='e.g. Alex Rivera' className='bg-surface border-outline-variant/50' />
              </div>
              <div className='space-y-2'>
                <Label htmlFor='role'>Target Role</Label>
                <Input id='role' placeholder='e.g. VP of Engineering' className='bg-surface border-outline-variant/50' />
              </div>
              <div className='space-y-2'>
                <Label htmlFor='email'>Email Address</Label>
                <Input id='email' type='email' placeholder='alex@example.com' className='bg-surface border-outline-variant/50' />
              </div>
              <div className='space-y-2'>
                <Label htmlFor='summary'>Professional Summary</Label>
                <Textarea 
                  id='summary' 
                  placeholder='A brief overview of your career and goals...' 
                  className='min-h-[120px] bg-surface border-outline-variant/50 resize-y' 
                />
              </div>
            </TabsContent>
            
            <TabsContent value='experience' className='space-y-4'>
              <div className='p-4 border border-outline-variant/30 rounded-xl bg-surface'>
                 <div className='flex justify-between items-start mb-2'>
                    <h4 className='font-semibold text-sm'>Senior Engineering Manager</h4>
                    <span className='text-xs text-muted-foreground'>2020 - Present</span>
                 </div>
                 <p className='text-xs text-muted-foreground mb-3'>TechCorp Inc. • San Francisco, CA</p>
                 <Textarea 
                   defaultValue='• Orchestrated cross-functional squads to scale operations by 300%&#10;• Reduced cloud infrastructure costs by 45% through aggressive optimization'
                   className='text-xs font-mono bg-surface-container-lowest min-h-[100px]' 
                 />
              </div>
              <Button variant='outline' className='w-full border-dashed bg-transparent border-outline-variant/50 hover:bg-surface-container-low'>
                + Add Experience
              </Button>
            </TabsContent>
          </Tabs>
        </div>

        <div className='p-4 border-t border-outline-variant/20 bg-surface/50 backdrop-blur-md'>
           <Button className='w-full bg-[linear-gradient(to_right,var(--color-primary),var(--color-tertiary-container))] text-white hover:opacity-90 h-12 rounded-xl shadow-ambient'>
              <DownloadCloud className='size-4 mr-2' /> Export PDF
           </Button>
        </div>
      </div>

      {/* Right Pane: Live Preview */}
      <div className='flex-1 lg:p-8 p-4 bg-surface-container-low/50 overflow-y-auto flex flex-col items-center justify-start'>
          
          <div className='w-full max-w-4xl bg-white shadow-ambient rounded-xl border border-outline-variant/20 min-h-[842px] relative overflow-hidden transition-all duration-500 origin-top'>
             {/* Mock Resume Document rendering */}
             <div className='absolute inset-0 pointer-events-none'>
               {/* Watermark or styling based on template */}
               {selectedTemplate === 'creative' && <div className='absolute top-0 right-0 w-64 h-64 bg-brand-green/10 rounded-bl-full' />}
             </div>
             
             <div className='p-12 text-black relative z-10'>
                <header className={`border-b-2 pb-6 mb-8 ${selectedTemplate === 'executive' ? 'border-primary' : selectedTemplate === 'creative' ? 'border-brand-green' : 'border-gray-200'}`}>
                   <h1 className={`text-4xl uppercase tracking-widest text-gray-900 ${selectedTemplate === 'creative' ? 'font-sans font-black' : 'font-serif font-bold'}`}>
                      Alex Rivera
                   </h1>
                   <div className='mt-2 flex gap-4 text-sm font-sans text-gray-600 uppercase tracking-wide font-medium'>
                      <span>vp engineering</span>
                      <span>•</span>
                      <span>san francisco, ca</span>
                   </div>
                </header>

                <div className='grid grid-cols-[1fr_200px] gap-12'>
                   <div className='space-y-8'>
                      <section>
                         <h3 className={`text-sm font-bold uppercase tracking-widest text-gray-500 mb-4 ${selectedTemplate === 'executive' ? 'text-primary' : ''}`}>Experience</h3>
                         <div className='space-y-6'>
                            <div className='relative pl-4 border-l-2 border-gray-200'>
                               <div className={`absolute w-2.5 h-2.5 rounded-full -left-[6px] top-1.5 ${selectedTemplate === 'startup' ? 'bg-tertiary' : 'bg-gray-400'}`} />
                               <div className='flex justify-between items-baseline mb-1'>
                                 <h4 className='font-bold text-gray-900 text-lg'>Senior Engineering Manager</h4>
                                 <span className='text-sm text-gray-500 font-serif italic'>2020 - Present</span>
                               </div>
                               <div className='text-brand-green font-semibold text-sm mb-3'>TechCorp Inc.</div>
                               <ul className='list-disc pl-5 text-gray-700 text-sm space-y-2 leading-relaxed'>
                                  <li>Orchestrated cross-functional squads to scale operations by 300%.</li>
                                  <li>Reduced cloud infrastructure costs by 45% through aggressive optimization.</li>
                                  <li>Led the transition from a monolithic architecture to a robust microservices pattern.</li>
                               </ul>
                            </div>
                         </div>
                      </section>
                   </div>
                   
                   <div className='space-y-8'>
                      <section>
                         <h3 className={`text-sm font-bold uppercase tracking-widest text-gray-500 mb-4 ${selectedTemplate === 'creative' ? 'text-brand-green' : ''}`}>Expertise</h3>
                         <div className='flex flex-wrap gap-2'>
                            {['System Architecture', 'Team Leadership', 'Cloud Infrastructure', 'Go', 'React', 'Kubernetes'].map((skill, i) => (
                               <span key={i} className='bg-gray-100 px-2 py-1 text-xs text-gray-700 font-medium rounded'>
                                  {skill}
                               </span>
                            ))}
                         </div>
                      </section>
                   </div>
                </div>
             </div>
          </div>
      </div>
    </Main>
  )
}
