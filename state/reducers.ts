import { User } from "../types/User";
import { SET_CURRENT_USER } from "./actions";

export const currentUser = (state: User | null = null, action: any) => {
    switch (action.type) {
        case SET_CURRENT_USER:
            return action.user;
        default:
            return state;
    }
}