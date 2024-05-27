import { create } from 'zustand';

type CreateQuoteRepostModalStore = {
    isOpen: boolean;
    postId: number | null;
    type: string | null;
    originalPostUserId: number | null;
    onOpen: (postId: number, type: string, originalPostUserId: number) => void;
    onClose: () => void;
};

const useCreateQuoteRepostModal = create<CreateQuoteRepostModalStore>((set) => ({
    isOpen: false,
    onOpen: (postId, type, originalPostUserId) => set({ isOpen: true, postId: postId, type: type, originalPostUserId: originalPostUserId}),
    postId: null,
    type: null,
    originalPostUserId: null,

    onClose: () => set({ isOpen: false }),
}));



export default useCreateQuoteRepostModal;