import React from 'react';
import { Button, Table } from 'react-bootstrap';
import { Categoria } from '../../models/categoria';

interface CategoriasListProps {
  categorias: Categoria[];
  onDelete?: (categoria: Categoria) => void;
  onEdit?: (categoria: Categoria) => void;
}

export const CategoriasList = ({
  categorias,
  onDelete,
  onEdit,
}: CategoriasListProps) => {
  return (
    <Table>
      <thead>
        <tr>
          <th>Id</th>
          <th>Nombre</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {categorias.map((categoria: Categoria) => (
          <tr key={categoria.id}>
            <td>{categoria.id}</td>
            <td>{categoria.nombre}</td>
            <td>
              <Button
                variant="primary"
                onClick={() => onEdit && onEdit(categoria)}
              >
                Editar
              </Button>
              &nbsp;
              <Button
                variant="danger"
                onClick={() => onDelete && onDelete(categoria)}
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
