import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTable } from '@angular/material/table';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

import { CrudProductoService } from '../../../servicies/crud-producto.service';
import { CrudCategoriaService } from '../../../servicies/crud-categoria.service';
import { CrudInventarioService } from '../../../servicies/crud-inventario.service';

import { EditarProductoComponent } from '../editar-producto/editar-producto.component';

import { Producto } from '../../../clases/Producto';
import { Categoria } from '../../../clases/Categoria';

import Swal from 'sweetalert2';
import { first } from 'rxjs';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrl: './productos.component.scss'
})
export class ProductosComponent implements OnInit {

  //Variables
  id_producto: number = 0;
  productos: any;
  respuesta: any;
  respuestaCategorias: any;
  arrayProductos: Producto[] = [];
  categorias: Categoria[] = [];
  columnas: string[] = ['descripcion', 'categoria', 'precio', 'editar', 'borrar'];
  productoSelect: Producto = new Producto(0, '', '', 0, 0);
 
  //Notificacion angular material
  private _snackBar = inject(MatSnackBar);
 
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }
  //
 
  constructor(private dialog: MatDialog, private crudProductoService: CrudProductoService, private crudInventarioService: CrudInventarioService, private crudCategoriaService: CrudCategoriaService, private ruteador: Router) {}
   
  ngOnInit(): void {
    this.crudProductoService.obtenerProductos().subscribe(respuesta => {
      this.respuesta = respuesta;
      this.arrayProductos = this.respuesta;
      if(this.arrayProductos[0].id_producto)  {
        this.productos = this.arrayProductos;
      }
    });

    this.crudCategoriaService.obtenerCategorias().subscribe(respuesta => {
      this.respuestaCategorias = respuesta;
      this.categorias = this.respuestaCategorias
    });
  }
 
  @ViewChild(MatTable) tabla1!: MatTable<Producto>;
 
  //Metodos
 
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
      let id_producto: number = this.productos[id].id_producto;

      this.crudProductoService.borrarProducto(id_producto);
      this.productos.splice(id,1);
      this.tabla1.renderRows();

      this._snackBar.open('Fila borrada', 'Quitar', { duration: 3000});
    }

  }
 
  async registrarProducto()  {
     
    let confirma: boolean = false;
    let existe: number = 0;
    
    //Validar producto
    this.crudProductoService.validarProducto(this.productoSelect.descripcion).subscribe(async respuesta=>{

      existe = parseInt(respuesta.success);

      if(existe == 1)  {
        await Swal.fire({
          title: "¡El producto ya existe!", 
          showCancelButton: false, 
          confirmButtonText: "Vale"
        }).then((result) => {
          if(result) {
            confirma = result.value;
            return result.value
          }
        });
      }

    });

    //Annadir producto a la base de datos

    if(this.productoSelect.descripcion != '' && this.productoSelect.categoria != '' && this.productoSelect.categoria != undefined && this.productoSelect.precio > 0)  {
      
      this.productoSelect.cantidad = 0;

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

      if(confirma)  {
          this.crudProductoService.registrarProducto(
          this.productoSelect.descripcion,
          this.productoSelect.categoria,
          this.productoSelect.precio,
          this.productoSelect.cantidad,
          this.productoSelect.total_producto
        )
        .pipe(first())
        .subscribe(
        () => {
        });

        //Annadir a la tabla sin cargar de nuevo
        this.productos.push(new Producto(0,this.productoSelect.descripcion, this.productoSelect.categoria, this.productoSelect.precio, this.productoSelect.cantidad));
        this.tabla1.renderRows();
      }

      this.productoSelect.descripcion = '';
      this.productoSelect.categoria = '';
      this.productoSelect.precio = 0;

    } else  {

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

    setTimeout(() => {
      window.location.reload();
    }, 100);
  }

  abrirDialog(j: number) {
    this.id_producto = this.arrayProductos[j].id_producto;
    var _dialog = this.dialog.open(EditarProductoComponent, {
      width: '99%',
      enterAnimationDuration: '1000ms',
      exitAnimationDuration: '500ms',
      data: {
        title: 'Editar producto',
        id_producto: this.id_producto,
      }
    });
  }

}