import { create } from 'zustand';

type CreateCommentModalStore = {
    isOpen: boolean;
    postId: number | null;
    type: string | null;
    onOpen: (postId: number, type: string) => void;
    onClose: () => void;
};

const useCreateCommentModal = create<CreateCommentModalStore>((set) => ({
    isOpen: false,
    onOpen: (postId, type) => set({ isOpen: true, postId: postId, type: type}),
    postId: null,
    type: null,
    onClose: () => set({ isOpen: false }),
}));



export default useCreateCommentModal;