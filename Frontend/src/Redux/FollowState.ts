import { createStore } from "redux";
import FollowersModel from "../Models/FollowersModel";


export class FollowersState {
    public followers: FollowersModel[] = [];
}

export enum FollowersActionType {
    GetAllFollowers,
    FollowVacation,
    UnfollowVacation,
}

export interface FollowersAction {
    type: FollowersActionType;
    payload: any;

}

export function followersReducer(currentState = new FollowersState(), action: FollowersAction): FollowersState {

    const newState = { ...currentState };

    switch (action.type) {
        case FollowersActionType.GetAllFollowers:
            newState.followers = action.payload;
            break;
        case FollowersActionType.FollowVacation:
            console.log(action.payload)
            newState.followers.push(action.payload)
            break;
        case FollowersActionType.UnfollowVacation:
            console.log(action.payload)
            const indexToDelete = newState.followers.findIndex(f => f.vacationsId === action.payload);
            if (indexToDelete >= 0) {
                newState.followers.splice(indexToDelete, 1);
            }
            break;
    }
    return newState;
}


// 5. Products Store - The manager object handling redux:
export const followersStore = createStore(followersReducer);
