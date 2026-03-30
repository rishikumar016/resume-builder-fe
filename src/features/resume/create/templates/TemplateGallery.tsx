import * as React from 'react'
import { useNavigate } from '@tanstack/react-router'
import { CheckCircle2, LayoutTemplate } from 'lucide-react'
import { useOnboardingStore } from '@/stores/use-onboarding'
import { Button } from '@/components/ui/button'
import { ConfigDrawer } from '@/components/config-drawer'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'

const TEMPLATES = [
  {
    id: 'executive',
    name: 'Executive Board',
    description: 'A classic, high-hierarchy layout favored by F500 recruiters.',
    color: 'bg-primary/20 text-primary border-primary/30',
  },
  {
    id: 'creative',
    name: 'Creative Studio',
    description: 'Bold typography and unique grid structure for design roles.',
    color: 'bg-brand-green/20 text-brand-green border-brand-green/30',
  },
  {
    id: 'startup',
    name: 'Startup Agile',
    description: 'Dense, metric-focused layout highlighting fast-paced impact.',
    color: 'bg-tertiary/20 text-tertiary border-tertiary/30',
  },
]

export function TemplateGallery() {
  const navigate = useNavigate()
  const { selectedTemplate, setSelectedTemplate } = useOnboardingStore()

  const handleSelectTemplate = (id: string) => {
    setSelectedTemplate(id)
  }

  const handleContinue = () => {
    navigate({ to: '/editor' })
  }

  return (
    <>
      <Header>
        <Search />
        <div className='ms-auto flex items-center space-x-4'>
          <ThemeSwitch />
          <ConfigDrawer />
          <ProfileDropdown />
        </div>
      </Header>

      <Main fixed>
        <div className='mx-auto max-w-6xl px-8'>
          <div className='mb-12'>
            <h1 className='text-display-sm mb-4 font-manrope text-4xl font-extrabold tracking-tight'>
              Select your architecture.
            </h1>
            <p className='max-w-2xl font-inter text-lg text-muted-foreground'>
              Choose a starting template. All logic and structures can be
              swapped later without losing your tailored content.
            </p>
          </div>

          <div className='grid gap-8 md:grid-cols-3'>
            {TEMPLATES.map((tpl) => {
              const isSelected = selectedTemplate === tpl.id

              return (
                <div
                  key={tpl.id}
                  onClick={() => handleSelectTemplate(tpl.id)}
                  className={`relative transform cursor-pointer rounded-3xl transition-all duration-300 ${
                    isSelected
                      ? 'scale-[1.02] border-transparent bg-surface-container-lowest shadow-[0_20px_40px_rgba(0,229,153,0.15)] ring-4 ring-brand-green'
                      : 'border-2 border-outline-variant/30 bg-surface-container-lowest hover:border-outline-variant/60 hover:bg-surface-container-low'
                  }`}
                >
                  {/* Active checkmark */}
                  {isSelected && (
                    <div className='absolute -top-3 -right-3 flex size-8 items-center justify-center rounded-full bg-brand-green text-background shadow-lg'>
                      <CheckCircle2 className='size-5' />
                    </div>
                  )}

                  {/* Thumbnail Mock */}
                  <div className='relative m-4 flex h-64 items-center justify-center overflow-hidden rounded-2xl border border-outline-variant/20 bg-surface-container-high'>
                    <LayoutTemplate
                      className={`size-16 opacity-30 ${tpl.color.split(' ')[1]}`}
                    />
                    <div
                      className={`absolute inset-x-0 bottom-0 h-1 ${tpl.color.split(' ')[0]}`}
                    />
                  </div>

                  <div className='p-6 pt-2'>
                    <div
                      className={`mb-3 inline-block rounded-full border px-3 py-1 text-xs font-bold ${tpl.color}`}
                    >
                      {tpl.name}
                    </div>
                    <p className='font-inter text-sm leading-relaxed text-muted-foreground'>
                      {tpl.description}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>

          <div className='mt-16 flex justify-end'>
            <Button
              onClick={handleContinue}
              disabled={!selectedTemplate}
              className={`h-14 rounded-xl px-10 text-lg font-bold transition-all ${
                !selectedTemplate
                  ? 'cursor-not-allowed bg-surface-container-highest text-muted-foreground'
                  : 'bg-brand-green text-brand-green-foreground shadow-[0_0_20px_rgba(0,229,153,0.3)] hover:bg-brand-green/90'
              }`}
            >
              Enter Editor Layout →
            </Button>
          </div>
        </div>
      </Main>
    </>
  )
}
