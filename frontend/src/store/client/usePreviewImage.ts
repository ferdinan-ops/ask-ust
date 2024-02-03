import { create } from 'zustand'

interface PreviewImageStore {
  previewImage: string
  setPreviewImage: (image: string) => void
}

export const usePreviewImage = create<PreviewImageStore>((set) => ({
  previewImage: '',
  setPreviewImage: (previewImage) => {
    set({ previewImage })
  }
}))
