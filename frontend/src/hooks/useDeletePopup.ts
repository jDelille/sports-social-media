import { create } from 'zustand';

type DeletePopupStore = {
    isOpen: boolean;
    onOpen: (postId: number, type: string) => void;
    onClose: () => void;
    postId: number | null;
    type: string | null;
};

const useDeletePopup = create<DeletePopupStore>((set) => ({
    isOpen: false,
    onOpen: (postId: number, type: string) => set({ isOpen: true, postId: postId, type: type  }),
    onClose: () => set({ isOpen: false}),
    postId: null,
    type: null,
}));



export default useDeletePopup;