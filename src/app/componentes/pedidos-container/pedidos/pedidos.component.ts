import { Component, Inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { CrudPedidoService } from '../../../servicies/crud-pedido.service';
import { DetallePedidoComponent } from '../detalle-pedido/detalle-pedido.component';
import { Pedido } from '../../../clases/Pedido';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrl: './pedidos.component.scss'
})
export class PedidosComponent {

  id_pedido: number = 0;
  columnas: string[] = ['usuario', 'proveedor', 'fecha', 'total', 'detalle_pedido'];
  respuesta: any;
  pedidos: any;
  arrayPedidos: Pedido[] = [];

  constructor(private dialog: MatDialog, private crudPedidoService: CrudPedidoService) {}

  ngOnInit()  {
    this.crudPedidoService.obtenerPedidos().subscribe(respuesta=>{
      this.respuesta = respuesta;
      this.arrayPedidos = this.respuesta;
      if(this.arrayPedidos[0].id_pedido) {
        this.pedidos = this.arrayPedidos;
      }
    });
  }

  abrirDialog(j: number) {
    this.id_pedido = this.arrayPedidos[j].id_pedido;
    var _dialog = this.dialog.open(DetallePedidoComponent, {
      width: '60%',
      enterAnimationDuration: '1000ms',
      exitAnimationDuration: '500ms',
      data: {
        title: 'Detalle de pedido',
        id_pedido: this.id_pedido,
      }
    });
  }

}