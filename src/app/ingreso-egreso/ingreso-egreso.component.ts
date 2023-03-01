import { IngresoEgresoInterface } from './../models/ingreso-egreso.model';
import { IngresoEgresoService } from './../services/ingreso-egreso.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-ingreso-egreso',
  templateUrl: './ingreso-egreso.component.html',
  styles: []
})
export class IngresoEgresoComponent implements OnInit {

  ingresoEgresoForm!: FormGroup;
  typeButton: string = 'ingreso';

  constructor(
    private ingresoEgresoService: IngresoEgresoService,
    private formBuilder: FormBuilder) {

  }

  ngOnInit() {

    this.ingresoEgresoForm = this.formBuilder.group({
      descripcion: ['', Validators.required],
      monto: ['', [Validators.required, Validators.min(1)]],
      tipo: ['']
    });

    this.tipoControl?.setValue(this.typeButton);
  }


  addIngresoEgresoRecord() {
    const ingresoEgresoData: IngresoEgresoInterface = this.ingresoEgresoForm.value;
    this.ingresoEgresoService.crearIngresoEgreso(ingresoEgresoData)
      .then((ref) => {
        console.log('IG-component OK', ref);
        this.resetFormIngresoEgreso();
        Swal.fire('Hey user!', 'Registro Correcto', 'info');
      }).catch((err) => {
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
