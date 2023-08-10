import { create } from 'zustand'

interface IUseStoreModalStore {
  /**
   * To check open or not
   */
  isOpen: boolean
  /**
   * Open Function
   */
  onOpen: () => void
  /**
   * Close Function
   */
  onClose: () => void
}

/**
 * Hook For Store Create Modal
 */
export const useStoreModal = create<IUseStoreModalStore>(set => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}))
