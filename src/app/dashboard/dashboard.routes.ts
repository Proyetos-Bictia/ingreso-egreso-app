import { Routes } from "@angular/router";

import { EstadisticaComponent } from "../ingeso-egreso/estadistica/estadistica.component";
import { DetalleComponent } from "../ingeso-egreso/detalle/detalle.component";
import { IngesoEgresoComponent } from "../ingeso-egreso/ingeso-egreso.component";

export const dashboardRoutes: Routes = [
    { path: '', component: EstadisticaComponent },
    { path: 'ingreso-egreso', component: IngesoEgresoComponent },
    { path: 'detalle', component: DetalleComponent },
]