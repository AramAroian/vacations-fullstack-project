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
            newState.followers.push(action.payload)
            console.log("Follow");
            console.log(newState);
            break;
        case FollowersActionType.UnfollowVacation:
            const indexToDelete = newState.followers.findIndex(f => f.vacationsId === action.payload.vacationsId && f.usersId === action.payload.usersId);
            if (indexToDelete >= 0) {
                newState.followers.splice(indexToDelete, 1);
            }
            console.log("Unfollow");
            console.log(newState);
            break;
    }
    return newState;
}


// 5. Products Store - The manager object handling redux:
export const followersStore = createStore(followersReducer);
