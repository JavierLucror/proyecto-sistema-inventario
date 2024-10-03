//Modelo de producto
export class Producto {
    public id_producto: number;
    public descripcion: string;
    public categoria: string;
    public precio: number;
    public cantidad: number;
    public total_producto: number; 

    constructor(id_producto:number, descripcion:string, categoria:string, precio:number, cantidad:number)   {
        this.id_producto = id_producto;
        this.descripcion = descripcion;
        this.categoria = categoria;
        this.precio = precio;
        this.cantidad = cantidad;
        this.total_producto = precio * cantidad;
    }
}