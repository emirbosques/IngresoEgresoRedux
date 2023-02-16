import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit {

  loginForm !: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {

    this.loginForm = this.formBuilder.group({
      user: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });

  }

  loginUser() {
    console.log(this.loginForm.value);
    const { user, password } = this.loginForm.value;
    this.authService.authenticateUser(user, password)
      .then((loginOk) => {
        console.log(['code']);
        this.router.navigate(['/']);
      })
      .catch((error) => {
        const mssgError = error.code;
        // ALERT
        if (mssgError === 'auth/user-not-found') {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Usuario o password inválidos, por favor revise sus credenciales.',
          });
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Hubo un problema al intentar hacer el login. Intentelo de nuevo más tarde.',
          });
        }

      });
  }

}
