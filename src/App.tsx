import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Categorias } from './views/Categorias';
import { Productos } from './views/Productos';
import { Consumicion } from './views/Consumicion';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/categorias" element={<Categorias />} />
        <Route path="/productos" element={<Productos />} />
        <Route path="/consumicion" element={<Consumicion />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
