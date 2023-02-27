import { ActionReducerMap } from '@ngrx/store';
import * as auth from './auth/auth.reducer';
import * as ui from './shared/ui.reducer';


  
export interface AppState {
    ui: ui.State,
    user: auth.authState
}

export const appReducersMap: ActionReducerMap<AppState> = {
    ui: ui.uiReducer,
    user: auth.authReducer,

}