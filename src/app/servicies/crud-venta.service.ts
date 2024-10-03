import { Injectable, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http'; //Consulta http para la API.
import { Observable, lastValueFrom, map } from 'rxjs';  //Monitoriza los datos de la falsa API del service.

@Injectable({
  providedIn: 'root'
})
export class CrudVentaService {

  redirectUrl!:string;
  baseUrl:string = 'http://localhost/proyecto_sistema_inventario/sistema-inventario/ventas/';   //api de php (crud) API.

  @Output() getLoggedInName: EventEmitter<any> = new EventEmitter();

  constructor(private httpClient: HttpClient) { }

  public registrarVenta(usuario: string, cliente: string, fecha: string, total: number, detalle_venta: string) {
    return this.httpClient.post<any>(this.baseUrl + 'registrar.php',
      {
        usuario, cliente, fecha, total, detalle_venta
      }
    )
    .pipe(map(Venta => {
      return Venta;
    }));
  }

  public obtenerVentas()  {
    return this.httpClient.get(this.baseUrl + 'obtener.php');
  }

  public obtenerVenta(id:any):Observable<any> {
    return this.httpClient.get(this.baseUrl + "?consultar=" + id);
  }

  public async editarVenta(id:any, datosVenta:any) {
    try{
      return await lastValueFrom(
        this.httpClient.post(this.baseUrl+"?actualizar=" + id, datosVenta)
      );
    }catch (e) {
      console.log(e);
      return null;
    }
  }

  public async borrarVenta(id:any) {
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
