import { create } from 'zustand';

type LeaderboardInfoPopupStore = {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;

};

const useLeaderboardInfoPopup = create<LeaderboardInfoPopupStore>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false}),

}));



export default useLeaderboardInfoPopup;