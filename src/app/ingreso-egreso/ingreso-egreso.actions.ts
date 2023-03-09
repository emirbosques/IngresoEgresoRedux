import { IngresoEgresoInterface } from './../models/ingreso-egreso.model';
import { createAction, props } from '@ngrx/store';

export const unSetItems = createAction('[IngresoEgreso Component] Unset Items');
export const setItems = createAction(
    '[IngresoEgreso Component] Set Items ',
    props<{ items: IngresoEgresoInterface[] }>()
);