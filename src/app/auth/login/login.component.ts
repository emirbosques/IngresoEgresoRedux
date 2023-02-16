import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

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
        console.log(loginOk);
        this.router.navigate(['/']);
      })
      .catch((err) => {
        console.log(err);
      });
  }

}
