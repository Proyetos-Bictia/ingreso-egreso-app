import { Injectable } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth";
import { core } from '@angular/compiler';
import { map } from "rxjs/operators";

import { Usuario } from "../models/usuario.model";
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public auth: AngularFireAuth,
    public firestore: AngularFirestore) { }

  initAuthListener() {
    return this.auth.authState.subscribe((fuser: firebase.User) => {
      console.log(fuser)
      console.log(fuser?.uid);
      console.log(fuser?.email);
    })
  }

  crearUsuario(nombre: string, correo: string, password: string) {
    return this.auth.createUserWithEmailAndPassword(correo, password)
      .then((fbUser) => {
        const newUser = new Usuario(fbUser.user.uid, nombre, correo)
        return this.firestore.doc(`${fbUser.user.uid}/usuario`).set({ ...newUser })
      })
  }

  loginUsuario(correo: string, password: string) {
    return this.auth.signInWithEmailAndPassword(correo, password)
  }

  logoutUsuario() {
    return this.auth.signOut()
  }

  isAuth() {
    return this.auth.authState.pipe(
      map(fbuser => fbuser != null)
    )
  }

}
