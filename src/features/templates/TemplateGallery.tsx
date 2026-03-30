import * as React from 'react'
import { useNavigate } from '@tanstack/react-router'
import { useOnboardingStore } from '@/stores/use-onboarding'
import { Main } from '@/components/layout/main'
import { Button } from '@/components/ui/button'
import { CheckCircle2, LayoutTemplate } from 'lucide-react'

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
  }
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
    <Main className='bg-surface min-h-[90vh] py-12'>
      <div className='max-w-6xl mx-auto px-8'>
        
        <div className='mb-12'>
          <h1 className='text-display-sm font-manrope font-extrabold tracking-tight text-4xl mb-4'>
            Select your architecture.
          </h1>
          <p className='text-lg font-inter text-muted-foreground max-w-2xl'>
            Choose a starting template. All logic and structures can be swapped later without losing your tailored content.
          </p>
        </div>

        <div className='grid md:grid-cols-3 gap-8'>
          {TEMPLATES.map((tpl) => {
            const isSelected = selectedTemplate === tpl.id;
            
            return (
              <div 
                key={tpl.id}
                onClick={() => handleSelectTemplate(tpl.id)}
                className={`relative rounded-3xl cursor-pointer transition-all duration-300 transform ${
                  isSelected 
                    ? 'ring-4 ring-brand-green scale-[1.02] shadow-[0_20px_40px_rgba(0,229,153,0.15)] bg-surface-container-lowest border-transparent' 
                    : 'border-2 border-outline-variant/30 hover:border-outline-variant/60 bg-surface-container-lowest hover:bg-surface-container-low'
                }`}
              >
                {/* Active checkmark */}
                {isSelected && (
                  <div className='absolute -top-3 -right-3 size-8 bg-brand-green text-background rounded-full flex items-center justify-center shadow-lg'>
                    <CheckCircle2 className='size-5' />
                  </div>
                )}
                
                {/* Thumbnail Mock */}
                <div className='h-64 m-4 rounded-2xl bg-surface-container-high border border-outline-variant/20 overflow-hidden flex items-center justify-center relative'>
                  <LayoutTemplate className={`size-16 opacity-30 ${tpl.color.split(' ')[1]}`} />
                  <div className={`absolute inset-x-0 bottom-0 h-1 ${tpl.color.split(' ')[0]}`} />
                </div>
                
                <div className='p-6 pt-2'>
                  <div className={`inline-block px-3 py-1 rounded-full text-xs font-bold mb-3 border ${tpl.color}`}>
                    {tpl.name}
                  </div>
                  <p className='text-sm text-muted-foreground font-inter leading-relaxed'>
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
            className={`h-14 px-10 text-lg font-bold rounded-xl transition-all ${
              !selectedTemplate 
                ? 'bg-surface-container-highest text-muted-foreground cursor-not-allowed'
                : 'bg-brand-green text-brand-green-foreground shadow-[0_0_20px_rgba(0,229,153,0.3)] hover:bg-brand-green/90'
            }`}
          >
            Enter Editor Layout →
          </Button>
        </div>
      </div>
    </Main>
  )
}
