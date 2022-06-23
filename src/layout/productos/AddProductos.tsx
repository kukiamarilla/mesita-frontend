import React from 'react';
import './add-producto.css';
import { Alert } from 'react-bootstrap';
import { Producto } from '../../models/producto.d';
import { ProductoService } from '../../services/productos.service';
import { Categoria } from '../../models/categoria';

interface AddProductoProps {
  categorias: Categoria[];
  onCreate?: (Producto: Producto) => void;
}
export const AddProducto = ({ categorias, onCreate }: AddProductoProps) => {
  const [nombre, setNombre] = React.useState('');
  const [categoria, setCategoria] = React.useState(0);
  const [precio, setPrecio] = React.useState(0);
  const [error, setError] = React.useState('');
  const [success, setSuccess] = React.useState('');

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    ProductoService.store({ nombre, categoria, precio })
      .then((Producto: Producto) => {
        if (onCreate) onCreate(Producto);
        setSuccess('Categoría creada correctamente');
        setError('');
      })
      .catch((error) => {
        setError(error.response ? error.response.data.message : error.message);
        setSuccess('');
      });
  };
  return (
    <form className="add-Producto-form">
      <div className="form-group">
        <label className="control-label">Nombre:</label>
        <input
          type="text"
          className="form-control"
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
          {categorias.map((categoria) => (
            <option key={categoria.id} value={categoria.id}>
              {categoria.nombre}
            </option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label className="control-label">Precio:</label>
        <input
          type="number"
          className="form-control"
          onChange={(e) => setPrecio(Number(e.target.value))}
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
