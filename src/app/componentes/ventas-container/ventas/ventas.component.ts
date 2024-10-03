import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { DetalleVentaComponent } from '../detalle-venta/detalle-venta.component';
import { Venta } from '../../../clases/Venta';
import { CrudVentaService } from '../../../servicies/crud-venta.service';

@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.component.html',
  styleUrl: './ventas.component.scss'
})
export class VentasComponent implements OnInit  {

  id_venta: number = 0;
  columnas: string[] = ['usuario', 'cliente', 'fecha', 'total', 'detalle_venta'];
  respuesta: any;
  ventas: any;
  arrayVentas: Venta[] = [];

  constructor(private dialog: MatDialog, private crudVentaService: CrudVentaService) {}

  ngOnInit()  {
    this.crudVentaService.obtenerVentas().subscribe(respuesta=>{
      this.respuesta = respuesta;
      this.arrayVentas = this.respuesta;
      if(this.arrayVentas[0].id_venta) {
        this.ventas = this.arrayVentas;
      }
    });
  }

  abrirDialog(j: number) {
    this.id_venta = this.arrayVentas[j].id_venta;
    var _dialog = this.dialog.open(DetalleVentaComponent, {
      width: '60%',
      enterAnimationDuration: '1000ms',
      exitAnimationDuration: '500ms',
      data: {
        title: 'Detalle de venta',
        id_venta: this.id_venta,
      }
    });
  }
}