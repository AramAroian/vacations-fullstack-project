import jwtDecode from "jwt-decode";
import UsersModel from "../Models/UsersModel";
import { createStore } from "redux";

export class AuthState {
    public token: string = null;
    public user: UsersModel = null;

    public constructor () {
        this.token = localStorage.getItem("token");
        if(this.token) {
            this.user = jwtDecode<{user:UsersModel}>(this.token).user;
        }
    }

}

export enum AuthActionType {
    Register,
    Login,
    Logout
}

export interface AuthAction {
    type: AuthActionType;
    payload?: string;
}

export function authReducer(currentState = new AuthState(), action: AuthAction): AuthState {
    const newState = { ...currentState };
    switch (action.type) {
        case AuthActionType.Register: // payload: token
        case AuthActionType.Login: // payload: token
            newState.token = action.payload;
            newState.user = jwtDecode<{ user: UsersModel }>(action.payload).user;
            localStorage.setItem("token", newState.token);
            break;
        case AuthActionType.Logout: // payload: none
            newState.token = null;
            newState.user = null;
            localStorage.removeItem("token");
            break;
    }
    return newState;
}

export const authStore = createStore(authReducer);