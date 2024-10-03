//Modelo de compra
export class Compra {
    public id: number;
    public proveedor: string;
    public fecha: string;
    public total: string;
    public detalle_compra: JSON;

    constructor(id:number, proveedor:string, fecha: string, total: string, detalle_compra:JSON)   {
        this.id = id;
        this.proveedor = proveedor;
        this.fecha = fecha;
        this.total = total;
        this.detalle_compra = detalle_compra;
    }
}