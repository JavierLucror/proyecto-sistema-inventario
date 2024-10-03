//Modelo de categoria
export class Categoria {
    public id_categoria: number;
    public nombre: string;
    public marca: string;
    public pais: string;

    constructor(id_categoria:number, nombre:string, marca: string, pais:string)   {
        this.id_categoria = id_categoria;
        this.nombre = nombre;
        this.marca = marca;
        this.pais = pais;
    }
}