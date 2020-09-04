import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { AuthService } from "../../services/auth.service";
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [
  ]
})
export class RegisterComponent implements OnInit {

  registroForm: FormGroup

  constructor(private fb: FormBuilder,
    private authService: AuthService,
    private router: Router) { }

  ngOnInit(): void {
    this.formBuilder()
  }

  private formBuilder() {
    this.registroForm = this.fb.group({
      nombre: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    })
  }

  crearUsuario() {
    Swal.showLoading()
    const { nombre, correo, password } = this.registroForm.value
    this.authService.crearUsuario(nombre, correo, password)
      .then(credenciales => {
        Swal.hideLoading()
        this.router.navigate(['/'])
      })
      .catch(err => {
        console.log(err)
        Swal.hideLoading()
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
