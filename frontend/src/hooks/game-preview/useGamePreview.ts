import { create } from "zustand";

type GamePreviewPopupStore = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

const useGamePreviewPopup = create<GamePreviewPopupStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useGamePreviewPopup;
