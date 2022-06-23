import api from './api';

export interface ConsumicionResponse {
  abierta: boolean;
  consumicion: Consumicion;
}

export const MesasService = {
  consumicion: async (id: number): Promise<ConsumicionResponse> => {
    return await api()
      .get<ConsumicionResponse>(`/mesas/${id}/consumicion`)
      .then((res) => res.data);
  },
};
