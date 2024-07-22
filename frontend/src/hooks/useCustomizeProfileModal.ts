import { create } from 'zustand';

type CustomizeProfileModalStore = {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;

};

const useCustomizeProfileModal = create<CustomizeProfileModalStore>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false}),
}));



export default useCustomizeProfileModal;