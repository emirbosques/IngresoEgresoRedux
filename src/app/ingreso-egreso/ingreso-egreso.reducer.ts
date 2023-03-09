import { setItems, unSetItems } from './ingreso-egreso.actions';
import { IngresoEgresoInterface } from './../models/ingreso-egreso.model';
import { Action, createReducer, on } from '@ngrx/store';


export interface State {
    items: IngresoEgresoInterface[];
}

export const initialState: State = {
    items: [],
}

const _ingresoEgresoReducer = createReducer(initialState,

    on(setItems, (state, { items }) => ({ ...state, items: [...items] })),
    on(unSetItems, (state) => ({ ...state })),

);

export function ingresoEgresoReducer(state: State | undefined, action: Action) {
    return _ingresoEgresoReducer(state, action);
}