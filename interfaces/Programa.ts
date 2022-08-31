import Horario from './Horario'
import Transmision from './Transmision';

export interface Programa {
    id: number,
    nombre: string,
    imagen: string,
    descripcion: string,
    staff: string
    horarios: Horario[],
    transmisions: Transmision[]
    liked:boolean
}