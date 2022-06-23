import React, { useEffect, useState } from 'react';
import { Producto } from '../models/producto';
import './productos.css';
import { ProductoService } from '../services/productos.service';
import { ProductosList } from '../layout/productos/ProductosList';
import { AddProducto } from '../layout/productos/AddProductos';
import { EditProducto } from '../layout/productos/EditProducto';
import { CategoriasService } from '../services/categorias.service';
import { Categoria } from '../models/categoria';

export const Productos = () => {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [editing, setEditing] = useState<Producto | null>(null);

  useEffect(() => {
    const getProductos = async () => {
      const productos = await ProductoService.all();
      setProductos(productos);
    };
    const getCategorias = async () => {
      const categorias = await CategoriasService.all();
      setCategorias(categorias);
    };
    getProductos();
    getCategorias();
  }, []);

  const handleCreate = (producto: Producto) => {
    const categoria = categorias.find((el) => el.id === producto.categoria);
    if (categoria) producto.categoria = categoria;
    setProductos([...productos, producto]);
  };

  const handleDelete = (producto: Producto) => {
    if (producto.id)
      ProductoService.delete(producto.id).then(() => {
        setProductos(productos.filter((c) => c.id !== producto.id));
      });
  };

  const handleEdit = (producto: Producto) => {
    setEditing(producto);
  };

  const handleUpdate = (producto: Producto) => {
    const categoria = categorias.find((el) => el.id === producto.categoria);
    if (categoria) producto.categoria = categoria;
    setProductos(
      productos.map((el) => (el.id === producto.id ? producto : el))
    );
  };
  return (
    <div className="container">
      <h1>Productos</h1>
      <AddProducto categorias={categorias} onCreate={handleCreate} />
      <ProductosList
        productos={productos}
        onDelete={handleDelete}
        onEdit={handleEdit}
      />
      {editing && (
        <EditProducto
          categorias={categorias}
          producto={editing}
          onCancel={() => setEditing(null)}
          onSave={handleUpdate}
        />
      )}
    </div>
  );
};
