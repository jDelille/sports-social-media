import { create } from "zustand";

type InviteModalStore = {
  isOpen: boolean;
  onOpen: (groupName: string, groupId: number) => void;
  onClose: () => void;
  groupName: string | null;
  groupId: number | null;
};

const useInviteModal = create<InviteModalStore>((set) => ({
  isOpen: false,
  onOpen: (groupName: string, groupId: number) =>
    set({ isOpen: true, groupName: groupName, groupId: groupId }),
  onClose: () => set({ isOpen: false }),
  groupId: null,
  groupName: null,
}));

export default useInviteModal;
