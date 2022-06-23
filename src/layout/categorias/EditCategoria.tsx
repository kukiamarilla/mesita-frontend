import React from 'react';
import { Alert, Modal } from 'react-bootstrap';
import { Categoria } from '../../models/categoria';
import { CategoriasService } from '../../services/categorias.service';

interface EditCategoriaProps {
  categoria: Categoria;
  onSave?: (categoria: Categoria) => void;
  onCancel?: () => void;
}
export const EditCategoria = ({
  categoria,
  onSave,
  onCancel,
}: EditCategoriaProps) => {
  const [nombre, setNombre] = React.useState(categoria.nombre);
  const [error, setError] = React.useState('');

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (categoria.id)
      CategoriasService.update(categoria.id, { nombre })
        .then((categoria: Categoria) => {
          if (onSave) onSave(categoria);
          setError('');
          onCancel && onCancel();
        })
        .catch((error) => {
          setError(
            error.response ? error.response.data.message : error.message
          );
        });
  };

  return (
    <Modal show={!!categoria} onHide={onCancel}>
      <Modal.Header closeButton>
        <Modal.Title>Editar Categoría: {categoria.id}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form className="edit-categoria-form">
          <div className="form-group">
            <label className="control-label">Nombre:</label>
            <input
              type="text"
              className="form-control"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
            />
          </div>
          <div className="form-group">
            <button className="btn btn-primary" onClick={handleSend}>
              Guardar
            </button>
          </div>
          {error && <Alert variant="danger">{error}</Alert>}
        </form>
      </Modal.Body>
    </Modal>
  );
};
