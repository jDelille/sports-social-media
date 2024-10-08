import { create } from 'zustand';

type AccountCreatedPopupStore = {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;

};

const useAccountCreatedPopup = create<AccountCreatedPopupStore>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false}),

}));



export default useAccountCreatedPopup;