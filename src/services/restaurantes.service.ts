import { Restaurante } from '../models/restaurante';
import api from './api';

export const RestaurantesService = {
  all: async (): Promise<Restaurante[]> => {
    return await api()
      .get<Restaurante[]>('/restaurantes')
      .then((res) => res.data);
  },
};
