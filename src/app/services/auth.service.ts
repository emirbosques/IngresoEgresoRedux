import { environment } from './../../environments/environment';
import { setUser, unSetUser } from './../auth/auth.actions';
import { AppState } from './../app.reducer';
import { Store } from '@ngrx/store';
import { Usuario } from './../models/usuario.model';
import Swal from 'sweetalert2';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { map } from 'rxjs/operators';

import { collection, getFirestore, setDoc } from '@angular/fire/firestore';
import { doc, onSnapshot } from "firebase/firestore";
import { initializeApp } from '@angular/fire/app';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // Initialize Firebase
  app = initializeApp(environment.firebase);
  db = getFirestore(this.app);

  private getUserDoc: any;
  private _usuario!: any;

  constructor(
    public fireAuth: AngularFireAuth,
    private store: Store<AppState>
  ) {

  }

  get usuarioData(): Usuario {
    return this._usuario;
  }

  initAuthListener() {
    this.fireAuth.authState
      .subscribe(async (fireUser) => {
        if (fireUser) {
          console.log({ fireUser });
          this.getUserDoc = onSnapshot(doc(this.db, 'usuario', fireUser.uid), (docu) => {
            console.log("Current data: ", docu.data());
            this._usuario = { ...docu.data() };
            const userData: any = { ...docu.data() };
            this.store.dispatch(setUser({ user: userData }));
          });
        } else {
          this.store.dispatch(unSetUser());
          this.getUserDoc();
          this._usuario = null;
          console.log("Current data: ", fireUser);
        }
      })
  }


  crearUsuario(nombre: string, mail: string, password: string): Promise<any> {
    return this.fireAuth.createUserWithEmailAndPassword(mail, password)
      .then(async ({ user }) => {
        if (user && user.uid && user.email) {
          const newUser = new Usuario(user.uid, nombre, user.email);
          const userRef = collection(this.db, "usuario");
          await setDoc(doc(userRef, user.uid), { ...newUser });
        }
      }
      )
  }


  authenticateUser(email: string, password: string) {
    return this.fireAuth.signInWithEmailAndPassword(email, password);
  }

  showLoading() {
    Swal.fire({
      title: 'Espere por favor....',
      didOpen: () => {
        Swal.showLoading();
      }
    });
  }

  closeLoading() {
    Swal.close();
  }

  logoutSession() {
    return this.fireAuth.signOut();
  }

  isAuth() {
    return this.fireAuth.authState
      .pipe(
        map(fbUuser => fbUuser !== null),
      )
  }


}
