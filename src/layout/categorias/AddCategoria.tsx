import React from 'react';
import './add-categoria.css';
import { CategoriasService } from '../../services/categorias.service';
import { Categoria } from '../../models/categoria';
import { Alert } from 'react-bootstrap';

interface AddCategoriaProps {
  onCreate?: (categoria: Categoria) => void;
}
export const AddCategoria = ({ onCreate }: AddCategoriaProps) => {
  const [nombre, setNombre] = React.useState('');
  const [error, setError] = React.useState('');
  const [success, setSuccess] = React.useState('');

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    CategoriasService.store({ nombre })
      .then((categoria: Categoria) => {
        if (onCreate) onCreate(categoria);
        setSuccess('Categoría creada correctamente');
        setError('');
      })
      .catch((error) => {
        setError(error.response ? error.response.data.message : error.message);
        setSuccess('');
      });
  };
  return (
    <form className="add-categoria-form">
      <div className="form-group">
        <label className="control-label">Nombre:</label>
        <input
          type="text"
          className="form-control"
          onChange={(e) => setNombre(e.target.value)}
        />
      </div>
      <div className="form-group">
        <button className="btn btn-primary" onClick={handleSend}>
          Agregar
        </button>
      </div>
      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}
    </form>
  );
};
