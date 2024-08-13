import { create } from 'zustand';

type DeletePopupStore = {
    isOpen: boolean;
    onOpen: (postId: number, type: string, imagePath: string) => void;
    onClose: () => void;
    postId: number | null;
    type: string | null;
    imagePath: string | null;
};

const useDeletePopup = create<DeletePopupStore>((set) => ({
    isOpen: false,
    onOpen: (postId: number, type: string, imagePath: string) => set({ isOpen: true, postId: postId, type: type, imagePath: imagePath  }),
    onClose: () => set({ isOpen: false}),
    postId: null,
    type: null,
    imagePath: null
}));



export default useDeletePopup;