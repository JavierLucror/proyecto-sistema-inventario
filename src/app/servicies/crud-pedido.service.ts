import { Injectable, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http'; //Consulta http para la API.
import { Observable, lastValueFrom, map } from 'rxjs';  //Monitoriza los datos de la falsa API del service.

@Injectable({
  providedIn: 'root'
})
export class CrudPedidoService {

  redirectUrl!:string;
  baseUrl:string = 'http://localhost/proyecto-sistema-inventario/pedidos/';   //api de php (crud) API.

  @Output() getLoggedInName: EventEmitter<any> = new EventEmitter();

  constructor(private httpClient: HttpClient) { }

  public registrarPedido(usuario: string, proveedor: string, fecha: string, total: number, detalle_pedido: string) {
    return this.httpClient.post<any>(this.baseUrl + 'registrar.php',
      {
        usuario, proveedor, fecha, total, detalle_pedido
      }
    )
    .pipe(map(Pedido => {
      return Pedido;
    }));
  }

  public obtenerPedidos()  {
    return this.httpClient.get(this.baseUrl + 'obtener.php');
  }

  public obtenerPedido(id:any):Observable<any> {
    return this.httpClient.get(this.baseUrl + "?consultar=" + id);
  }

  public async editarPedido(id:any, datosPedido:any) {
    try{
      return await lastValueFrom(
        this.httpClient.post(this.baseUrl+"?actualizar=" + id, datosPedido)
      );
    }catch (e) {
      console.log(e);
      return null;
    }
  }

  public async borrarPedido(id:any) {
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