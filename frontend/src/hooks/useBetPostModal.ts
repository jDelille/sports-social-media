import { create } from 'zustand';


type BetPostModalStore = {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
};

const useBetPostModal = create<BetPostModalStore>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
    
}));


export default useBetPostModal;