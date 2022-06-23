import api from './api';

interface DetalleRequest {
  producto: number;
  cantidad: number;
  consumicion: number;
}
export const DetallesService = {
  store: async (data: DetalleRequest): Promise<any> => {
    return await api()
      .post<Detalle>('/detalle-consumiciones', data)
      .then((res) => res.data);
  },
};
