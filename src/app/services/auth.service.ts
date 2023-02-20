import { UserInterface, UserRegistration, Usuario } from './../models/usuario.model';
import Swal from 'sweetalert2';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { map } from 'rxjs/operators';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { addDoc, collection, Firestore } from '@angular/fire/firestore';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private afs: Firestore,
    public fireAuth: AngularFireAuth) {

  }


  initAuthListener() {
    this.fireAuth.authState
      .subscribe((fireUser) => {
        console.log(fireUser);
        console.log(fireUser?.email);
        console.log(fireUser?.uid);
      })
  }


  crearUsuario( nombre: string, mail: string, password:string ): Promise<any> {
    console.log(mail);
    console.log(password);
    
    return this.fireAuth.createUserWithEmailAndPassword(mail, password)
      .then(({ user }) => {
        if (user) {
          const uid = user?.uid ? user.uid : '';
          const email = user?.email ? user.email : '';
          const newUser = new Usuario(uid, nombre, email);
          const userRef = collection(this.afs, 'usuario');

          return addDoc(userRef, { ...newUser });
        } else {
          return;
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
