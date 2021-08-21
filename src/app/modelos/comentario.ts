export interface Comentario{
    IdComentarioFK?:number;
    FechaPublicacion?:Date
    FechaEdicion?:Date
    IdCalificacionFK?:number;
    IdUsuarioFk:number;
    IdPublicacionFk:number;
    IdImagenFK:number;
    CuerpoComentario:string;
}