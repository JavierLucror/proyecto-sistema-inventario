import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CrudCategoriaService } from '../../../servicies/crud-categoria.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-editar-categoria',
  templateUrl: './editar-categoria.component.html',
  styleUrl: './editar-categoria.component.scss'
})
export class EditarCategoriaComponent implements OnInit {

  //Variables
  inputdata: any;
  categorias: any;
  columnasDialog: string[] = ['nombre', 'marca', 'pais'];
  formularioDeCategorias:FormGroup;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private crudService: CrudCategoriaService, private ref: MatDialogRef<EditarCategoriaComponent>, public formulario:FormBuilder, private ruteador:Router) {
    
    //Recoger categoria a editar
    this.crudService.obtenerCategoria(this.data.id_categoria).subscribe(respuesta=>{
      this.categorias = respuesta[0];
      this.formularioDeCategorias.setValue({
        nombre:this.categorias.nombre,
        marca:this.categorias.marca,
        pais:this.categorias.pais
      });
    });

    //Nuevo registro a actualizar
    this.formularioDeCategorias = this.formulario.group({
      nombre:[''],
      marca:[''],
      pais:['']
    });
  }

  ngOnInit(): void {
    this.inputdata = this.data;
  }

  cerrarDialog()  {
    this.ref.close();
  }

  async enviarDatos() {
    this.ruteador.navigateByUrl('/categorias');
    await this.crudService.editarCategoria(this.data.id_categoria, this.formularioDeCategorias.value);
    setTimeout(() => {
      window.location.reload();
    }, 500);
  }

}