import type { ResumeData } from '@/schema/resume.schema';
import { apiClient } from './auth';

// ── Resume API Module ──────────────────────────────────────────────────
export const resumeApi = {
  getById: (id: string) =>
    apiClient.get<ResumeData>(`/resumes/${id}`),

  getAll: () =>
    apiClient.get<ResumeData[]>('/resumes'),

  create: (data: Partial<ResumeData>) =>
    apiClient.post<ResumeData>('/resumes', data),

  update: (id: string, data: ResumeData) =>
    apiClient.put<ResumeData>(`/resumes/${id}`, data),

  delete: (id: string) =>
    apiClient.delete(`/resumes/${id}`),
}
