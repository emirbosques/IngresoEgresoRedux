import Swal from 'sweetalert2';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public fireAuth: AngularFireAuth) { }


  crearUsuario(nombre: string, mail: string, password: string) {
    return this.fireAuth.createUserWithEmailAndPassword(mail, password);
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


}
