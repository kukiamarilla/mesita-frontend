import { Producto } from '../models/producto';
import api from './api';

export const ProductoService = {
  all: async (): Promise<Producto[]> => {
    return await api()
      .get<Producto[]>('/productos')
      .then((res) => res.data);
  },
  get: async (id: number): Promise<Producto> => {
    return await api()
      .get<Producto>(`/productos/${id}`)
      .then((res) => res.data);
  },
  store: async (data: Producto): Promise<Producto> => {
    return await api()
      .post<Producto>('/productos', data)
      .then((res) => res.data);
  },
  update: async (id: number, data: Producto): Promise<Producto> => {
    return await api()
      .put<Producto>(`/productos/${id}`, data)
      .then((res) => res.data);
  },
  delete: async (id: number) => {
    return await api()
      .delete<Producto>(`/productos/${id}`)
      .then((res) => res.data);
  },
};
