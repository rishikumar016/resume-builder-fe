import * as React from 'react'
import { createFileRoute, Link } from '@tanstack/react-router'
import {
  FileText,
  Cpu,
  Eye,
  LayoutTemplate,
  ShieldCheck,
  CheckCircle2,
  Check,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { UploadModal } from '@/components/upload-modal'

// Simple custom Twitter (X) icon component
const Twitter = ({ className }: { className?: string }) => (
  <svg
    className={className}
    xmlns='http://www.w3.org/2000/svg'
    width='24'
    height='24'
    viewBox='0 0 24 24'
    fill='none'
    stroke='currentColor'
    strokeWidth='2'
    strokeLinecap='round'
    strokeLinejoin='round'
  >
    <path d='M4 4l11.733 16h4.267l-11.733 -16z' />
    <path d='M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772' />
  </svg>
)

export const Route = createFileRoute('/')({
  component: LandingPage,
})

function LandingPage() {
  const [isUploadModalOpen, setIsUploadModalOpen] = React.useState(false)

  return (
    <div className='min-h-screen overflow-x-hidden bg-[#0E1116] font-sans text-white selection:bg-[#00E599]/30'>
      {/* Header */}
      <header className='mx-auto flex max-w-7xl items-center justify-between px-8 py-6'>
        <div className='flex items-center gap-2 text-xl font-bold'>
          <div className='text-[#eab308]'>
            <FileText className='size-5' />
          </div>
          <span className='text-white'>The Digital Tailor</span>
        </div>
        <nav className='hidden gap-8 text-sm font-medium text-gray-400 md:flex'>
          <a
            href='#features'
            className='border-b-2 border-[#00E599] pb-1 text-[#00E599] transition-colors hover:text-[#00E599]/80'
          >
            Features
          </a>
          <a
            href='#templates'
            className='border-b-2 border-transparent pb-1 transition-colors hover:text-white'
          >
            Templates
          </a>
          <a
            href='#pricing'
            className='border-b-2 border-transparent pb-1 transition-colors hover:text-white'
          >
            Pricing
          </a>
        </nav>
        <div className='flex items-center gap-4'>
          <Button
            asChild
            className='bg-[#00E599] px-6 font-bold text-black hover:bg-[#00E599]/90'
          >
            <Link to='/sign-in'>Sign Up</Link>
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <main className='mx-auto grid max-w-7xl items-center gap-16 px-8 pt-20 pb-20 lg:grid-cols-2'>
        <div className='space-y-8'>
          <div className='inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[10px] font-bold tracking-widest text-gray-300 uppercase'>
            <Cpu className='size-3 text-[#B188FA]' /> AI-DRIVEN PRECISION
          </div>
          <h1 className='text-6xl leading-[1] font-extrabold tracking-tight text-white md:text-7xl lg:text-[5.5rem]'>
            Bespoke Career <br />
            <span className='text-[#00E599]'>Architecture.</span>
          </h1>
          <p className='max-w-md text-lg leading-relaxed text-gray-400'>
            Precision-engineered resumes and career strategies tailored to your
            unique professional DNA. Stop applying. Start being selected.
          </p>
          <div className='flex flex-wrap items-center gap-4 pt-4'>
            <Button
              asChild
              className='h-14 rounded bg-[#00E599] px-8 text-base font-bold text-black shadow-[0_0_30px_rgba(0,229,153,0.3)] hover:bg-[#00E599]/90'
            >
              <Link
                to='/sign-in'
                search={(prev) => ({ ...prev, intent: 'new' })}
              >
                Build My Resume <span className='ml-2 font-normal'>→</span>
              </Link>
            </Button>
            <Button
              onClick={() => setIsUploadModalOpen(true)}
              variant='outline'
              className='h-14 rounded border-white/10 bg-white/5 px-8 text-base font-bold text-white transition-colors hover:bg-white/10'
            >
              Import Resume
            </Button>
          </div>
        </div>

        {/* Hero Visual Mock */}
        <div className='relative w-full max-w-lg lg:ml-auto'>
          <div className='absolute inset-0 rounded-full bg-[#00E599]/5 blur-[120px]'></div>
          <div className='relative flex flex-col overflow-hidden rounded-xl border border-white/10 bg-[#151921] shadow-2xl'>
            {/* Window controls */}
            <div className='flex items-center justify-between border-b border-white/5 bg-[#151921] px-4 py-3'>
              <div className='flex gap-2'>
                <div className='size-2.5 rounded-full bg-[#ff5f56]'></div>
                <div className='size-2.5 rounded-full bg-[#ffbd2e]'></div>
                <div className='size-2.5 rounded-full bg-[#27c93f]'></div>
              </div>
              <div className='font-mono text-[9px] tracking-widest text-gray-500 uppercase'>
                banana_vp_resume.pdf
              </div>
              <div className='w-10'></div> {/* Spacer */}
            </div>
            {/* Document mock area */}
            <div className='relative flex h-[350px] flex-row gap-6 overflow-hidden bg-[#0D1117] p-6'>
              {/* Sidebar styling */}
              <div className='relative z-10 flex w-[140px] flex-col gap-4'>
                {/* Tailor suggestion block */}
                <div className='mt-10 rounded-lg border border-[#00E599]/30 bg-[#1A1F2B] p-3 shadow-lg'>
                  <div className='mb-2 flex items-center gap-2'>
                    <ShieldCheck className='size-3 text-[#00E599]' />
                    <span className='text-[8px] font-bold tracking-wider text-[#00E599] uppercase'>
                      Tailor Suggestion
                    </span>
                  </div>
                  <p className='text-[9px] leading-relaxed text-gray-400'>
                    Swap "Managed team" with "Orchestrated cross-functional
                    squads to scale operations by 300%".
                  </p>
                </div>
                <div className='mt-auto h-6 w-full rounded bg-white/5'></div>
                <div className='h-6 w-full rounded bg-white/5'></div>
              </div>

              {/* PDF Document body */}
              <div className='relative flex-1 rounded bg-white p-6 text-black shadow-sm'>
                <h2 className='mb-3 border-b border-gray-200 pb-2 font-serif text-xl tracking-widest uppercase'>
                  Alex Rivera
                </h2>
                <div className='mb-6 flex justify-between font-sans text-[7px] tracking-wider text-gray-500 uppercase'>
                  <span>San Francisco, CA</span>
                  <span>arivera@example.com</span>
                </div>
                <div className='space-y-3'>
                  <div className='h-1.5 w-full rounded bg-gray-200'></div>
                  <div className='h-1.5 w-[90%] rounded bg-gray-200'></div>
                  <div className='h-1.5 w-[95%] rounded bg-gray-200'></div>
                  <div className='mt-6 h-1.5 w-[80%] rounded bg-gray-200'></div>
                  <div className='h-1.5 w-full rounded bg-gray-200'></div>
                  <div className='h-1.5 w-[85%] rounded bg-gray-200'></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Brands Section */}
      <section className='mt-12 border-y border-white/5 bg-[#12151C] py-12'>
        <div className='mx-auto max-w-7xl px-8 text-center'>
          <p className='mb-8 text-[10px] font-bold tracking-[0.2em] text-gray-500 uppercase'>
            Our candidates have been architected into leadership roles at
          </p>
          <div className='flex flex-wrap items-center justify-center gap-12 opacity-50 grayscale md:gap-24'>
            {/* Simple text logos for replication */}
            <span className='font-sans text-xl font-bold tracking-tight opacity-80 md:text-2xl'>
              APPLE
            </span>
            <span className='font-sans text-xl font-bold tracking-tight opacity-80 md:text-2xl'>
              NVIDIA
            </span>
            <span className='font-sans text-xl font-bold tracking-tight opacity-80 md:text-2xl'>
              STRIPE
            </span>
            <span className='font-sans text-xl font-bold tracking-tight opacity-80 md:text-2xl'>
              NETFLIX
            </span>
            <span className='font-sans text-xl font-bold tracking-tight opacity-80 md:text-2xl'>
              AIRBNB
            </span>
          </div>
        </div>
      </section>

      {/* Feature Section */}
      <section id='features' className='py-32'>
        <div className='mx-auto max-w-7xl px-8'>
          <div className='mb-16'>
            <h2 className='mb-4 text-4xl font-extrabold md:text-5xl'>
              The Science of Selection.
            </h2>
            <p className='max-w-2xl text-lg leading-relaxed text-gray-400'>
              We don't just fill templates. We engineer psychological triggers
              that command attention from both human recruiters and digital
              gatekeepers.
            </p>
          </div>

          <div className='grid gap-6 md:grid-cols-3'>
            <div className='rounded-2xl border border-white/5 bg-[#151921] p-8'>
              <div className='mb-6 w-fit rounded-xl bg-white/5 p-3'>
                <LayoutTemplate className='size-5 text-[#00E599]' />
              </div>
              <h3 className='mb-3 text-xl font-bold'>Architected for Impact</h3>
              <p className='text-sm leading-relaxed text-gray-400'>
                Recruiters spend only 6 seconds on initial scans. Our layouts
                are mathematically optimized to deliver your peak value
                propositions instantly.
              </p>
            </div>

            <div className='rounded-2xl border border-white/5 bg-[#151921] p-8'>
              <div className='mb-6 w-fit rounded-xl bg-[#B188FA]/10 p-3'>
                <Cpu className='size-5 text-[#B188FA]' />
              </div>
              <h3 className='mb-3 text-xl font-bold'>ATS-Infallible Parsing</h3>
              <p className='text-sm leading-relaxed text-gray-400'>
                Most resumes die in the database. Our AI mimics actual Talent
                Management Systems to ensure 100% readability and keyword
                relevance.
              </p>
            </div>

            <div className='rounded-2xl border border-white/5 bg-[#151921] p-8'>
              <div className='mb-6 w-fit rounded-xl bg-[#00E599]/10 p-3'>
                <Eye className='size-5 text-[#00E599]' />
              </div>
              <h3 className='mb-3 text-xl font-bold'>
                Psychological Hierarchy
              </h3>
              <p className='text-sm leading-relaxed text-gray-400'>
                Design follows behavior. We leverage natural F-pattern
                eye-tracking studies to anchor your skills where eyes linger
                longest.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Split section - Curated by intelligence */}
      <section className='py-20'>
        <div className='mx-auto grid max-w-7xl items-center gap-20 px-8 lg:grid-cols-2'>
          <div className='relative flex min-h-[500px] items-center justify-center overflow-hidden rounded-[2rem] bg-[#E1E4E8] p-12'>
            {/* A mocked up resume paper */}
            <div className='relative z-0 h-[400px] w-[280px] -rotate-2 transform rounded bg-white p-8 shadow-2xl'>
              {/* Fake avatar & header */}
              <div className='mb-6 flex items-center gap-4'>
                <div className='size-12 rounded-full bg-[#fca5a5]'></div>
                <div>
                  <div className='mb-2 h-3 w-24 rounded bg-gray-800'></div>
                  <div className='h-1.5 w-16 rounded bg-gray-400'></div>
                </div>
              </div>
              {/* Fake body lines */}
              <div className='space-y-4'>
                <div className='flex items-start gap-3'>
                  <div className='mt-0.5 size-3 shrink-0 rounded-full bg-[#fbbf24]'></div>
                  <div className='flex-1 space-y-2'>
                    <div className='h-1.5 w-full rounded bg-gray-200'></div>
                    <div className='h-1.5 w-5/6 rounded bg-gray-200'></div>
                    <div className='h-1.5 w-4/6 rounded bg-gray-200'></div>
                  </div>
                </div>
                <div className='flex items-start gap-3'>
                  <div className='mt-0.5 size-3 shrink-0 rounded-full bg-[#fbbf24]'></div>
                  <div className='flex-1 space-y-2'>
                    <div className='h-1.5 w-full rounded bg-gray-200'></div>
                    <div className='h-1.5 w-5/6 rounded bg-gray-200'></div>
                  </div>
                </div>
                <div className='flex items-start gap-3'>
                  <div className='mt-0.5 size-3 shrink-0 rounded-full bg-[#d97706]'></div>
                  <div className='flex-1 space-y-2'>
                    <div className='h-1.5 w-full rounded bg-gray-200'></div>
                    <div className='h-1.5 w-3/4 rounded bg-gray-200'></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Tooltip floating over it */}
            <div className='absolute right-12 bottom-12 z-10 max-w-[280px] rounded-2xl border border-white/10 bg-[#1A1F2B]/95 p-5 shadow-2xl backdrop-blur-sm md:-right-8 lg:-right-4 xl:right-12'>
              <div className='mb-3 flex items-center gap-3'>
                <div className='rounded-full bg-[#00E599]/20 p-1.5'>
                  <CheckCircle2 className='size-4 text-[#00E599]' />
                </div>
                <span className='text-sm font-bold text-white'>
                  Certified Layout
                </span>
              </div>
              <p className='text-xs leading-relaxed text-gray-400 italic'>
                "The format of this document was the first thing the hiring
                manager complimented during my interview at Stripe."
              </p>
            </div>
          </div>

          <div className='space-y-8'>
            <h2 className='text-4xl leading-[1.1] font-extrabold md:text-5xl'>
              Your story,
              <br />
              <span className='text-[#00E599]'>curated by intelligence.</span>
            </h2>
            <div className='space-y-6 pt-4'>
              <div className='flex gap-4'>
                <div className='mt-1 flex size-5 shrink-0 items-center justify-center rounded-full bg-[#00E599] p-0.5 text-black'>
                  <Check className='size-3 stroke-[3]' />
                </div>
                <div>
                  <h4 className='mb-1 text-base font-bold text-white'>
                    Dynamic tailoring
                  </h4>
                  <p className='text-sm leading-relaxed text-gray-400'>
                    One resume for every application. Our AI re-prioritizes your
                    achievements based on the specific job description.
                  </p>
                </div>
              </div>
              <div className='flex gap-4'>
                <div className='mt-1 flex size-5 shrink-0 items-center justify-center rounded-full bg-[#00E599] p-0.5 text-black'>
                  <Check className='size-3 stroke-[3]' />
                </div>
                <div>
                  <h4 className='mb-1 text-base font-bold text-white'>
                    Impact-first phrasing
                  </h4>
                  <p className='text-sm leading-relaxed text-gray-400'>
                    Transform passive responsibilities into outcome-driven
                    accomplishments using industry-standard verbs.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pre-footer CTA */}
      <section className='relative overflow-hidden py-32'>
        <div className='relative z-10 mx-auto max-w-4xl rounded-[2rem] border border-white/5 bg-[#151921] px-8 py-20 text-center'>
          <h2 className='mb-6 text-4xl font-extrabold md:text-5xl'>
            Your next chapter deserves <br />
            superior craftsmanship.
          </h2>
          <p className='mb-10 text-lg text-gray-400'>
            Join 50,000+ professionals who stopped settling for templates and{' '}
            <br className='hidden md:block' />
            started using precision architecture.
          </p>
          <Button
            asChild
            className='h-14 rounded bg-[#00E599] px-10 text-base font-bold text-black shadow-[0_0_30px_rgba(0,229,153,0.3)] hover:bg-[#00E599]/90'
          >
            <Link to='/sign-in' search={(prev) => ({ ...prev, intent: 'new' })}>
              Start Building Free
            </Link>
          </Button>
          <p className='mt-8 text-[10px] font-bold tracking-[0.2em] text-gray-500 uppercase'>
            NO CREDIT CARD REQUIRED • PRECISION GUARANTEED
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className='border-t border-white/5 py-12'>
        <div className='mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-8 md:flex-row'>
          <div className='flex flex-col gap-4 text-center md:text-left'>
            <div className='flex items-center justify-center gap-2 font-bold md:justify-start'>
              <div className='text-[#eab308]'>
                <FileText className='size-4' />
              </div>
              <span className='text-sm text-white'>The Digital Tailor</span>
            </div>
            <p className='text-[9px] font-bold tracking-widest text-gray-600 uppercase'>
              © 2024 THE DIGITAL TAILOR. CRAFTED FOR PRECISION.
            </p>
          </div>

          <div className='mx-auto flex gap-8 text-[10px] font-bold tracking-widest text-gray-400 uppercase md:mx-0'>
            <a href='#' className='transition-colors hover:text-white'>
              Privacy Policy
            </a>
            <a href='#' className='transition-colors hover:text-white'>
              Terms of Service
            </a>
            <a href='#' className='transition-colors hover:text-white'>
              Cookie Policy
            </a>
          </div>

          <div className='flex items-center justify-center gap-4 text-gray-500 md:justify-end'>
            <a href='#' className='transition-colors hover:text-white'>
              {/* <Dribbble className='size-5' /> */}
            </a>
            <a href='#' className='transition-colors hover:text-white'>
              <Twitter className='flex size-5 rounded bg-gray-500/20 p-1 text-inherit' />
            </a>
          </div>
        </div>
      </footer>

      {/* Upload Modal */}
      <UploadModal
        open={isUploadModalOpen}
        onOpenChange={setIsUploadModalOpen}
      />
    </div>
  )
}
