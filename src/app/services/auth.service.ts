import { Injectable } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth";
import { Subscription } from 'rxjs';
import { map } from "rxjs/operators";
//NgRx
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import * as authActions from '../auth/auth.action'

import { Usuario } from "../models/usuario.model";
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userSubscription: Subscription

  constructor(public auth: AngularFireAuth,
    public firestore: AngularFirestore,
    private store: Store<AppState>) { }

  initAuthListener() {
    return this.auth.authState.subscribe((fuser: firebase.User) => {
      // console.log(fuser)
      // console.log(fuser?.uid);
      // console.log(fuser?.email);
      if (fuser) {
        this.userSubscription = this.firestore.doc(`${fuser.uid}/usuario`).valueChanges()
          .subscribe((firestoreUser: Usuario) => {
            const user = Usuario.fromFirebase(firestoreUser)
            this.store.dispatch(authActions.setUser({ user }))
          })
      } else {
        this.userSubscription.unsubscribe()
        this.store.dispatch(authActions.unSetUser())
      }
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
