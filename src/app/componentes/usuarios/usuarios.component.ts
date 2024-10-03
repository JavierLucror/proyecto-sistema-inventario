import { Component, OnInit } from '@angular/core';
import { CrudUsuarioService } from '../../servicies/crud-usuario.service';
import { Usuario } from '../../clases/Usuario';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.scss'
})
export class UsuariosComponent implements OnInit  {
  
  columnas: string[] = ['nombre', 'apellidos', 'correo', 'telefono'];
  respuesta: any;
  usuarios: any;
  arrayUsuarios: Usuario[] = [];

  constructor(private usuarioServicio: CrudUsuarioService) {}

  ngOnInit()  {
    this.usuarioServicio.obtenerUsuarios().subscribe(respuesta=>{
      this.respuesta = respuesta;
      this.arrayUsuarios = this.respuesta;
      if(this.arrayUsuarios[0].id)  {   //solo si hay algun registro que se muestre. para que no salgan registros vacios
        this.usuarios = this.arrayUsuarios;
      }
    });
  }

}