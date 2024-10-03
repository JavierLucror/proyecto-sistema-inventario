import { Component, inject, ViewChild, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTable } from '@angular/material/table';
import { formatDate } from '@angular/common';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';

import { CrudVentaService } from '../../../servicies/crud-venta.service';
import { CrudProductoService } from '../../../servicies/crud-producto.service';

import { Producto } from '../../../clases/Producto';

import { map, Observable, startWith, Subject } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-vender',
  templateUrl: './vender.component.html',
  styleUrl: './vender.component.scss'
})
export class VenderComponent implements OnInit {

  //Variables
  id_producto: number = 0;
  respuesta: any;
  productos: any;
  buscarProductos: Producto[] = [];
  arrayProductos: Producto[] = [];
  registroProductos: Producto[] = [];
  columnas: string[] = ['descripcion', 'categoria', 'precio', 'cantidad', 'total', 'borrar'];
  productoSelect: Producto = new Producto(0, '', '', 0, 0);
  cliente: string = '';

  //Buscador variables
  buscarProducto$ = new Subject<string>();
  myControl = new FormControl('');
  respuesta_buscador: any;
  options: string[] = [];
  filteredOptions: Observable<string[]> | undefined;

  //Notificacion angular material
  private _snackBar = inject(MatSnackBar);

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }
  //

  ngOnInit(): void {

    this.crudProductoService.obtenerProductos().subscribe(respuesta => {
      this.respuesta = respuesta;
      this.buscarProductos = this.respuesta;
      
      //Obtener nombre de productos para buscar
      this.buscarProductos.forEach( (value) => {
        this.options.push(value.descripcion);
      });
    });

    //Buscador de autocompletado
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );

    this.sumarTotal();
    this.sumarCantidadTotal();
    this.recogerDatos();
  }

  constructor(private crudProductoService: CrudProductoService, private crudVentaService:CrudVentaService, private ruteador: Router) {}

  @ViewChild(MatTable) tabla1!: MatTable<Producto>;

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //Metodos producto
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  async borrarProducto(id:any) {
    let confirma: boolean = false;
    
    await Swal.fire({
      title: "¿Quieres borrar este producto?", 
      showCancelButton: true, 
      confirmButtonText: "Confirmar"
    }).then((result) => {
      if(result)
        {
          confirma = result.value;
          return result.value
        }
    });

    if(confirma)  {
      this.productos.splice(id,1);
      this.tabla1.renderRows();

      this.sumarTotal();
      this.sumarCantidadTotal();

      this._snackBar.open('Fila borrada', 'Quitar', { duration: 3000});
    }
  }

  async registrarProducto()  {

    let confirma: boolean = false;
    let producto_existe: string = '';
    let producto_valido: string = '';
    let existe = false;
    let valido = false;

    //Validadar cantidad negativa o igual a cero
    if(this.productoSelect.cantidad <= 0) {
      await Swal.fire({
        title: "¡No se permiten numeros negativos o iguales a cero!", 
        showCancelButton: false, 
        confirmButtonText: "Vale"
      }).then((result) => {
        if(result) {
          confirma = result.value;
          return result.value
        }
      });
    }

    //Validadar campos
    if(this.productoSelect.descripcion == '' && this.productoSelect.descripcion == undefined && this.productoSelect.cantidad > 0)  {
      await Swal.fire({
        title: "Rellene todos los campos", 
        showCancelButton: false, 
        confirmButtonText: "Vale"
      }).then((result) => {
        if(result) {
          confirma = result.value;
          return result.value
        }
      });
    }

    //Obtener nombre de productos para buscar
    this.registroProductos.forEach( (value) => {
      producto_existe = value.descripcion;
      if(producto_existe == this.productoSelect.descripcion)  {
        existe = true;
      }
    });

    //Validadar producto ya annadido
    if(existe)  {
      await Swal.fire({
        title: "¡Este producto ya esta seleccionado!", 
        showCancelButton: false, 
        confirmButtonText: "Vale"
      }).then((result) => {
        if(result) {
          confirma = result.value;
          this.productoSelect.descripcion = '';
          this.productoSelect.cantidad = 0;
          return result.value
        }
      });
    }

    //Obtener nombre de productos para buscar
    this.buscarProductos.forEach( (value) => {
      producto_valido = value.descripcion;
      if(producto_valido == this.productoSelect.descripcion)  {
        valido = true; 
      }
    });

    //Validadar nombre de producto incompleto o inesistente
    if(valido == false && existe == false)  {
      await Swal.fire({
        title: "¡Complete o eliga el nombre del producto!", 
        showCancelButton: false, 
        confirmButtonText: "Vale"
      }).then((result) => {
        if(result) {
          confirma = result.value;
          this.productoSelect.descripcion = '';
          this.productoSelect.cantidad = 0;
          return result.value
        }
      });
    }

    //Validadar campos vacios o indefinidos
    if(this.productoSelect.descripcion != '' && this.productoSelect.descripcion != undefined && this.productoSelect.cantidad > 0 && existe == false && valido)  {

      await Swal.fire({
        title: "¿Confirmar registro de producto?", 
        showCancelButton: true, 
        confirmButtonText: "Confirmar"
      }).then((result) => {
        if(result) {
          confirma = result.value;
          return result.value
        }
      });

      //Buscar producto y annadirle en la tabla
      if(confirma)  {
        this.crudProductoService.buscarProducto(this.productoSelect.descripcion).subscribe(respuesta=>{
          
          this.respuesta = respuesta;
          this.arrayProductos = this.respuesta;

          this.arrayProductos[0].cantidad = this.productoSelect.cantidad;
          this.arrayProductos[0].total_producto = this.calcularTotal(this.arrayProductos[0].precio, this.arrayProductos[0].cantidad);

          this.productoSelect.descripcion = '';
          this.productoSelect.cantidad = 0;

          this.registroProductos.push(this.arrayProductos[0]);
          this.asignarProductos(this.registroProductos);
        });
      }
    }
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //Metodos de utilidad
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  calcularTotal(precio: number, cantidad: number) {
    let total: number;
    return total = cantidad * precio;
  }

  sumarTotal()  {
    let total: number = 0;
    let str_total: string;

    this.registroProductos.forEach(function (value: Producto) { 
      total += value.total_producto;
      total.toFixed(2);
    });

    str_total = total.toFixed(2).toString();
    document.getElementById('totalNumVenta')!.innerHTML = str_total + "€";
  }

  sumarCantidadTotal()  {
    let cantidadTotal: number = 0;
    let str_cantidad: string;

    this.registroProductos.forEach(function (value: any) {
      cantidadTotal += parseInt(value.cantidad);
    });

    str_cantidad = cantidadTotal.toString();
    document.getElementById('cantidadNumVenta')!.innerHTML = str_cantidad;
  }

  //Datos del cliente y fecha actual
  recogerDatos()  {
    let clienteActual: string = localStorage.getItem('item')?.toString() || '';
    let fechaActual = formatDate(Date.now(),'dd-MM-yyyy','en-US').toString();
     
    document.getElementById('usuario')!.innerHTML = clienteActual;
    document.getElementById('fecha')!.innerHTML = fechaActual;
  }

  //Mostrar productos al agregarlos a la tabla
  asignarProductos(registroProductos: Producto[])  {
    this.sumarTotal();
    this.sumarCantidadTotal();
    this.productos = registroProductos;
    this.tabla1.renderRows();
  }

  //Metodo para buscador
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //Metodos venta
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  async confirmarVenta()  {

    //Variables
    let confirma: boolean = false;
    let usuarioActual: string = document.getElementById('usuario')!.innerHTML;
    let clienteActual: string = this.cliente;
    let fechaActual = formatDate(Date.now(),'dd-MM-yyyy','en-US').toString();
    let total: string = parseInt(document.getElementById('totalNumVenta')!.innerHTML).toFixed(2);
    let totalActual: number = parseInt(total);
    let datosJSON = JSON.stringify(this.productos);

    if(clienteActual != '')  {
      await Swal.fire({
        title: "¿Confirmar registro de venta?", 
        showCancelButton: true, 
        confirmButtonText: "Confirmar"
      }).then((result) => {
        if(result)
          {
            confirma = result.value;
            return result.value
          }
      });
  
      if(confirma)  {
        this.crudVentaService.registrarVenta(usuarioActual, clienteActual, fechaActual, totalActual, datosJSON).subscribe(()=>{});
        setTimeout(() => {
          window.location.reload();
        }, 500);
        this.ruteador.navigateByUrl('/ventas');
      }

    }else {
      await Swal.fire({
        title: "Indique el cliente para la venta", 
        showCancelButton: false, 
        confirmButtonText: "Vale"
      }).then((result) => {
        if(result) {
          confirma = result.value;
          return result.value
        }
      });
    }
  }

  async cancelarVenta()  {
    let confirma: boolean = false;

    await Swal.fire({
      title: "¿Seguro que quieres cancelar la venta?", 
      showCancelButton: true, 
      confirmButtonText: "Confirmar"
    }).then((result) => {
      if(result)
        {
          confirma = result.value;
          return result.value
        }
    });

    if(confirma)  {
      this.productos = [];
      this.sumarTotal();
      this.sumarCantidadTotal();
      setTimeout(() => {
        window.location.reload();
      }, 500);
    }
  }

}