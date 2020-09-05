import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import Swal from "sweetalert2";

import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import * as ui from 'src/app/shared/ui.actions';

import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit, OnDestroy {

  loginForm: FormGroup
  uiSubscription: Subscription
  cargando: boolean = false

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
    this.loginForm = this.fb.group({
      correo: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    })
  }

  loginUsuario() {

    this.store.dispatch(ui.isLoading())

    const { correo, password } = this.loginForm.value
    this.authService.loginUsuario(correo, password)
      .then(credenciales => {
        this.store.dispatch(ui.stopLoading())
        this.router.navigate(['/'])
      })
      .catch(err => {
        console.log(err)
        this.store.dispatch(ui.stopLoading())
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: err.message,
        })
      })
  }

  get correoPlace() { return this.loginForm.get('correo') }
  get passwordPlace() { return this.loginForm.get('password') }

}
