import { Categoria } from './categoria';

export interface Mesa {
  id?: number;
  nombre: string;
  x: number;
  y: number;
  piso: number;
  capacidad: number;
  restaurante: number;
}
