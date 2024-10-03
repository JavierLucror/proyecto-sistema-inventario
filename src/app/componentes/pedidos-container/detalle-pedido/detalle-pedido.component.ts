import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CrudPedidoService } from '../../../servicies/crud-pedido.service';

@Component({
  selector: 'app-detalle-pedido',
  templateUrl: './detalle-pedido.component.html',
  styleUrl: './detalle-pedido.component.scss'
})
export class DetallePedidoComponent {

  inputdata: any;
  productos: any;
  columnasDialog: string[] = ['descripcion', 'categoria', 'precio', 'cantidad', 'total'];

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private crudPedidoService: CrudPedidoService, private ref: MatDialogRef<DetallePedidoComponent>) {}

  ngOnInit(): void {
    this.inputdata = this.data;
    this.getProductos(this.data.id_pedido);
  }

  cerrarDialog()  {
    this.ref.close();
  }

  getProductos(data: number) {
    this.crudPedidoService.obtenerPedido(data).subscribe(respuesta => {
      this.productos = JSON.parse(respuesta[0].detalle_pedido);
    });
  }

}