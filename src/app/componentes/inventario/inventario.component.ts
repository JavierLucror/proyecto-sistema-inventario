import { Component, OnInit } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';
import { FormControl } from '@angular/forms';

import { CrudInventarioService } from '../../servicies/crud-inventario.service';
import { CrudProductoService } from '../../servicies/crud-producto.service';

import { Inventario } from '../../clases/Inventario';
import { Producto } from '../../clases/Producto';

import { map, Observable, startWith, Subject } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-inventario',
  templateUrl: './inventario.component.html',
  styleUrl: './inventario.component.scss'
})

export class InventarioComponent implements OnInit  {

  id_producto: number = 0;
  columnas: string[] = ['descripcion', 'categoria', 'stock_inicial', 'entradas', 'salidas', 'stock_real'];
  respuesta: any;
  buscarProductos: Producto[] = [];
  inventario: any;
  arrayInventario: Inventario[] = [];
  inventarioSelect: Inventario = new Inventario(0, '', '', 0, 0, 0, 0);

  //Buscador variables
  buscarProducto$ = new Subject<string>();
  myControl = new FormControl('');
  respuesta_buscador: any;
  options: string[] = [];
  filteredOptions: Observable<string[]> | undefined;

  constructor(private dialog: MatDialog, private crudProductoService: CrudProductoService, private crudInventarioService: CrudInventarioService) {}

  ngOnInit()  {
    this.crudInventarioService.obtenerInventario().subscribe(respuesta=>{
      this.respuesta = respuesta;
      this.arrayInventario = this.respuesta;
      if(this.arrayInventario[0].id_producto) {
        this.inventario = this.arrayInventario;
      }
    });

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

  }

  async annadirCantidad()  {
     
    let confirma: boolean = false;
    let existe: number = 0;
    
    //Buscar producto en el inventario
    this.crudInventarioService.buscarInventario(this.inventarioSelect.descripcion).subscribe(async respuesta=>{

      existe = parseInt(respuesta.success);

      if(existe == 1)  {
        
        if(this.inventarioSelect.entradas <= 0) {

          await Swal.fire({
            title: "¡No se permiten numeros negativos!", 
            showCancelButton: true, 
            confirmButtonText: "Confirmar"
          }).then((result) => {
          if(result) {
            confirma = result.value;
            return result.value
          }
          });

        }

        //Annadir cantidad al producto de la base de datos
        if(this.inventarioSelect.entradas > 0)  {

          await Swal.fire({
            title: "¿Confirmar cantidad ha añadir al producto?", 
            showCancelButton: true, 
            confirmButtonText: "Confirmar"
          }).then((result) => {
          if(result) {
            confirma = result.value;
            return result.value
          }
          });

          if(confirma)  {
            await this.crudInventarioService.annadirCantidad(this.inventarioSelect.descripcion, this.inventarioSelect.entradas);
          }

      } else  {

        await Swal.fire({
          title: "Indique la cantidad ha añadir al producto", 
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

  });
  }

  //Metodo para buscador
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options.filter(option => option.toLowerCase().includes(filterValue));
    }
}