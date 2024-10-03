//Modelo de inventario
export class Inventario {
    public id_producto: number;
    public descripcion: string;
    public categoria: string;
    public stock_inicial: number;
    public entradas: number;
    public salidas: number;
    public stock_real: number;

    constructor(id_producto:number, descripcion:string, categoria:string, stock_inicial:number, entradas:number, salidas:number, stock_real:number)   {
        this.id_producto = id_producto;
        this.descripcion = descripcion;
        this.categoria = categoria;
        this.stock_inicial = stock_inicial;
        this.entradas = entradas;
        this.salidas = salidas;
        this.stock_real = stock_real;
    }
}