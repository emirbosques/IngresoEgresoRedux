import { isLoading, stopLoading } from './../shared/ui.actions';
import { AppState } from './../app.reducer';
import { IngresoEgresoInterface } from './../models/ingreso-egreso.model';
import { IngresoEgresoService } from './../services/ingreso-egreso.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, OnDestroy } from '@angular/core';

import Swal from 'sweetalert2';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-ingreso-egreso',
  templateUrl: './ingreso-egreso.component.html',
  styles: []
})
export class IngresoEgresoComponent implements OnInit, OnDestroy {

  ingresoEgresoForm!: FormGroup;
  typeButton: string = 'ingreso';
  loading: boolean = false;
  subscriptionStore!: Subscription;


  constructor(
    private ingresoEgresoService: IngresoEgresoService,
    private store: Store<AppState>,
    private formBuilder: FormBuilder) {

  }

  ngOnInit() {

    this.ingresoEgresoForm = this.formBuilder.group({
      descripcion: ['', Validators.required],
      monto: ['', [Validators.required, Validators.min(1)]],
      tipo: ['']
    });

    this.subscriptionStore.add(this.store.select('ui')
      .subscribe(({ isLoading }) => this.loading = isLoading));

    this.tipoControl?.setValue(this.typeButton);
  }

  ngOnDestroy(): void {
    this.subscriptionStore.unsubscribe();
  }


  addIngresoEgresoRecord() {
    this.store.dispatch(isLoading());
    const ingresoEgresoData: IngresoEgresoInterface = this.ingresoEgresoForm.value;
    this.ingresoEgresoService.crearIngresoEgreso(ingresoEgresoData)
    .then((ref) => {
      console.log('IG-component OK', ref);
      this.resetFormIngresoEgreso();
      this.store.dispatch(stopLoading());
      Swal.fire('Hey user!', 'Registro Correcto', 'info');
      }).catch((err) => {
        this.store.dispatch(stopLoading());
        Swal.fire('Hey user!', 'Registro Incorrecto', 'error');
        console.log('IG-component KO', err);
      });
  }


  resetFormIngresoEgreso() {
    this.ingresoEgresoForm.reset();
    this.typeButton = 'ingreso';
    this.tipoControl?.setValue(this.typeButton);
  }

  get tipoControl() {
    return this.ingresoEgresoForm.get('tipo');
  }

}
