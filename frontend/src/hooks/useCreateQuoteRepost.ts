import { create } from 'zustand';

type CreateQuoteRepostModalStore = {
    isOpen: boolean;
    postId: number | null;
    type: string | null;
    onOpen: (postId: number, type: string) => void;
    onClose: () => void;
};

const useCreateQuoteRepostModal = create<CreateQuoteRepostModalStore>((set) => ({
    isOpen: false,
    onOpen: (postId, type) => set({ isOpen: true, postId: postId, type: type }),
    postId: null,
    type: null,

    onClose: () => set({ isOpen: false }),
}));



export default useCreateQuoteRepostModal;