import * as React from 'react'
import { Link } from '@tanstack/react-router'
import { FileEdit, FileText, LayoutTemplate, Briefcase } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { GlassChatWidget } from '@/components/glass-chat-widget'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'

export function Dashboard() {
  const [chatOpen, setChatOpen] = React.useState(true)

  return (
    <>
      <Header>
        <div className='ms-auto flex items-center space-x-4'>
          <Search />
          <ThemeSwitch />
          <ProfileDropdown />
        </div>
      </Header>

      <Main className='relative bg-surface'>
        <div className='mx-auto mt-8 flex w-full max-w-7xl flex-col gap-12 md:flex-row'>
          {/* Left Column (70%) */}
          <div className='flex-1 space-y-8 lg:w-[70%]'>
            <div className='space-y-4'>
              <h1 className='text-display-lg text-Foreground font-manrope text-5xl font-extrabold tracking-tight md:text-6xl'>
                Craft the perfect
                <br />
                <span className='text-primary'>Executive Resume.</span>
              </h1>
              <p className='mt-4 max-w-2xl font-inter text-lg text-muted-foreground'>
                The Digital Tailor system analyzes your experience and aligns it
                to leadership role expectations with precise, bespoke
                formatting.
              </p>
            </div>

            <div className='mt-12 grid gap-6 sm:grid-cols-2'>
              <Link
                to='/templates'
                className='flex flex-col rounded-2xl bg-surface-container-lowest p-8 shadow-ambient transition-transform hover:scale-[1.02]'
              >
                <div className='w-fit rounded-xl bg-surface-container-low p-3 text-primary-container'>
                  <LayoutTemplate className='size-6' />
                </div>
                <h3 className='mt-6 font-manrope text-xl font-bold'>
                  Template Gallery
                </h3>
                <p className='mt-2 font-inter text-sm text-muted-foreground'>
                  Start with an AI-optimized, editorial style resume structure.
                </p>
              </Link>

              <Link
                to='/onboarding'
                className='flex flex-col rounded-2xl bg-surface-container-lowest p-8 shadow-ambient transition-transform hover:scale-[1.02]'
              >
                <div className='w-fit rounded-xl bg-surface-container-low p-3 text-tertiary-container'>
                  <Briefcase className='size-6' />
                </div>
                <h3 className='mt-6 font-manrope text-xl font-bold'>
                  Tailor to Job
                </h3>
                <p className='mt-2 font-inter text-sm text-muted-foreground'>
                  Input a job description and we will rewrite your achievements.
                </p>
              </Link>

              <Link
                to='/editor'
                className='flex flex-col rounded-2xl bg-surface-container-lowest p-8 shadow-ambient transition-transform hover:scale-[1.02]'
              >
                <div className='w-fit rounded-xl bg-surface-container-low p-3 text-primary'>
                  <FileEdit className='size-6' />
                </div>
                <h3 className='mt-6 font-manrope text-xl font-bold'>
                  Start from Scratch
                </h3>
                <p className='mt-2 font-inter text-sm text-muted-foreground'>
                  Draft a universal resume using our guided Synthetix editor.
                </p>
              </Link>
            </div>
          </div>

          {/* Right Column Ambient Info (30%) */}
          <div className='w-full space-y-6 lg:w-[30%]'>
            <div className='rounded-2xl bg-surface-container-low p-6'>
              <h3 className='mb-4 font-manrope font-bold'>Recent Documents</h3>
              <div className='space-y-4'>
                <div className='flex items-center gap-3 rounded-xl bg-surface-container-lowest p-3 shadow-sm'>
                  <FileText className='size-5 text-muted-foreground' />
                  <div>
                    <p className='w-40 truncate text-sm font-semibold'>
                      VP Engineering Base
                    </p>
                    <p className='text-xs text-muted-foreground'>
                      Updated 2h ago
                    </p>
                  </div>
                </div>
                <div className='flex items-center gap-3 rounded-xl bg-surface-container-lowest p-3 shadow-sm'>
                  <FileText className='size-5 text-muted-foreground' />
                  <div>
                    <p className='w-40 truncate text-sm font-semibold'>
                      Director Tech (Tailored)
                    </p>
                    <p className='text-xs text-muted-foreground'>
                      Updated 1d ago
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className='rounded-2xl border-t border-outline-variant/20 bg-[linear-gradient(to_bottom,var(--color-surface-container-low),var(--color-surface))] p-6'>
              <h3 className='mb-2 font-manrope font-bold'>Resume Strength</h3>
              <div className='mb-2 flex items-end gap-3'>
                <span className='text-4xl font-extrabold text-primary'>84</span>
                <span className='mb-1 text-sm text-muted-foreground'>
                  / 100
                </span>
              </div>
              <div className='h-2 w-full overflow-hidden rounded-full bg-surface-container-highest'>
                <div className='relative h-full w-[84%] rounded-full bg-[linear-gradient(to_right,var(--color-tertiary),var(--color-primary))]' />
              </div>
              <Button
                variant='ai-action'
                className='mt-6 flex w-full justify-center gap-2 rounded-xl bg-[linear-gradient(to_right,var(--color-tertiary-container),var(--color-primary-container))] py-4 font-bold text-white'
              >
                <SparklesIcon className='size-4' /> Improve Score
              </Button>
            </div>
          </div>
        </div>
      </Main>

      <GlassChatWidget isOpen={chatOpen} onClose={() => setChatOpen(false)} />

      {/* Floating trigger if closed */}
      {!chatOpen && (
        <Button
          variant='ai-action'
          size='icon'
          onClick={() => setChatOpen(true)}
          className='fixed right-6 bottom-6 h-14 w-14 rounded-full bg-[linear-gradient(to_right,var(--color-tertiary-container),var(--color-primary-container))] text-white shadow-ambient'
        >
          <SparklesIcon className='size-6' />
        </Button>
      )}
    </>
  )
}

function SparklesIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
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
      <path d='M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z' />
    </svg>
  )
}
