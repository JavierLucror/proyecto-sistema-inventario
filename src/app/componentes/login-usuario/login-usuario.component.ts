import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { CrudUsuarioService } from '../../servicies/crud-usuario.service';

import { first } from 'rxjs';
import swal from 'sweetalert';

@Component({
  selector: 'app-login-usuario',
  templateUrl: './login-usuario.component.html',
  styleUrl: './login-usuario.component.scss'
})
export class LoginUsuarioComponent {

  formularioDeUsuarios:FormGroup;

  constructor(public formulario:FormBuilder, private crudUsuario:CrudUsuarioService, private ruteador:Router) {
    this.formularioDeUsuarios = this.formulario.group({
      correo: ['', [Validators.required, Validators.minLength(1), Validators.email]],
      contrasenia: ['', Validators.required]
    });
  }
  
  enviarDatos(formularioDeUsuarios:any) {
    this.crudUsuario.logearUsuario(formularioDeUsuarios.value.correo, formularioDeUsuarios.value.contrasenia)
    .pipe(first())
    .subscribe(
      data => {
        if(data.message == 'success')  {
          this.ruteador.navigate(['dashboard']);
        }
      },
      error => {
        swal("Usuario o contraseña incorrectas.");
      }
    );

    setTimeout(function(){
      window.location.reload();
    }, 1000);
  }
}