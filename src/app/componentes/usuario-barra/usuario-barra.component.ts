import { Component } from '@angular/core';
import { CrudUsuarioService } from '../../servicies/crud-usuario.service';
import swal from 'sweetalert';

@Component({
  selector: 'app-usuario-barra',
  templateUrl: './usuario-barra.component.html',
  styleUrl: './usuario-barra.component.scss'
})
export class UsuarioBarraComponent {

  loginbtn:boolean;
  logoutbtn:boolean;

  constructor(dataService: CrudUsuarioService)  {

    dataService.getLoggedInName.subscribe(nombre => this.cambiarNombre(nombre));

    if(localStorage.getItem('item')) {
      this.loginbtn = false;
      this.logoutbtn = true;
    } else  {
      this.loginbtn = true;
      this.logoutbtn = false;
    }

  }

  private cambiarNombre(nombre: boolean): void {
    this.logoutbtn = nombre;
    this.loginbtn = !nombre;

    swal("Se ha iniciado de sesión el usuario");
  }

  logout()  {
    localStorage.removeItem('item');
    swal("Se ha cerrado de sesión el usuario");
    this.cerrarSesion();
  }

  cerrarSesion()  {
    setTimeout(function(){
      window.location.href = window.location.href
    }, 500);
  }
  
}