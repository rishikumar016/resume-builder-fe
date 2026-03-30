import { create } from 'zustand'

export type ExperienceLevel = 'fresher' | 'experienced' | null

interface OnboardingState {
  experienceLevel: ExperienceLevel
  yearsOfExperience: number
  selectedTemplate: string | null
  resumeSource: 'new' | 'upload' | null
  setExperienceLevel: (level: ExperienceLevel) => void
  setYearsOfExperience: (years: number) => void
  setSelectedTemplate: (templateId: string) => void
  setResumeSource: (source: 'new' | 'upload') => void
  reset: () => void
}

export const useOnboardingStore = create<OnboardingState>((set) => ({
  experienceLevel: null,
  yearsOfExperience: 0,
  selectedTemplate: null,
  resumeSource: null,
  setExperienceLevel: (level) => set({ experienceLevel: level }),
  setYearsOfExperience: (years) => set({ yearsOfExperience: years }),
  setSelectedTemplate: (templateId) => set({ selectedTemplate: templateId }),
  setResumeSource: (source) => set({ resumeSource: source }),
  reset: () => set({ experienceLevel: null, yearsOfExperience: 0, selectedTemplate: null, resumeSource: null }),
}))
