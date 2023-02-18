import Swal from 'sweetalert2';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public fireAuth: AngularFireAuth) { }


  initAuthListener(){
    this.fireAuth.authState
      .subscribe((fireUser)=>{
        console.log(fireUser); 
        console.log(fireUser?.email); 
        console.log(fireUser?.uid); 
      })
  }


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

  logoutSession(){
    return  this.fireAuth.signOut();
  }

  isAuth(){
    return this.fireAuth.authState
      .pipe(
        map( fbUuser=> fbUuser !== null),
      )
  }


}
