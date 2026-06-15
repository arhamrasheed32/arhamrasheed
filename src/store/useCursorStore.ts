import { create } from 'zustand'

export type CursorMode = 'default' | 'text' | 'button' | 'drag' | 'hidden'

interface CursorState {
  mode: CursorMode
  text: string
  setMode: (mode: CursorMode) => void
  setText: (text: string) => void
}

export const useCursorStore = create<CursorState>((set) => ({
  mode: 'default',
  text: '',
  setMode: (mode) => set({ mode }),
  setText: (text) => set({ text }),
}))
