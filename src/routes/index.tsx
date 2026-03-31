import * as React from 'react'
import { createFileRoute, Link } from '@tanstack/react-router'
import { FileText, Cpu, CheckCircle2, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { UploadModal } from '@/components/upload-modal'

export const Route = createFileRoute('/')({
  component: LandingPage,
})

function LandingPage() {
  const [isUploadModalOpen, setIsUploadModalOpen] = React.useState(false)

  return (
    <div className='min-h-screen overflow-x-hidden bg-background font-sans text-foreground selection:bg-primary/30'>
      {/* Header */}
      <header className='mx-auto flex max-w-7xl items-center justify-between px-8 py-6'>
        <div className='flex items-center gap-2 font-bold'>
          <div className='flex size-6 items-center justify-center rounded bg-foreground text-background'>
            <span className='text-xs'>A</span>
          </div>
          <span className='text-sm text-foreground'>The Digital Tailor</span>
        </div>
        <nav className='hidden gap-8 text-[11px] font-semibold tracking-wide uppercase md:flex'>
          <a
            href='#builder'
            className='border-b-2 border-primary pb-1 text-primary transition-colors hover:text-primary/80'
          >
            Resume Builder
          </a>
          <a
            href='#templates'
            className='border-b-2 border-transparent pb-1 text-muted-foreground transition-colors hover:text-foreground'
          >
            Templates
          </a>
          <a
            href='#resources'
            className='border-b-2 border-transparent pb-1 text-muted-foreground transition-colors hover:text-foreground'
          >
            Resources
          </a>
        </nav>
        <div className='flex items-center gap-4'>
          <Button
            asChild
            variant='ghost'
            className='hidden text-xs font-bold text-foreground opacity-80 hover:bg-transparent hover:text-primary md:inline-flex'
          >
            <Link to='/sign-in'>Login</Link>
          </Button>
          <Button
            asChild
            className='h-8 bg-primary px-6 text-xs font-bold text-primary-foreground shadow-ambient hover:bg-primary/90'
          >
            <Link to='/sign-in'>Sign Up</Link>
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <main className='mx-auto flex max-w-7xl flex-col items-center justify-between gap-16 px-8 py-20 lg:flex-row'>
        <div className='flex-1 space-y-6'>
          <div className='inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-[10px] font-bold text-primary'>
            <Sparkles className='size-3 text-primary' /> New: AI-Powered Career
            Pathfinding
          </div>
          <h1 className='text-5xl leading-[1.1] font-extrabold tracking-tight text-foreground md:text-6xl lg:text-[4.5rem]'>
            Bespoke <br />
            <span className='bg-gradient-to-r from-primary to-tertiary bg-clip-text text-transparent'>
              Career Architecture
            </span>
          </h1>
          <p className='max-w-md text-sm leading-relaxed text-muted-foreground md:text-base'>
            Precision-engineered resumes and career strategies tailored to your
            unique professional DNA. Stop applying. Start being selected.
          </p>
          <div className='flex flex-wrap items-center gap-4 pt-4'>
            <Button
              asChild
              className='h-12 w-full rounded bg-primary px-8 text-sm font-bold text-primary-foreground shadow-ambient hover:bg-primary/90 md:w-auto'
            >
              <Link
                to='/sign-in'
                search={(prev) => ({ ...prev, intent: 'new' })}
              >
                Build My Masterpiece ➔
              </Link>
            </Button>
            <Button
              variant='outline'
              onClick={() => setIsUploadModalOpen(true)}
              className='h-12 w-full rounded border border-primary/20 bg-primary/5 px-8 text-sm font-bold text-primary transition-colors hover:bg-primary/10 md:w-auto'
            >
              View Templates
            </Button>
          </div>
          <div className='flex items-center gap-4 pt-6'>
            <div className='flex -space-x-3'>
              <div className='size-9 rounded border-2 border-background bg-teal-800' />
              <div className='size-9 rounded border-2 border-background bg-slate-700' />
              <div className='size-9 rounded border-2 border-background bg-cyan-900' />
            </div>
            <div className='text-[10px]'>
              <p className='font-bold text-foreground'>
                Join 45,000+ professionals
              </p>
              <p className='text-muted-foreground'>
                Trusted by leaders at Google, Meta, and Tesla
              </p>
            </div>
          </div>
        </div>

        {/* Hero Visual Mock */}
        <div className='relative w-full max-w-md lg:w-[460px]'>
          <div className='absolute -inset-10 rounded-full bg-primary/20 blur-[100px]'></div>
          {/* Abstract Mockup Window - Dark by default as per UI Reference */}
          <div className='relative flex h-[380px] w-full flex-col overflow-hidden rounded-xl border border-white/10 bg-[#1e232b] shadow-2xl'>
            <div className='flex items-center border-b border-white/5 bg-[#181c22] px-4 py-3'>
              <div className='h-2 w-32 rounded bg-white/10'></div>
            </div>
            <div className='flex flex-1 p-6'>
              <div className='flex w-full gap-4'>
                {/* Sidebar */}
                <div className='flex w-1/3 flex-col gap-3 rounded border border-white/5 bg-white/5 p-3'>
                  <div className='h-2 w-20 rounded bg-white/20'></div>
                  <div className='space-y-1.5 pt-2'>
                    <div className='h-1 w-full rounded bg-white/10'></div>
                    <div className='h-1 w-full rounded bg-white/10'></div>
                    <div className='h-1 w-5/6 rounded bg-white/10'></div>
                  </div>
                </div>
                {/* Main Table Content */}
                <div className='flex-1 rounded border border-white/5 bg-white/5 p-4'>
                  <div className='mb-3 flex justify-between border-b border-white/5 pb-2'>
                    <div className='h-2 w-16 rounded bg-white/20'></div>
                    <div className='h-2 w-16 rounded bg-white/20'></div>
                  </div>
                  <div className='space-y-2'>
                    {[...Array(6)].map((_, i) => (
                      <div
                        key={i}
                        className='flex flex-wrap items-center justify-between gap-2 px-1 py-1.5'
                      >
                        <div className='h-1 w-10 rounded bg-white/20'></div>
                        <div className='flex gap-1'>
                          <div className='size-1.5 rounded-sm bg-orange-400'></div>
                          <div className='size-1.5 rounded-sm bg-cyan-400'></div>
                          <div className='size-1.5 rounded-sm bg-purple-400'></div>
                        </div>
                        <div className='h-1 w-8 rounded bg-white/10'></div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Absolute overlay elements */}
            <div className='absolute top-10 left-10 p-2'>
              <div className='h-2 w-24 rounded bg-white/30'></div>
            </div>
          </div>

          {/* Floating suggestion card */}
          <div className='absolute -bottom-6 -left-10 z-10 w-[240px] rounded-lg border border-border bg-card p-4 shadow-xl'>
            <div className='mb-2 flex items-center gap-2'>
              <div className='flex size-5 items-center justify-center rounded bg-primary text-primary-foreground'>
                <Cpu className='size-3' />
              </div>
              <span className='text-[9px] font-bold tracking-widest text-foreground uppercase'>
                Digital Tailor AI
              </span>
            </div>
            <p className='text-xs leading-relaxed text-muted-foreground'>
              "Your technical skills segment is 42% more effective with the new
              layout."
            </p>
          </div>
        </div>
      </main>

      {/* Brands Section */}
      <section className='mt-10 border-y border-border bg-secondary/50 py-16'>
        <div className='mx-auto max-w-7xl px-8 text-center'>
          <p className='mb-10 text-[10px] font-bold tracking-widest text-muted-foreground uppercase'>
            Building success with talent from
          </p>
          <div className='flex flex-wrap items-center justify-center gap-12 opacity-40 grayscale md:gap-20'>
            <div className='h-6 w-12 bg-muted-foreground/30'></div>
            <div className='h-6 w-12 bg-muted-foreground/30'></div>
            <div className='h-6 w-16 bg-muted-foreground/30'></div>
            <div className='h-6 w-10 bg-muted-foreground/30'></div>
            <div className='h-6 w-12 bg-muted-foreground/30'></div>
          </div>
        </div>
      </section>

      {/* Feature Section */}
      <section id='features' className='mx-auto max-w-7xl px-8 py-32'>
        <div className='mb-16'>
          <h2 className='mb-4 text-4xl font-extrabold md:text-5xl'>
            Architected for{' '}
            <span className='font-serif text-primary italic'>Impact</span>
          </h2>
          <p className='max-w-xl text-sm leading-relaxed text-muted-foreground'>
            Traditional builders fill boxes. We engineer visual hierarchies that
            command attention in under 6 seconds.
          </p>
        </div>

        <div className='grid grid-cols-1 gap-6 md:grid-cols-4'>
          {/* ATS Parsing Card */}
          <div className='flex flex-col justify-between overflow-hidden rounded-[2rem] border border-border bg-secondary p-8 md:col-span-3'>
            <div>
              <div className='mb-6 p-1'>
                <FileText className='size-6 text-primary' />
              </div>
              <h3 className='text-lg font-bold text-foreground'>
                ATS-Infallible Parsing
              </h3>
              <p className='mt-3 max-w-xs text-xs leading-relaxed text-muted-foreground'>
                Our algorithms don't just mimic keywords; they mirror the
                structural expectations of modern talent management systems.
              </p>
            </div>
            <div className='relative mt-8 flex h-20 w-full flex-col justify-center gap-2 rounded-xl border border-border bg-card px-6 opacity-50 shadow-sm md:w-3/4'>
              {/* Abstract scanning laser gradient */}
              <div className='absolute top-0 right-0 h-full w-1/3 bg-gradient-to-r from-transparent to-primary/10'></div>
              <div className='h-2 w-full rounded bg-border'></div>
              <div className='h-2 w-5/6 rounded bg-border'></div>
              <div className='h-2 w-4/6 rounded bg-border'></div>
            </div>
          </div>

          {/* 94% Success Rate Card */}
          <div className='flex flex-col justify-center rounded-[2rem] bg-gradient-to-br from-tertiary to-primary p-8 text-primary-foreground shadow-ambient md:col-span-1 md:row-span-2'>
            <div className='text-5xl font-black'>94%</div>
            <div className='mt-2 text-[9px] font-bold tracking-widest uppercase opacity-90'>
              Interview Success Rate
            </div>
            <p className='mt-8 text-xs leading-relaxed font-medium opacity-100'>
              Users who leverage our AI-tailoring report a significant increase
              in recruiter callbacks within 7 days.
            </p>
          </div>

          {/* Psychological Hierarchy Card */}
          <div className='rounded-[2rem] border border-border bg-card p-8 md:col-span-1'>
            <div className='mb-6'>
              <div className='inline-flex rounded-full bg-primary/10 p-2'>
                <div className='size-3 rounded-full bg-primary'></div>
              </div>
            </div>
            <h3 className='mb-2 text-sm font-bold text-foreground'>
              Psychological Hierarchy
            </h3>
            <p className='text-xs leading-relaxed text-muted-foreground'>
              Layouts designed around F-pattern scanning behaviors to ensure
              your key accomplishments are seen first.
            </p>
          </div>

          {/* Precision Typography Card */}
          <div className='flex flex-col items-start justify-between gap-6 rounded-[2rem] border border-border bg-card p-8 shadow-sm md:col-span-2 md:flex-row md:items-center'>
            <div className='max-w-[200px]'>
              <h3 className='mb-2 text-sm font-bold text-foreground'>
                Precision Typography
              </h3>
              <p className='text-[11px] leading-relaxed text-muted-foreground'>
                Custom-paired fonts optimized for both digital screen rendering
                and high-resolution printing.
              </p>
            </div>
            <div className='flex gap-3'>
              <div className='flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-secondary font-serif text-xl tracking-tight text-foreground'>
                Aa
              </div>
              <div className='flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-muted font-sans text-xl tracking-tight text-foreground'>
                Aa
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Real-time Optimization */}
      <section className='mx-auto flex max-w-7xl flex-col items-center justify-between gap-20 px-8 py-24 md:flex-row'>
        <div className='flex-1 space-y-6'>
          <h2 className='text-4xl font-extrabold text-foreground'>
            Real-time Optimization
          </h2>
          <p className='max-w-sm text-xs leading-relaxed text-muted-foreground'>
            Watch your resume strengthen as you type. Our real-time scoring
            engine evaluates impact, quantitative data, and professional
            clarity.
          </p>
          <ul className='space-y-4 pt-4'>
            <li className='flex items-center gap-3 text-xs font-semibold text-foreground'>
              <div className='rounded-full bg-primary p-0.5 text-primary-foreground'>
                <CheckCircle2 className='size-3 stroke-[3]' />
              </div>
              Action Verb Optimization
            </li>
            <li className='flex items-center gap-3 text-xs font-semibold text-foreground'>
              <div className='rounded-full bg-primary p-0.5 text-primary-foreground'>
                <CheckCircle2 className='size-3 stroke-[3]' />
              </div>
              Impact Quantification Analysis
            </li>
            <li className='flex items-center gap-3 text-xs font-semibold text-foreground'>
              <div className='rounded-full bg-primary p-0.5 text-primary-foreground'>
                <CheckCircle2 className='size-3 stroke-[3]' />
              </div>
              Keyword Density Checks
            </li>
          </ul>
        </div>

        {/* Progress Gauge */}
        <div className='relative flex size-64 shrink-0 items-center justify-end md:mr-10'>
          <div className='relative flex size-[14rem] items-center justify-center'>
            <svg
              className='absolute inset-0 size-full rotate-[-90deg]'
              viewBox='0 0 100 100'
            >
              <circle
                cx='50'
                cy='50'
                r='45'
                fill='none'
                className='stroke-muted'
                strokeWidth='8'
              />
              <circle
                cx='50'
                cy='50'
                r='45'
                fill='none'
                className='stroke-primary'
                strokeWidth='8'
                strokeDasharray='283'
                strokeDashoffset='42'
                strokeLinecap='round'
              />
            </svg>

            <div className='absolute top-3 right-6 size-3 rounded-full bg-primary shadow-sm ring-4 ring-background'></div>

            <div className='z-10 text-center'>
              <div className='text-5xl font-black text-foreground'>85</div>
              <div className='mt-1 text-[8px] font-bold tracking-widest text-muted-foreground uppercase'>
                Mastery Score
              </div>
            </div>
          </div>

          {/* AI badge */}
          <div className='absolute -top-4 right-8 z-20 flex items-center gap-1 rounded-full border border-border bg-card px-3 py-1.5 shadow-sm'>
            <div className='flex size-3 items-center justify-center rounded bg-primary text-primary-foreground'>
              <Cpu className='size-2' />
            </div>
            <span className='text-[8px] font-bold tracking-widest text-foreground uppercase'>
              AI Recommended
            </span>
          </div>
        </div>
      </section>

      {/* Pre-footer CTA */}
      <section className='px-8 py-32'>
        <div className='mx-auto flex max-w-4xl flex-col items-center justify-center rounded-[2.5rem] bg-foreground px-8 py-20 text-center text-background shadow-2xl'>
          <h2 className='text-3xl leading-tight font-extrabold md:text-5xl'>
            Your next chapter deserves <br /> superior craftsmanship.
          </h2>
          <p className='mt-6 text-sm text-background/70'>
            Don't leave your professional narrative to chance. Deploy a bespoke
            strategy <br className='hidden md:block' /> designed by the Digital
            Tailor.
          </p>
          <Button
            asChild
            className='mt-10 h-14 rounded bg-primary px-10 text-sm font-bold text-primary-foreground shadow-ambient hover:bg-primary/90'
          >
            <Link to='/sign-in' search={(prev) => ({ ...prev, intent: 'new' })}>
              Start Building Free
            </Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className='border-t border-border bg-background py-16'>
        <div className='mx-auto flex max-w-7xl flex-col items-start justify-between gap-10 px-8 md:flex-row md:items-end'>
          <div className='flex flex-col gap-4'>
            <div className='flex items-center gap-2 font-bold'>
              <div className='flex text-primary'>
                <span className='text-lg'>▲</span>
              </div>
              <span className='text-sm text-foreground'>
                The Digital Tailor
              </span>
            </div>
            <p className='text-[10px] leading-relaxed text-muted-foreground'>
              Precision in every pixel. Elevating careers <br /> through
              strategic design and AI intelligence.
            </p>
          </div>

          <div className='flex gap-8 text-[10px] tracking-wide text-muted-foreground uppercase'>
            <a href='#' className='transition-colors hover:text-foreground'>
              Career Advice
            </a>
            <a href='#' className='transition-colors hover:text-foreground'>
              Privacy Policy
            </a>
            <a href='#' className='transition-colors hover:text-foreground'>
              Terms of Service
            </a>
            <a href='#' className='transition-colors hover:text-foreground'>
              Contact Support
            </a>
          </div>
        </div>
        <div className='mx-auto mt-12 max-w-7xl px-8 text-center md:text-left'>
          <p className='text-[9px] tracking-widest text-muted-foreground/60 uppercase'>
            © 2024 The Digital Tailor. Precision in every pixel.
          </p>
        </div>
      </footer>

      <UploadModal
        open={isUploadModalOpen}
        onOpenChange={setIsUploadModalOpen}
      />
    </div>
  )
}
