import { createStore } from "redux";
import VacationsModel from "../Models/VacationsModel";


export class VacationsState {
    public vacations: VacationsModel[] = [];
}

export enum VacationsActionType {
    GetVacations,
    AddVacation,
    UpdateVacation,
    DeleteVacation
}

export interface VacationsAction {
    type: VacationsActionType;
    payload: any;

}

export function vacationsReducer(currentState = new VacationsState(), action: VacationsAction): VacationsState {

    const newState = { ...currentState };

    switch (action.type) {
        case VacationsActionType.GetVacations:
            newState.vacations = action.payload;
            break;
        case VacationsActionType.AddVacation:
            newState.vacations.push(action.payload)
            break;
        case VacationsActionType.UpdateVacation:
            const indexToUpdate = newState.vacations.findIndex(v => v.vacationsId === action.payload.vacationsId);
            if (indexToUpdate >= 0) {
                newState.vacations[indexToUpdate] = action.payload;
            }
            break;
        case VacationsActionType.DeleteVacation:
            const indexToDelete = newState.vacations.findIndex(v => v.vacationsId === action.payload);
            if (indexToDelete >= 0) {
                console.log(indexToDelete)
                console.log()
                newState.vacations.splice(indexToDelete, 1);
            }
            break;
    }
    return newState;
}


// 5. Products Store - The manager object handling redux:
export const vacationsStore = createStore(vacationsReducer);
