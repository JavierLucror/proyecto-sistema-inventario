//Modelo de venta
export class Venta {
    public id_venta: number;
    public usuario: string;
    public cliente: string;
    public fecha: string;
    public total: number;
    public detalle_venta: string;

    constructor(id_venta:number, usuario: string, cliente:string, fecha: string, total: number, detalle_venta: string)   {
        this.id_venta = id_venta;
        this.usuario = usuario;
        this.cliente = cliente;
        this.fecha = fecha;
        this.total = total;
        this.detalle_venta = detalle_venta;
    }
}