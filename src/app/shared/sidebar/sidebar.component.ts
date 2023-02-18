import { Router } from '@angular/router';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: []
})
export class SidebarComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
  }


  logout() {
    this.authService.logoutSession()
      .then(() => {
        console.log('Cerrando sesion....');
        this.router.navigate(['/login']);
      })
      .catch((error) => {
        console.log(error);

        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Ha ocurrido un error inesperado. Intente la operacion mas tarde.',
        });

      })
  }

}
