import { Injectable, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http'; //Consulta http para la API.
import { Observable, lastValueFrom, map } from 'rxjs';  //Monitoriza los datos de la falsa API del service.

@Injectable({
  providedIn: 'root'
})
export class CrudCategoriaService {

  redirectUrl!:string;
  baseUrl:string = 'http://localhost/proyecto-sistema-inventario/categorias/';   //api de php (crud) API.

  @Output() getLoggedInName: EventEmitter<any> = new EventEmitter();

  constructor(private httpClient: HttpClient) { }

  public registrarCategoria(nombre:string, marca:string, pais:string) {
    return this.httpClient.post<any>(this.baseUrl + 'registrar.php',
      {
        nombre, marca, pais
      }
    )
    .pipe(map(Categoria => {
      return Categoria;
    }));
  }
  
  public obtenerCategorias()  {
    return this.httpClient.get(this.baseUrl + 'obtener.php');
  }

  public obtenerCategoria(id:any):Observable<any> {
    return this.httpClient.get(this.baseUrl + "?consultar=" + id);
  }

  public async editarCategoria(id:any, datosCategoria:any) {
    try{
      return await lastValueFrom(
        this.httpClient.post(this.baseUrl+"?actualizar=" + id, datosCategoria)
      );
    }catch (e) {
      console.log(e);
      return null;
    }
  }

  public async borrarCategoria(id:any) {
    try{
      return await lastValueFrom(
        this.httpClient.get(this.baseUrl+"?borrar=" + id)
      );
    }catch (e) {
      console.log(e);
      return null;
    }
  }
  
}
