import * as React from 'react'
import { createFileRoute, Link } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import { UploadModal } from '@/components/upload-modal'
import { FileText, Cpu, Eye, LayoutTemplate, ShieldCheck, PlayCircle } from 'lucide-react'

export const Route = createFileRoute('/')({
  component: LandingPage,
})

function LandingPage() {
  const [isUploadModalOpen, setIsUploadModalOpen] = React.useState(false)

  return (
    <div className='min-h-screen bg-background text-foreground selection:bg-brand-green/30'>
      {/* Header */}
      <header className='flex items-center justify-between px-8 py-6 max-w-7xl mx-auto'>
        <div className='flex items-center gap-2 font-manrope font-bold text-xl'>
          <div className='bg-primary text-primary-foreground p-1.5 rounded-lg'>
            <FileText className="size-5" />
          </div>
          The Digital Tailor
        </div>
        <nav className='hidden md:flex gap-8 text-sm font-medium text-muted-foreground'>
          <a href="#features" className='hover:text-brand-green transition-colors pb-1 border-b-2 border-transparent hover:border-brand-green'>Features</a>
          <a href="#templates" className='hover:text-foreground transition-colors'>Templates</a>
          <a href="#pricing" className='hover:text-foreground transition-colors'>Pricing</a>
        </nav>
        <div className='flex items-center gap-4'>
          <Button asChild variant="outline" className='bg-brand-green text-brand-green-foreground border-brand-green hover:bg-brand-green/90 font-bold'>
            <Link to="/sign-in">Sign Up</Link>
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <main className='max-w-7xl mx-auto px-8 pt-20 pb-32 grid md:grid-cols-2 gap-16 items-center'>
        <div className='space-y-8'>
          <div className='inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-container-low border border-outline-variant/30 text-xs font-semibold tracking-wide uppercase text-primary'>
            <Cpu className='size-3' /> AI-Driven Precision
          </div>
          <h1 className='text-6xl lg:text-7xl font-manrope font-extrabold tracking-tight leading-[1.1]'>
            Bespoke Career <br />
            <span className="text-brand-green">Architecture.</span>
          </h1>
          <p className='text-lg font-inter text-muted-foreground max-w-md'>
            Precision-engineered resumes and career strategies tailored to your unique professional DNA. Stop applying. Start being selected.
          </p>
          <div className='flex flex-wrap items-center gap-4 pt-4'>
            <Button asChild className='bg-brand-green text-brand-green-foreground hover:bg-brand-green/90 h-14 px-8 text-lg font-bold rounded-xl shadow-[0_0_30px_rgba(0,229,153,0.3)]'>
              <Link to="/sign-in?intent=new">
                Build My Resume <span className="ml-2">→</span>
              </Link>
            </Button>
            <Button onClick={() => setIsUploadModalOpen(true)} variant="outline" className='h-14 px-8 text-lg font-bold rounded-xl border-outline-variant/30 bg-surface-container-low hover:bg-surface-container-high transition-colors'>
              Import Resume
            </Button>
          </div>
        </div>

        {/* Hero Visual Mock */}
        <div className='relative'>
          <div className='absolute inset-0 bg-brand-green/10 blur-[100px] rounded-full'></div>
          <div className='relative bg-surface-container-lowest border border-outline-variant/20 rounded-2xl shadow-ambient overflow-hidden max-w-md ml-auto'>
            {/* Window controls */}
            <div className='flex items-center gap-2 px-4 py-3 border-b border-outline-variant/10 bg-surface-container-low'>
              <div className='size-2.5 rounded-full bg-destructive/80'></div>
              <div className='size-2.5 rounded-full bg-[#eab308]/80'></div>
              <div className='size-2.5 rounded-full bg-brand-green/80'></div>
              <div className='mx-auto text-xs font-mono text-muted-foreground uppercase opacity-50 tracking-widest'>banana_vp_engineering_pdf</div>
            </div>
            {/* Document mock */}
            <div className='p-8 bg-white text-black min-h-[400px]'>
               <h2 className='text-3xl font-serif font-semibold border-b pb-2 mb-4 uppercase tracking-widest'>Alex Rivera</h2>
               <div className='flex gap-4 text-xs font-sans text-gray-500 mb-8'>
                 <span>San Francisco, CA</span>
                 <span>arivera@example.com</span>
               </div>
               <div className='space-y-4'>
                 <div className='h-2 bg-gray-200 rounded w-full'></div>
                 <div className='h-2 bg-gray-200 rounded w-[90%]'></div>
                 <div className='h-2 bg-gray-200 rounded w-[95%]'></div>
               </div>
               
               {/* AI Tooltip overlay */}
               <div className='absolute top-32 -left-12 bg-surface text-foreground p-4 rounded-xl shadow-ambient border border-brand-green/20 max-w-[200px]'>
                 <div className='flex items-center gap-2 mb-2'>
                    <Cpu className='size-4 text-brand-green' />
                    <span className='text-xs font-bold text-brand-green uppercase tracking-wide'>Tailor Suggestion</span>
                 </div>
                 <p className='text-xs text-muted-foreground'>Swap "Managed team" with "Orchestrated cross-functional squads to scale operations by 300%".</p>
               </div>
            </div>
          </div>
        </div>
      </main>

      {/* Feature Section */}
      <section id="features" className='py-32 bg-surface border-t border-outline-variant/10'>
        <div className='max-w-7xl mx-auto px-8'>
           <div className='mb-16'>
              <h2 className='text-4xl font-manrope font-extrabold mb-4'>The Science of Selection.</h2>
              <p className='text-muted-foreground max-w-xl text-lg'>
                We don't just fill templates. We engineer psychological triggers that command attention from both human recruiters and digital gatekeepers.
              </p>
           </div>
           
           <div className='grid md:grid-cols-3 gap-8'>
              <div className='bg-surface-container-lowest p-8 rounded-2xl border border-outline-variant/20 shadow-sm'>
                 <div className='p-3 bg-surface-container-low rounded-xl w-fit mb-6'>
                    <LayoutTemplate className='size-6 text-brand-green' />
                 </div>
                 <h3 className='text-xl font-bold font-manrope mb-3'>Architected for Impact</h3>
                 <p className='text-muted-foreground text-sm leading-relaxed'>
                    Recruiters spend only 6 seconds on initial scans. Our layouts are mathematically optimized to deliver your peak value propositions instantly.
                 </p>
              </div>

              <div className='bg-surface-container-lowest p-8 rounded-2xl border border-outline-variant/20 shadow-sm relative overflow-hidden'>
                 <div className='p-3 bg-primary/10 rounded-xl w-fit mb-6'>
                    <Cpu className='size-6 text-primary' />
                 </div>
                 <h3 className='text-xl font-bold font-manrope mb-3'>ATS-Infallible Parsing</h3>
                 <p className='text-muted-foreground text-sm leading-relaxed'>
                    Most resumes die in the database. Our AI mimics actual Talent Management Systems to ensure 100% readability and keyword relevance.
                 </p>
              </div>

              <div className='bg-surface-container-lowest p-8 rounded-2xl border border-outline-variant/20 shadow-sm'>
                 <div className='p-3 bg-brand-green/10 rounded-xl w-fit mb-6'>
                    <Eye className='size-6 text-brand-green' />
                 </div>
                 <h3 className='text-xl font-bold font-manrope mb-3'>Psychological Hierarchy</h3>
                 <p className='text-muted-foreground text-sm leading-relaxed'>
                    Design follows behavior. We leverage natural F-pattern eye-tracking studies to anchor your skills where eyes linger longest.
                 </p>
              </div>
           </div>
        </div>
      </section>

      {/* Pre-footer CTA */}
      <section className='py-32 bg-surface-container-lowest relative overflow-hidden'>
         <div className='absolute top-0 right-1/4 size-96 bg-brand-green/5 blur-[120px] rounded-full'></div>
         <div className='max-w-4xl mx-auto px-8 text-center relative z-10'>
            <h2 className='text-4xl md:text-5xl font-manrope font-extrabold mb-6'>
              Your next chapter deserves <br />superior craftsmanship.
            </h2>
            <p className='text-lg text-muted-foreground mb-10'>
              Join 50,000+ professionals who stopped settling for templates and started using precision architecture.
            </p>
            <Button asChild className='bg-brand-green text-brand-green-foreground hover:bg-brand-green/90 h-14 px-10 text-lg font-bold rounded-xl shadow-[0_0_30px_rgba(0,229,153,0.3)]'>
              <Link to="/sign-in?intent=new">Start Building Free</Link>
            </Button>
            <p className='text-xs font-mono tracking-widest text-muted-foreground uppercase mt-8'>
              No Credit Card Required • Precision Guaranteed
            </p>
         </div>
      </section>

      {/* Upload Modal */}
      <UploadModal open={isUploadModalOpen} onOpenChange={setIsUploadModalOpen} />
    </div>
  )
}
