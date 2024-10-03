//Modelo de pedido
export class Pedido {
    public id_pedido: number;
    public usuario: string;
    public cliente: string;
    public fecha: string;
    public total: number;
    public detalle_pedido: string;

    constructor(id_pedido:number, usuario: string, cliente:string, fecha: string, total: number, detalle_pedido: string)   {
        this.id_pedido = id_pedido;
        this.usuario = usuario;
        this.cliente = cliente;
        this.fecha = fecha;
        this.total = total;
        this.detalle_pedido = detalle_pedido;
    }
}