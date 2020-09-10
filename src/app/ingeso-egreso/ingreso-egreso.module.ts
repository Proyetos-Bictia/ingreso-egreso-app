import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';

import { StoreModule } from '@ngrx/store';
import { SharedModule } from '../shared/shared.module';
import { DashboardRoutesModule } from "../dashboard/dashboard-routes.module";

import { IngesoEgresoComponent } from "./ingeso-egreso.component";
import { DetalleComponent } from "./detalle/detalle.component";
import { EstadisticaComponent } from "./estadistica/estadistica.component";
import { DashboardComponent } from "../dashboard/dashboard.component";
import { OrdenIngresoPipe } from "../pipes/orden-ingreso.pipe";

// import * as ingreso from './ingeso-egreso/ingreso-egreso.reducer';
import { ingresoEgresoReducer } from "./ingreso-egreso.reducer";


@NgModule({
  declarations: [
    DashboardComponent,
    IngesoEgresoComponent,
    EstadisticaComponent,
    DetalleComponent,
    OrdenIngresoPipe,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ChartsModule,
    SharedModule,
    DashboardRoutesModule,
    StoreModule.forFeature('ingresosEgresos', ingresoEgresoReducer)
  ]
})
export class IngresoEgresoModule { }
