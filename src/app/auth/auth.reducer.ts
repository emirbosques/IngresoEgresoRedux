import { Usuario, UserInterface } from './../models/usuario.model';
import { Action, createReducer, on } from '@ngrx/store';
import { setUser, unSetUser } from './auth.actions';


export interface authState {
    user: Usuario | null;
}

export const initialState: authState = {
    user: null,
}

const _authReducer = createReducer(initialState,

    on(setUser, (state, { user }) => ({ ...state, user: { ...user } })),
    on(unSetUser, (state) => ({ ...state, user:null })),

);

export function authReducer(state: authState | undefined, action: Action) {
    return _authReducer(state, action);
}