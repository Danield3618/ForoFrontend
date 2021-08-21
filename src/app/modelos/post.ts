export interface Post{
    IdUsuarioFK:number;
    FechaPublicacion?:Date
    FechaEdicion?:Date
    IdImagenFK?:number;
    IdTemaFK:number;
    TituloPublicacion:string;
    CuerpoPublicacion:string;
}