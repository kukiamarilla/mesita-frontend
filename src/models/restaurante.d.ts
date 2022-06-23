import { Categoria } from './categoria';
import { Mesa } from './mesa';

export interface Restaurante {
  id?: number;
  nombre: string;
  direccion: string;
  mesas: Mesa[];
}
