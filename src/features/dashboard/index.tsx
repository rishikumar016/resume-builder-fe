import * as React from 'react'
import { Link } from '@tanstack/react-router'
import { FileEdit, FileText, LayoutTemplate, Briefcase } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'
import { GlassChatWidget } from '@/components/glass-chat-widget'

export function Dashboard() {
  const [chatOpen, setChatOpen] = React.useState(true)

  return (
    <>
      <Header>
        <div className='flex items-center gap-2 font-manrope font-bold text-xl'>
          <div className='bg-[linear-gradient(to_right,var(--color-tertiary-container),var(--color-primary))] text-white p-2 rounded-lg'>
            <FileText className="size-5" />
          </div>
          Synthetix
        </div>
        <div className='ms-auto flex items-center space-x-4'>
          <Search />
          <ThemeSwitch />
          <ProfileDropdown />
        </div>
      </Header>

      <Main className='bg-surface relative'>
        <div className='flex flex-col md:flex-row gap-12 max-w-7xl mx-auto mt-8 w-full'>
          
          {/* Left Column (70%) */}
          <div className='flex-1 lg:w-[70%] space-y-8'>
            <div className='space-y-4'>
              <h1 className='text-display-lg font-manrope font-extrabold text-Foreground tracking-tight text-5xl md:text-6xl'>
                Craft the perfect<br /><span className="text-primary">Executive Resume.</span>
              </h1>
              <p className='text-lg font-inter text-muted-foreground max-w-2xl mt-4'>
                The Digital Tailor system analyzes your experience and aligns it to leadership role expectations with precise, bespoke formatting. 
              </p>
            </div>

            <div className='grid sm:grid-cols-2 gap-6 mt-12'>
              <Link to="/templates" className="flex flex-col p-8 bg-surface-container-lowest rounded-2xl shadow-ambient hover:scale-[1.02] transition-transform">
                <div className='p-3 bg-surface-container-low rounded-xl w-fit text-primary-container'>
                   <LayoutTemplate className="size-6" />
                </div>
                <h3 className='mt-6 font-manrope text-xl font-bold'>Template Gallery</h3>
                <p className='mt-2 text-muted-foreground text-sm font-inter'>Start with an AI-optimized, editorial style resume structure.</p>
              </Link>
              
              <Link to="/onboarding" className="flex flex-col p-8 bg-surface-container-lowest rounded-2xl shadow-ambient hover:scale-[1.02] transition-transform">
                <div className='p-3 bg-surface-container-low rounded-xl w-fit text-tertiary-container'>
                   <Briefcase className="size-6" />
                </div>
                <h3 className='mt-6 font-manrope text-xl font-bold'>Tailor to Job</h3>
                <p className='mt-2 text-muted-foreground text-sm font-inter'>Input a job description and we will rewrite your achievements.</p>
              </Link>

              <Link to="/editor" className="flex flex-col p-8 bg-surface-container-lowest rounded-2xl shadow-ambient hover:scale-[1.02] transition-transform">
                <div className='p-3 bg-surface-container-low rounded-xl w-fit text-primary'>
                   <FileEdit className="size-6" />
                </div>
                <h3 className='mt-6 font-manrope text-xl font-bold'>Start from Scratch</h3>
                <p className='mt-2 text-muted-foreground text-sm font-inter'>Draft a universal resume using our guided Synthetix editor.</p>
              </Link>
            </div>
          </div>

          {/* Right Column Ambient Info (30%) */}
          <div className='w-full lg:w-[30%] space-y-6'>
             <div className="bg-surface-container-low rounded-2xl p-6">
                <h3 className="font-manrope font-bold mb-4">Recent Documents</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-3 bg-surface-container-lowest rounded-xl shadow-sm">
                     <FileText className="size-5 text-muted-foreground" />
                     <div>
                       <p className="text-sm font-semibold truncate w-40">VP Engineering Base</p>
                       <p className="text-xs text-muted-foreground">Updated 2h ago</p>
                     </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-surface-container-lowest rounded-xl shadow-sm">
                     <FileText className="size-5 text-muted-foreground" />
                     <div>
                       <p className="text-sm font-semibold truncate w-40">Director Tech (Tailored)</p>
                       <p className="text-xs text-muted-foreground">Updated 1d ago</p>
                     </div>
                  </div>
                </div>
             </div>

             <div className="bg-[linear-gradient(to_bottom,var(--color-surface-container-low),var(--color-surface))] rounded-2xl p-6 border-outline-variant/20 border-t">
                <h3 className="font-manrope font-bold mb-2">Resume Strength</h3>
                <div className="flex items-end gap-3 mb-2">
                  <span className="text-4xl font-extrabold text-primary">84</span>
                  <span className="text-sm text-muted-foreground mb-1">/ 100</span>
                </div>
                <div className="h-2 w-full bg-surface-container-highest rounded-full overflow-hidden">
                  <div className="h-full bg-[linear-gradient(to_right,var(--color-tertiary),var(--color-primary))] w-[84%] rounded-full relative" />
                </div>
                <Button variant="ai-action" className="w-full mt-6 flex justify-center py-4 bg-[linear-gradient(to_right,var(--color-tertiary-container),var(--color-primary-container))] text-white rounded-xl font-bold gap-2">
                  <SparklesIcon className="size-4" /> Improve Score
                </Button>
             </div>
          </div>
        </div>
      </Main>

      <GlassChatWidget isOpen={chatOpen} onClose={() => setChatOpen(false)} />
      
      {/* Floating trigger if closed */}
      {!chatOpen && (
        <Button 
           variant="ai-action" 
           size="icon" 
           onClick={() => setChatOpen(true)}
           className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-ambient bg-[linear-gradient(to_right,var(--color-tertiary-container),var(--color-primary-container))] text-white"
        >
          <SparklesIcon className="size-6" />
        </Button>
      )}
    </>
  )
}

function SparklesIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z" />
    </svg>
  )
}
