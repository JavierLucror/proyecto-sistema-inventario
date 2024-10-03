import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { CrudProductoService } from '../../../servicies/crud-producto.service';
import { CrudCategoriaService } from '../../../servicies/crud-categoria.service';

import { Categoria } from '../../../clases/Categoria';

@Component({
  selector: 'app-editar-producto',
  templateUrl: './editar-producto.component.html',
  styleUrl: './editar-producto.component.scss'
})
export class EditarProductoComponent implements OnInit {

  //Variables
  inputdata: any;
  productos: any;
  columnasDialog: string[] = ['nombre', 'marca', 'pais'];
  formularioDeProductos:FormGroup;
  categorias: Categoria[] = [];
  respuestaCategorias: any;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private crudService: CrudProductoService, private crudCategoriaService: CrudCategoriaService, private ref: MatDialogRef<EditarProductoComponent>, public formulario:FormBuilder, private ruteador:Router) {
    
    //Recoger producto a editar
    this.crudService.obtenerProducto(this.data.id_producto).subscribe(respuesta=>{
      this.productos = respuesta[0];
      this.formularioDeProductos.setValue({
        descripcion:this.productos.descripcion,
        categoria:this.productos.categoria,
        precio:this.productos.precio
      });
    });

    //Nuevo registro a actualizar
    this.formularioDeProductos = this.formulario.group({
      descripcion:[''],
      categoria:[''],
      precio:['']
    });
  }

  ngOnInit(): void {
    this.inputdata = this.data;

    this.crudCategoriaService.obtenerCategorias().subscribe(respuesta => {
      this.respuestaCategorias = respuesta;
      this.categorias = this.respuestaCategorias
    });
  }

  cerrarDialog()  {
    this.ref.close();
  }

  async enviarDatos() {
    //this.ruteador.navigateByUrl('/productos');
    await this.crudService.editarProducto(this.data.id_producto, this.formularioDeProductos.value);
    setTimeout(() => {
      window.location.reload();
    }, 500);
  }
  
}