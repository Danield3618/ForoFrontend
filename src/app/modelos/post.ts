export interface Post{
    id?:number;
    name_post:string;
    id_type_post:number;
    id_usuarios_fk:number;
    data:string;
    time?:Date
}