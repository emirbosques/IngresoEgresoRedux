import { AuthService } from './auth.service';
import { environment } from './../../environments/environment';
import { IngresoEgresoInterface } from './../models/ingreso-egreso.model';
import { Injectable } from '@angular/core';
import { initializeApp } from '@angular/fire/app';
import { collection, doc, getFirestore, setDoc } from '@angular/fire/firestore';
import 'firebase/firestore';
import {AngularFirestore} from '@angular/fire/compat/firestore';


@Injectable({
  providedIn: 'root'
})
export class IngresoEgresoService {

  // Initialize Firebase
  private app = initializeApp(environment.firebase);
  private db = getFirestore(this.app);

  constructor(
    private firestore: AngularFirestore,
    private authService: AuthService) { }


  crearIngresoEgreso(ingresoEgreso: IngresoEgresoInterface) {
    const { uid } = this.authService.usuarioData;
    return this.firestore
    .collection(`${uid}/ingresos-egreso/Items`)
    .add({ ...ingresoEgreso });
    
    // const ingresoRef = collection(this.db, "ingreso-egreso");
    // return setDoc(doc(ingresoRef, uid), { ...ingresoEgreso })
    //   .then((ref)=>console.log(ref))
    //   .catch((err)=>console.log(err))
  }


}
