import * as React from 'react'
import { useNavigate } from '@tanstack/react-router'
import { useOnboardingStore } from '@/stores/use-onboarding'
import { Button } from '@/components/ui/button'
import { ArrowRight, Briefcase, GraduationCap } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Main } from '@/components/layout/main'

export function Onboarding() {
  const navigate = useNavigate()
  const { 
    experienceLevel, 
    setExperienceLevel, 
    yearsOfExperience, 
    setYearsOfExperience 
  } = useOnboardingStore()

  const handleContinue = () => {
    navigate({ to: '/templates' })
  }

  const isContinueDisabled = !experienceLevel || (experienceLevel === 'experienced' && (!yearsOfExperience || yearsOfExperience <= 0))

  return (
    <Main className='flex items-center justify-center min-h-[80vh] bg-surface'>
      <div className='w-full max-w-xl mx-auto'>
        <div className='bg-surface-container-lowest border border-outline-variant/20 shadow-ambient rounded-3xl p-10 relative overflow-hidden'>
          
          <div className='absolute top-0 inset-x-0 h-1 bg-[linear-gradient(to_right,var(--color-primary),var(--color-brand-green))]' />

          <div className='text-center mb-10'>
            <h1 className='text-3xl font-manrope font-extrabold mb-3'>Let's tailor your experience.</h1>
            <p className='text-muted-foreground font-inter'>
              Choose your professional stage so we can architect the perfect template logic for your resume.
            </p>
          </div>

          <div className='space-y-6'>
            <div className='grid grid-cols-2 gap-4'>
              <button
                type='button'
                onClick={() => {
                  setExperienceLevel('fresher')
                  setYearsOfExperience(0)
                }}
                className={`flex flex-col items-center justify-center p-6 rounded-2xl border-2 transition-all duration-200 ${
                  experienceLevel === 'fresher' 
                    ? 'border-brand-green bg-brand-green/5 text-foreground' 
                    : 'border-outline-variant/20 bg-surface-container-low text-muted-foreground hover:bg-surface-container-highest'
                }`}
              >
                <div className={`p-3 rounded-full mb-4 ${experienceLevel === 'fresher' ? 'bg-brand-green/20 text-brand-green' : 'bg-surface-container-highest text-muted-foreground'}`}>
                  <GraduationCap className='size-8' />
                </div>
                <span className='font-manrope font-bold text-lg'>Fresher</span>
                <span className='text-xs mt-1 text-center px-2'>0-1 years of experience</span>
              </button>

              <button
                type='button'
                onClick={() => setExperienceLevel('experienced')}
                className={`flex flex-col items-center justify-center p-6 rounded-2xl border-2 transition-all duration-200 ${
                  experienceLevel === 'experienced' 
                    ? 'border-primary bg-primary/5 text-foreground' 
                    : 'border-outline-variant/20 bg-surface-container-low text-muted-foreground hover:bg-surface-container-highest'
                }`}
              >
                <div className={`p-3 rounded-full mb-4 ${experienceLevel === 'experienced' ? 'bg-primary/20 text-primary' : 'bg-surface-container-highest text-muted-foreground'}`}>
                  <Briefcase className='size-8' />
                </div>
                <span className='font-manrope font-bold text-lg'>Experienced</span>
                <span className='text-xs mt-1 text-center px-2'>1+ years of experience</span>
              </button>
            </div>

            {/* Experience Input Animation */}
            <div className={`transition-all duration-500 overflow-hidden ${experienceLevel === 'experienced' ? 'opacity-100 max-h-40 mt-6' : 'opacity-0 max-h-0'}`}>
              <div className='p-6 bg-surface-container-low rounded-2xl border border-outline-variant/20'>
                <Label htmlFor='years' className='font-manrope font-semibold text-sm mb-2 block'>
                  Total Years of Experience
                </Label>
                <div className='relative'>
                  <Input 
                    id='years'
                    type='number' 
                    min='1' 
                    max='50'
                    value={yearsOfExperience || ''}
                    onChange={(e) => setYearsOfExperience(parseInt(e.target.value) || 0)}
                    placeholder='e.g., 5'
                    className='h-12 text-lg px-4 bg-surface-container-lowest border-outline-variant/30 focus-visible:ring-primary'
                  />
                  <span className='absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground text-sm font-medium'>
                    Years
                  </span>
                </div>
              </div>
            </div>

            <Button 
              onClick={handleContinue}
              disabled={isContinueDisabled}
              className={`w-full h-14 rounded-xl text-lg font-bold flex items-center justify-center gap-2 mt-8 transition-all ${
                isContinueDisabled 
                  ? 'bg-surface-container-highest text-muted-foreground' 
                  : 'bg-foreground text-background hover:bg-foreground/90 shadow-ambient'
              }`}
            >
              Continue to Templates <ArrowRight className='size-5' />
            </Button>
          </div>
        </div>
      </div>
    </Main>
  )
}
