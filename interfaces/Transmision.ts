import { Tag } from "./Tag";

export default interface Transmision {
    id: number;
    imagen: string;
    titulo: string;
    descripcion: string;
    tipo: string;
    spotify: string;
    youtube: string;
    categoria: string;
    programa: string;
    idPrograma: number;
    fecha: string;
    tipoId: number;
    listaTags: Tag[];
}
