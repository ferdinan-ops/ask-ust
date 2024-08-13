import { create } from 'zustand'

interface RecordStore {
  recordBlob: Blob | null
  setRecordBlob: (recordBlob: Blob) => void
  isRecord: boolean
  setIsRecord: (isRecord: boolean) => void
}

export const useRecord = create<RecordStore>((set) => ({
  recordBlob: null,
  setRecordBlob: (recordBlob) => set({ recordBlob }),
  isRecord: false,
  setIsRecord: (isRecord) => set({ isRecord })
}))
