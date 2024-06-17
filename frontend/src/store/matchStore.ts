import { makeAutoObservable } from "mobx";
import BovadaMatchTypes from "../types/BovadaMatch";

class MatchStore {
    match: BovadaMatchTypes | null = null;

    constructor() {
        makeAutoObservable(this)
    }

    setMatch(selectedMatch: BovadaMatchTypes) {
        this.match = selectedMatch;
    }

    clearMatch() {
        this.match = null;
    }
}

const matchStore = new MatchStore();
export default matchStore;