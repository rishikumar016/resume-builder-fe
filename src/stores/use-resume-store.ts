import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import type { ResumeData } from "../types/resume.types";

interface ResumeStore {
  resumeData: ResumeData | null;
  
  // Set the entire loaded resume
  setResumeData: (data: ResumeData) => void;

  // Granular updates
  updateBasics: <K extends keyof ResumeData["basics"]>(field: K, value: ResumeData["basics"][K]) => void;
  
  updateWorkExperience: <K extends keyof ResumeData["work"][0]>(
    index: number,
    field: K,
    value: ResumeData["work"][0][K]
  ) => void;

  // Metadata / Theme updates
  updateMetaTheme: (theme: string) => void;
  toggleSectionVisibility: (sectionName: string) => void;
}

export const useResumeStore = create<ResumeStore>()(
  immer((set) => ({
    resumeData: null,

    setResumeData: (data) =>
      set((state) => {
        state.resumeData = data;
      }),

    updateBasics: (field, value) =>
      set((state) => {
        if (state.resumeData) {
          state.resumeData.basics[field] = value as any;
        }
      }),

    updateWorkExperience: (index, field, value) =>
      set((state) => {
        if (state.resumeData && state.resumeData.work[index]) {
          state.resumeData.work[index][field] = value as any;
        }
      }),

    updateMetaTheme: (theme) =>
      set((state) => {
        if (state.resumeData) {
          state.resumeData.meta.theme = theme;
        }
      }),

    toggleSectionVisibility: (sectionName) =>
      set((state) => {
        if (state.resumeData) {
          const hidden = state.resumeData.meta.layout.hiddenSections;
          if (hidden.includes(sectionName)) {
            state.resumeData.meta.layout.hiddenSections = hidden.filter(
              (s) => s !== sectionName
            );
          } else {
            state.resumeData.meta.layout.hiddenSections.push(sectionName);
          }
        }
      }),
  }))
);
