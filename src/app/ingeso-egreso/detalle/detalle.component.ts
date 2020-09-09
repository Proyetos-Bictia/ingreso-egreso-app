import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
//NgRx
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';

import { IngresoEgreso } from 'src/app/models/ingreso-egreso.model';
import { IngresoEgresoService } from 'src/app/services/ingreso-egreso.service';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styles: [
  ]
})
export class DetalleComponent implements OnInit {

  ingresosEgresos: IngresoEgreso[] = []

  constructor(private store: Store<AppState>,
    private ingresoEgresoService: IngresoEgresoService) { }

  ngOnInit(): void {
    this.store.select('ingresosEgresos')
      .subscribe(({ items }) => this.ingresosEgresos = items)
  }

  borrarItem(uid: string) {
    Swal.fire({
      title: 'Estas seguro?',
      text: "esta acción no se podra retroceder",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, borrar'
    }).then((result) => {
      if (result.value) {
        this.ingresoEgresoService.borrarIngresoEgreso(uid)
          .then(() => Swal.fire('Borrarlo', 'Eliminado exitosamente', 'success'))
          .catch((err) => Swal.fire('Error', err.message, 'error'))
      }
    })

  }

}
