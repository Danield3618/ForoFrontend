export interface usuario{
    PrimerNombre:string;
    SegundoNombre?:string;
    PrimerApellido:string;
    SegundoApellido?:string;
    Correo:string;
    Apodo:string;
    Password:string;
    ImagenPerfil:string;
    Celular?:number;
    IdTipoPersonaFK:number;
    IdRangoFK:number;
    IdConfiguracionFK:number;
    Descripcion:string;
}