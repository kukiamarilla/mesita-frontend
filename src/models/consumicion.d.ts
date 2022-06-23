interface Consumicion {
  id?: number;
  estado: 'abierto' | 'cerrado';
  creado: Date;
  cerrado: Date | null;
  total: number | null;
  cliente: Cliente;
  detalleConsumiciones: Detalle[];
}
