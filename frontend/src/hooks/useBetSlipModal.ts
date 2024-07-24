import { create } from 'zustand';

type Bet = {
    description: string;
    price: string;
    type: string;
}

type BetSlipModalStore = {
    isOpen: boolean;
    onOpen: (bet: Bet) => void;
    onClose: () => void;
    bet: Bet | null;
};

const useBetSlipModal = create<BetSlipModalStore>((set) => ({
    isOpen: false,
    onOpen: (bet: Bet) => set({ isOpen: true, bet: bet }),
    onClose: () => set({ isOpen: false }),
    bet: null,
}));



export default useBetSlipModal;