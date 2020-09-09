import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';


import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import * as ui from '../shared/ui.actions'

import { IngresoEgreso } from "../models/ingreso-egreso.model";
import { IngresoEgresoService } from "../services/ingreso-egreso.service";
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-ingeso-egreso',
  templateUrl: './ingeso-egreso.component.html',
  styles: [
  ]
})
export class IngesoEgresoComponent implements OnInit, OnDestroy {

  ingresoForm: FormGroup
  tipo: string = 'ingreso'
  cargando: boolean = false
  uiSubscription: Subscription

  constructor(private fb: FormBuilder,
    private ingresoEgresoService: IngresoEgresoService,
    private store: Store<AppState>) { }

  ngOnInit(): void {
    this.formBuilder()
    this.uiSubscription = this.store.select('ui').subscribe(({ isLoading }) => this.cargando = isLoading)
  }

  ngOnDestroy(): void {
    this.uiSubscription.unsubscribe()
  }

  private formBuilder() {
    this.ingresoForm = this.fb.group({
      descripcion: ['', Validators.required],
      monto: ['', Validators.required],
    })
  }

  guardar() {
    this.store.dispatch(ui.isLoading())
    const { descripcion, monto } = this.ingresoForm.value
    const ingresoEgreso = new IngresoEgreso(descripcion, monto, this.tipo)
    this.ingresoEgresoService.crearIngresoEgreso({ descripcion, monto, tipo: this.tipo })
      .then((ref) => {
        console.log('entro en el then');

        this.ingresoForm.reset()
        this.store.dispatch(ui.stopLoading())
        Swal.fire('Registro creado', descripcion, 'success');
      })
      .catch(err => {
        console.log('entro en el catch');

        this.store.dispatch(ui.stopLoading())
        Swal.fire('Error', err.message, 'error')
      })
  }

}
