import {
    type ResumeData,
    type SectionKey,
    defaultResumeData,
} from '@/schema/resume.schema';
import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

// ── Undo/Redo History ──────────────────────────────────────────────────
const MAX_HISTORY = 100

interface HistoryState {
  past: ResumeData[]
  future: ResumeData[]
}

// ── Store Interface ────────────────────────────────────────────────────
interface ResumeEditorStore {
  // Core state
  resume: ResumeData
  isInitialized: boolean
  isDirty: boolean
  isSaving: boolean
  lastSavedAt: string | null

  // History
  history: HistoryState

  // Initialization
  initialize: (data: ResumeData) => void
  reset: () => void

  // Generic updater — the primary way to edit resume data
  updateResumeData: (updater: (draft: ResumeData) => void) => void

  // Section item CRUD
  addSectionItem: <K extends SectionKey>(
    section: K,
    item: ResumeData[K][number]
  ) => void
  updateSectionItem: <K extends SectionKey>(
    section: K,
    index: number,
    item: Partial<ResumeData[K][number]>
  ) => void
  deleteSectionItem: (section: SectionKey, index: number) => void
  reorderSectionItem: (
    section: SectionKey,
    fromIndex: number,
    toIndex: number
  ) => void
  toggleItemVisibility: (section: SectionKey, index: number) => void

  // Layout helpers
  toggleSectionVisibility: (sectionName: string) => void
  reorderSections: (newOrder: string[]) => void

  // Undo / Redo
  undo: () => void
  redo: () => void
  canUndo: () => boolean
  canRedo: () => boolean

  // Save status
  markSaving: () => void
  markSaved: () => void
}

// ── Store Implementation ───────────────────────────────────────────────
export const useResumeEditorStore = create<ResumeEditorStore>()(
  immer<ResumeEditorStore>((set, get) => ({
    resume: defaultResumeData,
    isInitialized: false,
    isDirty: false,
    isSaving: false,
    lastSavedAt: null,

    history: {
      past: [],
      future: [],
    },

    initialize: (data: ResumeData) =>
      set((state: ResumeEditorStore) => {
        state.resume = data
        state.isInitialized = true
        state.isDirty = false
        state.history = { past: [], future: [] }
      }),

    reset: () =>
      set((state: ResumeEditorStore) => {
        state.resume = defaultResumeData
        state.isInitialized = false
        state.isDirty = false
        state.history = { past: [], future: [] }
      }),

    updateResumeData: (updater: (draft: ResumeData) => void) =>
      set((state: ResumeEditorStore) => {
        // Push current state to history before update
        const snapshot = JSON.parse(JSON.stringify(state.resume)) as ResumeData
        state.history.past.push(snapshot)
        if (state.history.past.length > MAX_HISTORY) {
          state.history.past.shift()
        }
        state.history.future = []

        updater(state.resume)
        state.isDirty = true
      }),

    addSectionItem: <K extends SectionKey>(section: K, item: ResumeData[K][number]) =>
      get().updateResumeData((draft: ResumeData) => {
        ;(draft[section] as unknown[]).push(item)
      }),

    updateSectionItem: <K extends SectionKey>(section: K, index: number, item: Partial<ResumeData[K][number]>) =>
      get().updateResumeData((draft: ResumeData) => {
        const arr = draft[section] as Record<string, unknown>[]
        if (arr[index]) {
          Object.assign(arr[index], item)
        }
      }),

    deleteSectionItem: (section: SectionKey, index: number) =>
      get().updateResumeData((draft: ResumeData) => {
        ;(draft[section] as unknown[]).splice(index, 1)
      }),

    reorderSectionItem: (section: SectionKey, fromIndex: number, toIndex: number) =>
      get().updateResumeData((draft: ResumeData) => {
        const arr = draft[section] as unknown[]
        const [item] = arr.splice(fromIndex, 1)
        arr.splice(toIndex, 0, item)
      }),

    toggleItemVisibility: (section: SectionKey, index: number) =>
      get().updateResumeData((draft: ResumeData) => {
        const item = (draft[section] as Array<{ visible: boolean }>)[index]
        if (item) {
          item.visible = !item.visible
        }
      }),

    toggleSectionVisibility: (sectionName: string) =>
      get().updateResumeData((draft: ResumeData) => {
        const hidden = draft.meta.layout.hiddenSections
        const idx = hidden.indexOf(sectionName)
        if (idx >= 0) {
          hidden.splice(idx, 1)
        } else {
          hidden.push(sectionName)
        }
      }),

    reorderSections: (newOrder: string[]) =>
      get().updateResumeData((draft: ResumeData) => {
        draft.meta.layout.order = newOrder
      }),

    undo: () =>
      set((state: ResumeEditorStore) => {
        if (state.history.past.length === 0) return
        const previous = state.history.past.pop()!
        const current = JSON.parse(JSON.stringify(state.resume)) as ResumeData
        state.history.future.push(current)
        state.resume = previous
        state.isDirty = true
      }),

    redo: () =>
      set((state: ResumeEditorStore) => {
        if (state.history.future.length === 0) return
        const next = state.history.future.pop()!
        const current = JSON.parse(JSON.stringify(state.resume)) as ResumeData
        state.history.past.push(current)
        state.resume = next
        state.isDirty = true
      }),

    canUndo: () => get().history.past.length > 0,
    canRedo: () => get().history.future.length > 0,

    markSaving: () =>
      set((state: ResumeEditorStore) => {
        state.isSaving = true
      }),

    markSaved: () =>
      set((state: ResumeEditorStore) => {
        state.isSaving = false
        state.isDirty = false
        state.lastSavedAt = new Date().toISOString()
      }),
  }))
)
