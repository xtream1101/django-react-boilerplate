import { fetchMe } from "@/api/users";
import { IUser } from "@/types/users";
import { flow, makeAutoObservable } from "mobx"
import { createContext } from "react";

class UsersStore {

    me: IUser|null = null

    constructor() {
        makeAutoObservable(this)
    }

    clearData() {
        this.me = null
    }

    setMe = (data: IUser) => {
        this.me = data
    }

    fetchMe = flow(function* (this: UsersStore) {
        const res = yield fetchMe()
        this.setMe(res.data)
    })

}

export const usersStore = new UsersStore();
export const UsersStoreContext = createContext(usersStore);
