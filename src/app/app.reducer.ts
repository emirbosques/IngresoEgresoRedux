import { ActionReducerMap } from '@ngrx/store';
import * as auth from './auth/auth.reducer';
import * as ui from './shared/ui.reducer';
import * as ingresoEgreso from './ingreso-egreso/ingreso-egreso.reducer';


  
export interface AppState {
    ui: ui.State,
    user: auth.authState,
    ingresosEgresos: ingresoEgreso.State
}

export const appReducersMap: ActionReducerMap<AppState> = {
    ui: ui.uiReducer,
    user: auth.authReducer,
    ingresosEgresos: ingresoEgreso.ingresoEgresoReducer
}