import { create } from 'zustand';

type InviteModalStore = {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
};

const useInviteModal = create<InviteModalStore>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
}));



export default useInviteModal;