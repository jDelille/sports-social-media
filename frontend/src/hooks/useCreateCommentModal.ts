import { create } from 'zustand';
import PostTypes from '../types/Post';

type CreateCommentModalStore = {
    isOpen: boolean;
    postId: number | null;
    type: string | null;
    onOpen: (postId: number, type: string, post: PostTypes) => void;
    onClose: () => void;
    post: PostTypes | null
};

const useCreateCommentModal = create<CreateCommentModalStore>((set) => ({
    isOpen: false,
    onOpen: (postId, type, post) => set({ isOpen: true, postId: postId, type: type, post: post}),
    postId: null,
    type: null,
    onClose: () => set({ isOpen: false }),
    post: null
}));



export default useCreateCommentModal;