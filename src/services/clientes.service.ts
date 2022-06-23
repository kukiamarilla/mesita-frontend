import api from './api';

export const ClientesService = {
  all: async (): Promise<Cliente[]> => {
    return await api()
      .get<Cliente[]>('/clientes')
      .then((res) => res.data);
  },
};
