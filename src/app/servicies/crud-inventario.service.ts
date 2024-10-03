import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { lastValueFrom, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CrudInventarioService {

  redirectUrl!:string;
  baseUrl:string = 'http://localhost/proyecto_sistema_inventario/sistema-inventario/inventarios/';   //api de php (crud) API.

  @Output() getLoggedInName: EventEmitter<any> = new EventEmitter();

  constructor(private httpClient: HttpClient) { }

  public obtenerInventario()  {
    return this.httpClient.get(this.baseUrl + 'obtener.php');
  }

  public obtenerProductos()  {
    return this.httpClient.get(this.baseUrl + "?productos=");
  }

  public buscarInventario(descripcion:any):Observable<any> {
    return this.httpClient.get(this.baseUrl + "?buscar=" + descripcion);
  }

  public async annadirCantidad(descripcion:any, cantidad: number) {
    try{
      return await lastValueFrom(
        this.httpClient.post(this.baseUrl+"?actualizar=" + descripcion, cantidad)
      );
    }catch (e) {
      console.log(e);
      return null;
    }
  }
}