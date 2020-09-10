import { Component, OnInit, OnDestroy } from '@angular/core';

import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';

import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import * as ingreso from '../ingeso-egreso/ingres-egreso.action'

import { IngresoEgresoService } from '../services/ingreso-egreso.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: [
  ]
})
export class DashboardComponent implements OnInit, OnDestroy {

  userSubscription: Subscription;
  ingresoSubscription: Subscription;

  constructor(private store: Store<AppState>,
    private ingresoEgresoService: IngresoEgresoService) { }

  ngOnInit(): void {
    this.userSubscription = this.store.select('user')
      .pipe(
        filter(auth => auth.user !== null)
      )
      .subscribe(({ user: { uid } }) => {
        this.ingresoSubscription = this.ingresoEgresoService.initIngresosEgresosListener(uid)
          .subscribe(algo => this.store.dispatch(ingreso.setItems({ items: algo })))
      })
  }

  ngOnDestroy(): void {
    this.userSubscription?.unsubscribe()
    this.ingresoSubscription?.unsubscribe()
  }

}
