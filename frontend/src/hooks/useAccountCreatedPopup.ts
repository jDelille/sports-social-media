import { create } from 'zustand';

type DeletePopupStore = {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;

};

const useDeletePopup = create<DeletePopupStore>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false}),

}));



export default useDeletePopup;