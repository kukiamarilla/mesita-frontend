import React, { useEffect, useState } from 'react';
import { AddCategoria } from '../layout/categorias/AddCategoria';
import './categorias.css';
import { CategoriasList } from '../layout/categorias/CategoriasList';
import { Categoria } from '../models/categoria';
import { CategoriasService } from '../services/categorias.service';
import { EditCategoria } from '../layout/categorias/EditCategoria';

export const Categorias = () => {
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [editing, setEditing] = useState<Categoria | null>(null);

  useEffect(() => {
    const getCategorias = async () => {
      const categorias = await CategoriasService.all();
      setCategorias(categorias);
    };
    getCategorias();
  }, []);

  const handleCreate = (categoria: Categoria) => {
    setCategorias([...categorias, categoria]);
  };

  const handleDelete = (categoria: Categoria) => {
    if (categoria.id)
      CategoriasService.delete(categoria.id).then(() => {
        setCategorias(categorias.filter((c) => c.id !== categoria.id));
      });
  };

  const handleEdit = (categoria: Categoria) => {
    setEditing(categoria);
  };

  const handleUpdate = (categoria: Categoria) => {
    setCategorias(
      categorias.map((el) => (el.id === categoria.id ? categoria : el))
    );
  };
  return (
    <div className="container">
      <h1>Categorías</h1>
      <AddCategoria onCreate={handleCreate} />
      <CategoriasList
        categorias={categorias}
        onDelete={handleDelete}
        onEdit={handleEdit}
      />
      {editing && (
        <EditCategoria
          categoria={editing}
          onCancel={() => setEditing(null)}
          onSave={handleUpdate}
        />
      )}
    </div>
  );
};
