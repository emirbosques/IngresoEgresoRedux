import { isLoading, stopLoading } from './../../shared/ui.actions';
import { AppState } from './../../app.reducer';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: []
})
export class RegisterComponent implements OnInit, OnDestroy {

  registroForm!: FormGroup;
  registrando: boolean = false;
  uiSubscriptions!: Subscription;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private store: Store<AppState>
  ) { }

  ngOnInit() {

    this.registroForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });

    this.uiSubscriptions = this.store.select('ui')
      .subscribe((ui) => {
        this.registrando = ui.isLoading;
      });
  }


  ngOnDestroy(): void {
    this.uiSubscriptions.unsubscribe();
  }


  crearUsuario() {
    // this.authService.showLoading()
    if (this.registroForm.valid) {
      this.store.dispatch(isLoading());
      console.log(this.registroForm.value);
      const { nombre, email, password } = this.registroForm.value;
      this.authService.crearUsuario(nombre, email, password)
        .then((credenciales) => {
          console.log('Credenciales OK:', credenciales);
          this.registroForm.reset();
          this.store.dispatch(stopLoading());
          this.router.navigate(['/']);
          // this.authService.closeLoading()
        }).catch((err) => {
          // this.authService.closeLoading()
          this.store.dispatch(stopLoading());
          console.log('Error:', err);
          const errorCode = err.code
          // ALERT
          if (errorCode == 'auth/weak-password') {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: err.message,
            })
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: err.message,
            });
          }

        })
    }
  }

}
