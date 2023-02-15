import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: []
})
export class RegisterComponent implements OnInit {

  registroForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {

    this.registroForm = this.formBuilder.group({

      nombre: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]

    });

  }


  crearUsuario() {
    if (this.registroForm.valid) {
      console.log(this.registroForm.value);
      const { nombre, email, password } = this.registroForm.value;
      this.authService.crearUsuario(nombre, email, password)
        .then((credenciales) => {
          console.log('Credenciales OK:', credenciales);
          this.registroForm.reset();
          this.router.navigate(['/']);
        }).catch((err) => {
          console.log('Error:', err);
        })
    }
  }

}
