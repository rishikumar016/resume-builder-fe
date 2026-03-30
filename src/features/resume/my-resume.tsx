import { FilePlus, MoreVertical } from 'lucide-react'
import { ConfigDrawer } from '@/components/config-drawer'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'

export const MyResume = () => {
  return (
    <div className='min-h-screen'>
      <Header className='border-b border-border'>
        <Search />
        <div className='ms-auto flex items-center space-x-4'>
          <ThemeSwitch />
          <ConfigDrawer />
          <ProfileDropdown />
        </div>
      </Header>

      <Main fixed className='overflow-y-auto'>
        <div className='mx-auto max-w-7xl px-4 py-8 pb-20 sm:px-6 lg:px-8'>
          {/* Header Section */}
          <div className='mb-10 flex flex-col space-y-6 md:flex-row md:items-end md:justify-between'>
            <div>
              <h1 className='mb-2 text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl'>
                My Resumes
              </h1>
              <p className='max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base'>
                Manage your precision-crafted documents. Optimize for ATS
                tracking or tailor them for specific bespoke opportunities.
              </p>
            </div>
            <div className='flex self-start rounded-full border border-border bg-muted/50 p-1 md:self-auto'>
              <button className='rounded-full border border-border bg-background px-5 py-1.5 text-sm font-medium text-foreground shadow-sm'>
                All
              </button>
              <button className='rounded-full px-5 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground'>
                Recent
              </button>
              <button className='rounded-full px-5 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground'>
                Favorites
              </button>
            </div>
          </div>

          {/* Grid Section */}
          <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
            {/* Create New Card */}
            <div className='group relative flex h-95 cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-border/60 bg-surface-container-low p-6 transition-all hover:border-primary/50 hover:bg-surface-container-high'>
              <div className='text-primary-500 mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-tertiary/50 transition-colors group-hover:bg-tertiary/70'>
                <FilePlus size={26} className='text-white' />
              </div>
              <h3 className='text-lg font-bold text-foreground'>
                Create New Resume
              </h3>
              <p className='mt-2 max-w-50 text-center text-sm leading-relaxed text-muted-foreground'>
                Start from a blank canvas or import your existing LinkedIn
                profile.
              </p>
            </div>

            {/* Resume Card 1 */}
            <div className='group flex h-[380px] flex-col overflow-hidden rounded-xl border border-border bg-card shadow-lg transition-all hover:border-emerald-500/30'>
              <div className='relative h-[260px] overflow-hidden border-b border-border/30 bg-surface-container-lowest p-6'>
                {/* Resume Mockup */}
                <div className='h-full w-full opacity-60'>
                  <div className='mb-4 flex items-end justify-between border-b-2 border-foreground pb-3'>
                    <div>
                      <div className='mb-2 h-4 w-32 rounded-sm bg-foreground'></div>
                      <div className='h-2 w-24 rounded-sm bg-muted-foreground/50'></div>
                    </div>
                    <div className='flex gap-1'>
                      <div className='h-2 w-2 rounded-full bg-emerald-500'></div>
                      <div className='h-2 w-2 rounded-full bg-blue-500'></div>
                      <div className='h-2 w-2 rounded-full bg-orange-500'></div>
                    </div>
                  </div>
                  <div className='flex gap-4'>
                    <div className='w-1/3'>
                      <div className='mb-3 h-2 w-16 rounded-sm bg-muted-foreground/80'></div>
                      <div className='mb-4 space-y-1.5'>
                        <div className='h-1.5 w-full rounded-sm bg-muted'></div>
                        <div className='h-1.5 w-5/6 rounded-sm bg-muted'></div>
                        <div className='h-1.5 w-4/6 rounded-sm bg-muted'></div>
                      </div>
                    </div>
                    <div className='w-2/3'>
                      <div className='mb-3 h-2 w-20 rounded-sm bg-muted-foreground/80'></div>
                      <div className='mb-3 space-y-1.5'>
                        <div className='h-1.5 w-full rounded-sm bg-muted-foreground/40'></div>
                        <div className='h-1.5 w-11/12 rounded-sm bg-muted'></div>
                        <div className='h-1.5 w-full rounded-sm bg-muted'></div>
                      </div>
                      <div className='space-y-1.5'>
                        <div className='h-1.5 w-full rounded-sm bg-muted-foreground/40'></div>
                        <div className='h-1.5 w-10/12 rounded-sm bg-muted'></div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* ATS Badge */}
                <div className='absolute top-4 right-4 flex items-center gap-2 rounded-full border border-emerald-500/20 bg-background/95 px-3 py-1.5 text-xs font-semibold text-emerald-400 shadow-xl backdrop-blur-sm'>
                  <div className='h-1.5 w-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]'></div>
                  92% ATS
                </div>
              </div>
              <div className='flex flex-1 flex-col bg-surface-container-low p-5'>
                <div className='mb-2 flex items-start justify-between'>
                  <h3 className='truncate text-base font-semibold text-foreground'>
                    Senior Product Designer
                  </h3>
                  <button className='rounded-md p-0.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground'>
                    <MoreVertical size={18} />
                  </button>
                </div>
                <div className='mt-auto flex items-center gap-2 text-[10px] font-bold tracking-wider text-muted-foreground uppercase'>
                  <span>UPDATED 2 HOURS AGO</span>
                  <span>•</span>
                  <span>TAILORED</span>
                </div>
              </div>
            </div>

            {/* Resume Card 2 */}
            <div className='group flex h-[380px] flex-col overflow-hidden rounded-xl border border-border bg-card shadow-lg transition-all hover:border-purple-500/30'>
              <div className='relative h-[260px] overflow-hidden border-b border-border/30 bg-surface-container-lowest p-6'>
                {/* Resume Mockup */}
                <div className='flex h-full w-full flex-col opacity-70'>
                  <div className='mb-4 flex h-8 w-full items-center bg-purple-900/10 px-3'>
                    <div className='h-3 w-32 rounded-sm bg-purple-900/60'></div>
                  </div>
                  <div className='flex flex-1 gap-3 px-3'>
                    <div className='w-1/3 border-r border-border pr-3'>
                      <div className='mb-2 h-2 w-12 rounded-sm bg-muted-foreground/40'></div>
                      <div className='mb-4 space-y-1.5'>
                        <div className='h-1.5 w-full rounded-sm bg-muted/80'></div>
                        <div className='h-1.5 w-full rounded-sm bg-muted/80'></div>
                      </div>
                    </div>
                    <div className='w-2/3'>
                      <div className='mb-2 h-2 w-16 rounded-sm bg-muted-foreground/80'></div>
                      <div className='mb-3 space-y-1.5'>
                        <div className='h-1.5 w-full rounded-sm bg-muted'></div>
                        <div className='h-1.5 w-11/12 rounded-sm bg-muted'></div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* ATS Badge */}
                <div className='absolute top-4 right-4 flex items-center gap-2 rounded-full border border-purple-500/20 bg-background/95 px-3 py-1.5 text-xs font-semibold text-purple-400 shadow-xl backdrop-blur-sm'>
                  <div className='h-1.5 w-1.5 rounded-full bg-purple-500 shadow-[0_0_8px_rgba(168,85,247,0.8)]'></div>
                  85% ATS
                </div>
              </div>
              <div className='flex flex-1 flex-col bg-surface-container-low p-5'>
                <div className='mb-2 flex items-start justify-between'>
                  <h3 className='truncate text-base font-semibold text-foreground'>
                    Creative Director 2024
                  </h3>
                  <button className='rounded-md p-0.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground'>
                    <MoreVertical size={18} />
                  </button>
                </div>
                <div className='mt-auto flex items-center gap-2 text-[10px] font-bold tracking-wider text-muted-foreground uppercase'>
                  <span>UPDATED YESTERDAY</span>
                  <span>•</span>
                  <span>STANDARD</span>
                </div>
              </div>
            </div>

            {/* Resume Card 3 */}
            <div className='group flex h-[380px] flex-col overflow-hidden rounded-xl border border-border bg-card shadow-lg transition-all hover:border-red-500/30'>
              <div className='relative h-[260px] overflow-hidden border-b border-border/30 bg-surface-container-lowest p-6'>
                {/* Resume Mockup */}
                <div className='h-full w-full opacity-50'>
                  <div className='mb-6 flex justify-center pt-2'>
                    <div className='text-center'>
                      <div className='mx-auto mb-2 h-3 w-40 rounded-sm bg-muted-foreground/80'></div>
                      <div className='mx-auto h-1.5 w-24 rounded-sm bg-muted-foreground/40'></div>
                    </div>
                  </div>
                  <div className='space-y-4'>
                    <div>
                      <div className='mb-1.5 h-1.5 w-full rounded-sm bg-muted'></div>
                      <div className='h-1.5 w-5/6 rounded-sm bg-muted'></div>
                    </div>
                    <div>
                      <div className='mb-1.5 h-1.5 w-full rounded-sm bg-muted'></div>
                      <div className='h-1.5 w-4/6 rounded-sm bg-muted'></div>
                    </div>
                  </div>
                </div>
                {/* ATS Badge */}
                <div className='absolute top-4 right-4 flex items-center gap-2 rounded-full border border-red-500/20 bg-background/95 px-3 py-1.5 text-xs font-semibold text-red-500 shadow-xl backdrop-blur-sm'>
                  <div className='h-1.5 w-1.5 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.8)]'></div>
                  Low Score
                </div>
              </div>
              <div className='flex flex-1 flex-col bg-surface-container-low p-5'>
                <div className='mb-2 flex items-start justify-between'>
                  <h3 className='truncate text-base font-semibold text-foreground'>
                    Software Engineer (Me...
                  </h3>
                  <button className='rounded-md p-0.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground'>
                    <MoreVertical size={18} />
                  </button>
                </div>
                <div className='mt-auto flex items-center gap-2 text-[10px] font-bold tracking-wider text-muted-foreground uppercase'>
                  <span>UPDATED 5 DAYS AGO</span>
                  <span>•</span>
                  <span>DRAFT</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Section */}
          <div className='mt-16 flex flex-col items-end justify-between gap-10 border-t border-border/60 pt-10 md:flex-row lg:pl-4'>
            <div className='max-w-xl'>
              <p className='mb-3 text-left text-[11px] font-bold tracking-widest text-emerald-500 uppercase'>
                Atelier Insight
              </p>
              <h2 className='text-left font-serif text-2xl leading-[1.3] text-foreground italic opacity-90 lg:text-3xl'>
                "The Senior Product Designer resume is currently outperforming
                94% of applicant documents in your sector."
              </h2>
            </div>
            <div className='mt-6 flex gap-12 self-start pr-4 pb-2 md:mt-0 md:self-auto lg:gap-20'>
              <div className='flex flex-col'>
                <span className='mb-1 text-5xl font-bold tracking-tight text-foreground lg:text-6xl'>
                  12
                </span>
                <span className='text-sm font-medium text-muted-foreground'>
                  Active Resumes
                </span>
              </div>
              <div className='flex flex-col'>
                <span className='mb-1 text-5xl font-bold tracking-tight text-foreground lg:text-6xl'>
                  42
                </span>
                <span className='text-sm font-medium text-muted-foreground'>
                  AI Tailoring Iterations
                </span>
              </div>
            </div>
          </div>
        </div>
      </Main>
    </div>
  )
}
