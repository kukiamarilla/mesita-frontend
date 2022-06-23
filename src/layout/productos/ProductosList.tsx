import React from 'react';
import { Button, Table } from 'react-bootstrap';
import { Producto } from '../../models/producto';
import { Categoria } from '../../models/categoria';

interface ProductosListProps {
  productos: Producto[];
  onDelete?: (producto: Producto) => void;
  onEdit?: (producto: Producto) => void;
}

export const ProductosList = ({
  productos,
  onDelete,
  onEdit,
}: ProductosListProps) => {
  return (
    <Table>
      <thead>
        <tr>
          <th>Id</th>
          <th>Nombre</th>
          <th>Categoria</th>
          <th>Precio</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {productos.map((producto: Producto) => (
          <tr key={producto.id}>
            <td>{producto.id}</td>
            <td>{producto.nombre}</td>
            <td>{(producto.categoria as Categoria).nombre}</td>
            <td>{producto.precio} Gs.</td>
            <td>
              <Button
                variant="primary"
                onClick={() => onEdit && onEdit(producto)}
              >
                Editar
              </Button>
              &nbsp;
              <Button
                variant="danger"
                onClick={() => onDelete && onDelete(producto)}
              >
                Eliminar
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};
