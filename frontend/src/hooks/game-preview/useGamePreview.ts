import { create } from "zustand";

type GamePreviewPopupStore = {
  isOpen: boolean;
  league: string | null;
  gameId: string | null;
  onOpen: (league: string, gameId: string) => void;
  onClose: () => void;
};


const useGamePreviewPopup = create<GamePreviewPopupStore>((set) => ({
  
  isOpen: false,
  league: null,
  gameId: null,
  onOpen: (league, gameId) => set({ isOpen: true, league, gameId }),
  onClose: () => set({ isOpen: false, league: null, gameId: null }),
}));

export default useGamePreviewPopup;