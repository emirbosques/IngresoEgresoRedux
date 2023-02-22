import { isLoading, stopLoading } from './../../shared/ui.actions';
import { AppState } from './../../app.reducer';
import { AuthService } from './../../services/auth.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit, OnDestroy {

  loginForm !: FormGroup;
  cargando: boolean = false;
  uiSubscriptions!: Subscription;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private store: Store<AppState>
  ) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      user: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });

    this.uiSubscriptions = this.store.select('ui')
      .subscribe((ui) => {
        this.cargando = ui.isLoading
        console.log('Cargando Store isLoading');
      });

  }


  ngOnDestroy(): void {
    this.uiSubscriptions.unsubscribe();
  }

  loginUser() {
    // this.authService.showLoading();

    this.store.dispatch(isLoading());

    const { user, password } = this.loginForm.value;
    this.authService.authenticateUser(user, password)
      .then((loginOk) => {
        this.store.dispatch(stopLoading());
        this.router.navigate(['/']);
        // this.authService.closeLoading()
      })
      .catch((error) => {
        this.store.dispatch(stopLoading());
        // this.authService.closeLoading()
        const mssgError = error.code;
        // ALERT
        if (mssgError === 'auth/user-not-found') {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: error.message,
          });
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: error.message,
          });
        }
      });
  }





}
