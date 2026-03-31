import { resumeApi } from '@/api/modules/resume';
import { useResumeEditorStore } from '@/stores/use-resume-editor-store';
import { useCallback, useEffect, useRef } from 'react';

const AUTOSAVE_DELAY = 1500

/**
 * Hook that watches for dirty state and triggers debounced autosave.
 * Returns save status indicators.
 */
export function useAutosave() {
  const resume = useResumeEditorStore((s) => s.resume)
  const isDirty = useResumeEditorStore((s) => s.isDirty)
  const isSaving = useResumeEditorStore((s) => s.isSaving)
  const lastSavedAt = useResumeEditorStore((s) => s.lastSavedAt)
  const markSaving = useResumeEditorStore((s) => s.markSaving)
  const markSaved = useResumeEditorStore((s) => s.markSaved)

  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const abortRef = useRef<AbortController | null>(null)

  const save = useCallback(async () => {
    if (!resume._id) return

    // Cancel any in-flight request
    abortRef.current?.abort()
    abortRef.current = new AbortController()

    markSaving()
    try {
      await resumeApi.update(resume._id, resume)
      markSaved()
    } catch {
      // On error, the dirty flag remains true so next trigger retries
    }
  }, [resume, markSaving, markSaved])

  useEffect(() => {
    if (!isDirty) return

    if (timerRef.current) clearTimeout(timerRef.current)
    timerRef.current = setTimeout(save, AUTOSAVE_DELAY)

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [isDirty, resume, save])

  return { isDirty, isSaving, lastSavedAt }
}
