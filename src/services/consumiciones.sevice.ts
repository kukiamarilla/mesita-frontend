import api from './api';

interface ConsumicionRequest {
  cliente: number;
  mesa?: number;
}

export const ConsumicionesService = {
  store: async (data: ConsumicionRequest): Promise<Consumicion> => {
    return await api()
      .post<Consumicion>('/consumiciones', data)
      .then((res) => res.data);
  },
  update: async (
    id: number,
    data: ConsumicionRequest
  ): Promise<Consumicion> => {
    return await api()
      .put<Consumicion>(`/consumiciones/${id}`, data)
      .then((res) => res.data);
  },
  cerrar: async (id: number): Promise<Consumicion> => {
    return await api()
      .post<Consumicion>(`/consumiciones/${id}/cerrar`, {})
      .then((res) => res.data);
  },
};
