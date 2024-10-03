import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { CrudUsuarioService } from '../../servicies/crud-usuario.service';

import { first } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registrar-usuario',
  templateUrl: './registrar-usuario.component.html',
  styleUrl: './registrar-usuario.component.scss'
})
export class RegistrarUsuarioComponent {

  formularioDeUsuarios:FormGroup;

  constructor(public formulario:FormBuilder, private crudUsuario:CrudUsuarioService, private ruteador:Router) { 

    this.formularioDeUsuarios = this.formulario.group({
      nombre:['', Validators.required],
      apellidos:['', Validators.required],
      correo:['', Validators.required],
      contrasenia:['', Validators.required],
      telefono:['', Validators.required]
    });

  }

  async enviarDatos(formularioDeUsuarios:any)  {
    
    let confirma: boolean = false;
    
    await Swal.fire({
      title: "¿Confirmar registro de usuario?", 
      showCancelButton: true, 
      confirmButtonText: "Confirmar"
    }).then((result) => {
      if(result)
        {
          confirma = result.value;
          return result.value
        }
    });

    if(confirma)  {
      this.crudUsuario.registrarUsuario(
        formularioDeUsuarios.value.nombre,
        formularioDeUsuarios.value.apellidos,
        formularioDeUsuarios.value.correo,
        formularioDeUsuarios.value.contrasenia,
        formularioDeUsuarios.value.telefono,
      )
      .pipe(first())
      .subscribe(
      data => {
        this.ruteador.navigate(['login-usuario']);
      },
      error => {
        swal("¡Error de registro de usuario!");
      });
    }
  }
}