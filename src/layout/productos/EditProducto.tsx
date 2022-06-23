import React from 'react';
import { Alert, Modal } from 'react-bootstrap';
import { Producto } from '../../models/producto';
import { ProductoService } from '../../services/productos.service';
import { Categoria } from '../../models/categoria';

interface EditProductoProps {
  producto: Producto;
  categorias: Categoria[];
  onSave?: (producto: Producto) => void;
  onCancel?: () => void;
}
export const EditProducto = ({
  producto,
  categorias,
  onSave,
  onCancel,
}: EditProductoProps) => {
  const [nombre, setNombre] = React.useState(producto.nombre);
  const [categoria, setCategoria] = React.useState(
    (producto.categoria as Categoria).id as number
  );
  const [precio, setPrecio] = React.useState(producto.precio);
  const [error, setError] = React.useState('');

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (producto.id)
      ProductoService.update(producto.id, { nombre, categoria, precio })
        .then((producto: Producto) => {
          if (onSave) onSave(producto);
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
    <Modal show={!!producto} onHide={onCancel}>
      <Modal.Header closeButton>
        <Modal.Title>Editar Categoría: {producto.id}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form className="edit-producto-form">
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
            <label className="control-label">Categoria:</label>
            <select
              className="form-control"
              onChange={(e) => setCategoria(Number(e.target.value))}
            >
              <option value={0}>Seleccione una categoria</option>
              {categorias.map((cat) => (
                <option
                  key={cat.id}
                  value={cat.id}
                  selected={cat.id == categoria}
                >
                  {cat.nombre}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label className="control-label">Precio:</label>
            <input
              type="number"
              className="form-control"
              value={precio}
              onChange={(e) => setPrecio(Number(e.target.value))}
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
