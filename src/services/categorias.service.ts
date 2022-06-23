import api from './api';
import { Categoria } from '../models/categoria';

export const CategoriasService = {
  all: async (): Promise<Categoria[]> => {
    return await api()
      .get<Categoria[]>('/categorias')
      .then((res) => res.data);
  },
  get: async (id: number): Promise<Categoria> => {
    return await api()
      .get<Categoria>(`/categorias/${id}`)
      .then((res) => res.data);
  },
  store: async (data: Categoria): Promise<Categoria> => {
    return await api()
      .post<Categoria>('/categorias', data)
      .then((res) => res.data);
  },
  update: async (id: number, data: Categoria): Promise<Categoria> => {
    return await api()
      .put<Categoria>(`/categorias/${id}`, data)
      .then((res) => res.data);
  },
  delete: async (id: number) => {
    return await api()
      .delete<Categoria>(`/categorias/${id}`)
      .then((res) => res.data);
  },
};
