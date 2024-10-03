import { Injectable, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http'; //Consulta http para la API.
import { Observable, lastValueFrom, map } from 'rxjs';  //Monitoriza los datos de la falsa API del service.

@Injectable({
  providedIn: 'root'
})
export class CrudProductoService {

  redirectUrl!:string;
  baseUrl:string = 'http://localhost/proyecto_sistema_inventario/sistema-inventario/productos/';   //api de php (crud) API.

  @Output() getLoggedInName: EventEmitter<any> = new EventEmitter();

  constructor(private httpClient: HttpClient) { }

  public registrarProducto(descripcion:string, categoria:string, precio:number, cantidad:number, total_producto:number) {
    return this.httpClient.post<any>(this.baseUrl + 'registrar.php',
      {
        descripcion, categoria, precio, cantidad, total_producto
      }
    )
    .pipe(map(Producto => {
      return Producto;
    }));
  }

  public obtenerProductos()  {
    return this.httpClient.get(this.baseUrl + 'obtener.php');
  }

  public obtenerProducto(id:any):Observable<any> {
    return this.httpClient.get(this.baseUrl + "?consultar=" + id);
  }

  public validarProducto(descripcion:any):Observable<any> {
    return this.httpClient.get(this.baseUrl + "?validar=" + descripcion);
  }

  public buscarProducto(descripcion:any):Observable<any> {
    return this.httpClient.get(this.baseUrl + "?buscar=" + descripcion);
  }

  public async editarProducto(id:any, datosProducto:any) {
    try{
      return await lastValueFrom(
        this.httpClient.post(this.baseUrl+"?actualizar=" + id, datosProducto)
      );
    }catch (e) {
      console.log(e);
      return null;
    }
  }

  public async borrarProducto(id:any) {
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