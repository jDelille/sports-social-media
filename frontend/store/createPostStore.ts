import { makeAutoObservable } from "mobx";

class CreatePostStore {
    isActive: boolean = false;
    body: string = "";

    constructor() {
        makeAutoObservable(this)
    }

    setIsActive() {
        this.isActive = true;
    }

    setIsInactive() {
        this.isActive = false;
    }
}

const createPostStore = new CreatePostStore();
export default createPostStore;