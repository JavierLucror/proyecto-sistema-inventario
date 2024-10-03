import { Injectable, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http'; //Consulta http para la API.
import { map } from 'rxjs';  //Monitoriza los datos de la falsa API del service.

@Injectable({
  providedIn: 'root'
})
export class CrudUsuarioService {

  redirectUrl!:string;
  baseUrl:string = 'http://localhost/proyecto_sistema_inventario/sistema-inventario/usuarios/';   //api de php (crud) API.

  @Output() getLoggedInName: EventEmitter<any> = new EventEmitter();

  constructor(private httpClient: HttpClient) { }

  public registrarUsuario(nombre:string, apellidos:string, correo:string, contrasena:string, telefono:string) {

    return this.httpClient.post<any>(this.baseUrl + 'registrar.php',
      {
        nombre, apellidos, correo, contrasena, telefono
      }
    )
    .pipe(map(Usuario => {
      return Usuario;
    }));
    
  }

  public logearUsuario(correo:any, contrasena: any)  {

    return this.httpClient.post<any>(this.baseUrl + 'login.php', { correo, contrasena })
    .pipe(map(Usuario => {
      this.setToken(Usuario.correo);
      this.getLoggedInName.emit(true);
      return Usuario;
    }));
    
  }
  
  public obtenerUsuarios()  {
    return this.httpClient.get(this.baseUrl + 'obtener.php');
  }

  setToken(token: string) {
    localStorage.setItem('item', token);
  }

  getToken()  {
    return localStorage.getItem('token');
  }

  deleteToken() {
    localStorage.removeItem('token');
  }

}
