//Modelo de usuario
export class Usuario {
    public id: number;
    public nombre: string;
    public apellidos: string;
    public correo: string;
    public contrasena: string;
    public telefono: string;

    constructor(id:number, nombre:string, apellidos: string, correo:string, contrasena:string, telefono:string)   {
        this.id = id;
        this.nombre = nombre;
        this.apellidos = apellidos;
        this.correo = correo;
        this.contrasena = contrasena;
        this.telefono = telefono;
    }
}