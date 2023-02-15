import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public fireAuth: AngularFireAuth) { }


  crearUsuario(nombre: string, mail: string, password: string) {
    return this.fireAuth.createUserWithEmailAndPassword(mail, password);
  }
}
