import { createReducer, on } from '@ngrx/store';
import { setItems, unSetItems } from "./ingres-egreso.action";

import { IngresoEgreso } from '../models/ingreso-egreso.model';
import { AppState } from '../app.reducer';

export interface State {
    items: IngresoEgreso[]
}

export interface AppStateWithIngreso extends AppState {
    ingresosEgresos: State
}

export const initialState = {
    items: []
}

const _ingresoEgresoReducer = createReducer(
    initialState,
    on(setItems, (state, { items }) => ({ ...state, items: [...items] })),
    on(unSetItems, (state) => ({ ...state, items: [] })),

);

export function ingresoEgresoReducer(state, action) {
    return _ingresoEgresoReducer(state, action);
}