import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from "sweetalert2";

import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup

  constructor(private fb: FormBuilder,
    private authService: AuthService,
    private router: Router) { }

  ngOnInit(): void {
    this.formBuilder()
  }

  private formBuilder() {
    this.loginForm = this.fb.group({
      correo: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    })
  }

  loginUsuario() {
    Swal.showLoading()
    const { correo, password } = this.loginForm.value
    this.authService.loginUsuario(correo, password)
      .then(credenciales => {
        console.log(credenciales);
        Swal.hideLoading()
        this.router.navigate(['/'])
      })
      .catch(err => {
        console.log(err.code)
        Swal.hideLoading()
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
