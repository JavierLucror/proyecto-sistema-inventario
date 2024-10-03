import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CrudVentaService } from '../../../servicies/crud-venta.service';

@Component({
  selector: 'app-detalle-venta',
  templateUrl: './detalle-venta.component.html',
  styleUrl: './detalle-venta.component.scss'
})
export class DetalleVentaComponent implements OnInit {

  inputdata: any;
  productos: any;
  columnasDialog: string[] = ['descripcion', 'categoria', 'precio', 'cantidad', 'total'];

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private crudService: CrudVentaService, private ref: MatDialogRef<DetalleVentaComponent>) {}

  ngOnInit(): void {
    this.inputdata = this.data;
    this.getProductos(this.data.id_venta);
  }

  cerrarDialog()  {
    this.ref.close();
  }

  getProductos(data: number) {
    this.crudService.obtenerVenta(data).subscribe(respuesta => {
      this.productos = JSON.parse(respuesta[0].detalle_venta);
    });
  }

}