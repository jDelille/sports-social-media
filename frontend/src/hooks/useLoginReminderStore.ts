import { ReactElement } from 'react';
import { create } from 'zustand';

type NotLoginReminderStore = {
    isOpen: boolean;
    onOpen: (icon: ReactElement, text: string, subText: string) => void;
    onClose: () => void;
    icon: ReactElement | null;
    text: string | null;
    subText: string | null;
};

const useLoginReminderStore = create<NotLoginReminderStore>((set) => ({
    isOpen: false,
    onOpen: (icon: ReactElement, text: string, subText: string) => set({ isOpen: true, icon: icon, text: text, subText: subText }),
    onClose: () => set({ isOpen: false }),
    icon: null,
    text: null,
    subText: null
}));



export default useLoginReminderStore;