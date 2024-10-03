import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTable } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

import { CrudCategoriaService } from '../../../servicies/crud-categoria.service';
import { EditarCategoriaComponent } from '../editar-categoria/editar-categoria.component';
import { Categoria } from '../../../clases/Categoria';

import { first } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrl: './categorias.component.scss'
})

export class CategoriasComponent implements OnInit {

  //Variables
  id_categoria: number = 0;
  categorias: any;
  respuesta: any;
  arrayCategorias: Categoria[] = [];
  columnas: string[] = ['nombre', 'marca', 'pais', 'editar', 'borrar'];
  categoriaSelect: Categoria = new Categoria(0, '', '', '');

  //Notificacion angular material
  private _snackBar = inject(MatSnackBar);

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }
  //

  constructor(private dialog: MatDialog, private crudService: CrudCategoriaService, private ruteador: Router) {}
  
  ngOnInit(): void {
    this.crudService.obtenerCategorias().subscribe(respuesta => {
      this.respuesta = respuesta;
      this.arrayCategorias = this.respuesta;
      if(this.arrayCategorias[0].id_categoria)  {   //solo si hay algun registro que se muestre. para que no salgan registros vacios
        this.categorias = this.arrayCategorias;
      }
    });
  }

  @ViewChild(MatTable) tabla1!: MatTable<Categoria>;

  //Metodos

  async borrarCategoria(id:any) {

    let confirma: boolean = false;
    
    await Swal.fire({
      title: "¿Quieres borrar esta categoria?", 
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
      let id_categoria: number = this.categorias[id].id_categoria;

      this.crudService.borrarCategoria(id_categoria);
      this.categorias.splice(id,1);
      this.tabla1.renderRows();

      this._snackBar.open('Fila borrada', 'Quitar', { duration: 3000});
    }

  }

  async registrarCategoria()  {
    
    let confirma: boolean = false;

    if(this.categoriaSelect.nombre != '' && this.categoriaSelect.marca != '' && this.categoriaSelect.pais != '')  {

      await Swal.fire({
        title: "¿Confirmar registro de categoria?", 
        showCancelButton: true, 
        confirmButtonText: "Confirmar"
      }).then((result) => {
        if(result)  {
            confirma = result.value;
            return result.value
          }
      });

      if(confirma)  {
        this.crudService.registrarCategoria(
          this.categoriaSelect.nombre.toUpperCase(),
          this.categoriaSelect.marca.toUpperCase(),
          this.categoriaSelect.pais.toUpperCase()
        )
        .pipe(first())
        .subscribe(
          () => {
        });

        this.categoriaSelect.nombre = '';
        this.categoriaSelect.marca = '';
        this.categoriaSelect.pais = '';

        setTimeout(()=> {
          window.location.reload();
        }, 100);
      }      

    } else  {

      await Swal.fire({
        title: "Rellene todos los campos", 
        showCancelButton: false, 
        confirmButtonText: "Vale"
      }).then((result) => {
        if(result)  {
            confirma = result.value;
            return result.value
          }
      });
    }
  }
  
  abrirDialog(j: number) {
    this.id_categoria = this.arrayCategorias[j].id_categoria;
    var _dialog = this.dialog.open(EditarCategoriaComponent, {
      width: '99%',
      enterAnimationDuration: '1000ms',
      exitAnimationDuration: '500ms',
      data: {
        title: 'Editar categoria',
        id_categoria: this.id_categoria,
      }
    });
  }

}