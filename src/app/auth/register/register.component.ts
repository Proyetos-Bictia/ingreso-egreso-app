import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
//NgRx
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import * as ui from 'src/app/shared/ui.actions';

import { AuthService } from "../../services/auth.service";
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [
  ]
})
export class RegisterComponent implements OnInit, OnDestroy {

  registroForm: FormGroup;
  cargando: boolean = false;
  uiSubscription: Subscription;

  constructor(private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private store: Store<AppState>) { }

  ngOnInit(): void {
    this.formBuilder();
    this.uiSubscription = this.store.select('ui').subscribe(({ isLoading }) => this.cargando = isLoading)
  }

  ngOnDestroy(): void {
    this.uiSubscription.unsubscribe()
  }

  private formBuilder() {
    this.registroForm = this.fb.group({
      nombre: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    })
  }

  crearUsuario() {
    this.store.dispatch(ui.isLoading());
    const { nombre, correo, password } = this.registroForm.value
    this.authService.crearUsuario(nombre, correo, password)
      .then(() => {
        this.store.dispatch(ui.stopLoading());
        this.router.navigate(['/'])
      })
      .catch(err => {
        console.log(err)
        this.store.dispatch(ui.stopLoading());
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: err.message,
        })
      })
  }

  get nombrePlace() { return this.registroForm.get('nombre') }
  get correoPlace() { return this.registroForm.get('correo') }
  get passwordPlace() { return this.registroForm.get('password') }


}
