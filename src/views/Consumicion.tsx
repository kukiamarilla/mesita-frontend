import React, { useEffect, useRef, useState } from 'react';
import './consumicion.css';
import { Restaurante } from '../models/restaurante';
import { RestaurantesService } from '../services/restaurantes.service';
import { MesasService } from '../services/mesas.service';
import { Button, Modal, Table } from 'react-bootstrap';
import { Producto } from '../models/producto';
import { ProductoService } from '../services/productos.service';
import { DetallesService } from '../services/detalles.service';
import { ClientesService } from '../services/clientes.service';
import { ConsumicionesService } from '../services/consumiciones.sevice';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export const Consumicion = () => {
  const [restaurantes, setRestaurantes] = useState<Restaurante[]>([]);
  const [restaurante, setRestaurante] = useState<Restaurante | null>(null);
  const [mesa, setMesa] = useState<number>(0);
  const [consumicion, setConsumicion] = useState<Consumicion | null>(null);
  const [productos, setProductos] = useState<Producto[]>([]);
  const [agregar, setAgregar] = useState<boolean>(false);
  const [producto, setProducto] = useState<number>(0);
  const [cantidad, setCantidad] = useState<number>(0);
  const [abrir, setAbrir] = useState<boolean>(false);
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [cliente, setCliente] = useState<number>(0);
  const [cambiarCliente, setCambiarCliente] = useState<boolean>(false);

  const reportRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const getRestaurantes = async () => {
      const restaurantes = await RestaurantesService.all();
      setRestaurantes(restaurantes);
    };
    getRestaurantes();
  }, []);

  useEffect(() => {
    const getConsumicion = async () => {
      if (mesa !== 0) {
        const consumicion = await MesasService.consumicion(mesa);
        setConsumicion(consumicion.consumicion);
      }
    };

    getConsumicion();
  }, [mesa]);

  useEffect(() => {
    const getProductos = async () => {
      const productos = await ProductoService.all();
      setProductos(productos);
    };
    getProductos();
  }, []);

  useEffect(() => {
    const getClientes = async () => {
      const clientes = await ClientesService.all();
      setClientes(clientes);
    };
    getClientes();
  }, []);

  const agregarProducto = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (producto && cantidad) {
      await DetallesService.store({
        producto,
        cantidad,
        consumicion: (consumicion as Consumicion).id as number,
      });
      const cons = await MesasService.consumicion(mesa);
      setConsumicion(cons.consumicion);
      setAgregar(false);
    }
  };

  const abrirPedido = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (cliente) {
      await ConsumicionesService.store({ cliente, mesa });
      const cons = await MesasService.consumicion(mesa);
      setConsumicion(cons.consumicion);
      setAbrir(false);
    }
  };

  const sendCambiarCliente = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (cliente && consumicion && consumicion.id) {
      await ConsumicionesService.update(consumicion.id, { cliente });
      const cons = await MesasService.consumicion(mesa);
      setConsumicion(cons.consumicion);
      setCambiarCliente(false);
    }
  };

  const cerrarPedido = async (e: React.MouseEvent) => {
    e.preventDefault();
    const element = reportRef.current;
    const canvas = await html2canvas(element as HTMLElement);
    const data = canvas.toDataURL('image/png');

    const pdf = new jsPDF();
    const imgProperties = pdf.getImageProperties(data);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProperties.height * pdfWidth) / imgProperties.width;
    if (consumicion && consumicion.id) {
      await ConsumicionesService.cerrar(consumicion.id);
      const cons = await MesasService.consumicion(mesa);
      setConsumicion(cons.consumicion);
    }

    pdf.addImage(data, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save('ticket.pdf');
  };

  return (
    <div className="container">
      <h1>Consumición</h1>
      <form>
        <div className="form-group">
          <label className="control-label">Restaurante:</label>
          <select
            className="form-control"
            onChange={(e) =>
              setRestaurante(
                restaurantes.find(
                  (el) => el.id === Number(e.target.value)
                ) as Restaurante
              )
            }
          >
            <option value={0}>Seleccione un restaurante</option>
            {restaurantes.map((restaurante) => (
              <option key={restaurante.id} value={restaurante.id}>
                {restaurante.nombre}
              </option>
            ))}
          </select>
        </div>
        {restaurante && (
          <div className="form-group">
            <label className="control-label">Mesa:</label>
            <select
              className="form-control"
              onChange={(e) => setMesa(Number(e.target.value))}
            >
              <option value={0}>Seleccione una Mesa</option>
              {restaurante.mesas.map((mesa) => (
                <option key={mesa.id} value={mesa.id}>
                  {mesa.nombre}
                </option>
              ))}
            </select>
          </div>
        )}
      </form>
      {mesa != 0 && !consumicion && (
        <div className="consumicion">
          <Button variant="success" onClick={() => setAbrir(true)}>
            Abrir Pedido
          </Button>
          <Modal show={abrir} onHide={() => setAbrir(false)}>
            <Modal.Header closeButton>
              <Modal.Title>Abrir Pedido</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="form-group">
                <label className="control-label">Cliente:</label>
                <select
                  className="form-control"
                  onChange={(e) => setCliente(Number(e.target.value))}
                >
                  <option value={0}>Seleccione un Cliente</option>
                  {clientes.map((cliente) => (
                    <option key={cliente.id} value={cliente.id}>
                      {cliente.nombre + ' ' + cliente.apellido}
                    </option>
                  ))}
                </select>
              </div>
              <br />
              <div className="form-group">
                <Button variant="primary" onClick={abrirPedido}>
                  Abrir Pedido
                </Button>
              </div>
            </Modal.Body>
          </Modal>
        </div>
      )}
      {mesa != 0 && consumicion && (
        <div className="consumicion">
          <div className="report" ref={reportRef}>
            <p>
              <b>Cliente: </b>{' '}
              {consumicion.cliente.nombre + ' ' + consumicion.cliente.apellido}
            </p>
            <p>
              <b>Fecha: </b> {consumicion.creado.toString().substring(0, 10)}
            </p>
            <Table>
              <thead>
                <tr>
                  <th>Cantidad</th>
                  <th>Producto</th>
                  <th>Precio</th>
                  <th>Subtotal</th>
                </tr>
              </thead>
              <tbody>
                {consumicion.detalleConsumiciones.map((detalle) => (
                  <tr key={detalle.id}>
                    <td>{detalle.cantidad}</td>
                    <td>{detalle.producto.nombre}</td>
                    <td>{detalle.producto.precio}</td>
                    <td>{detalle.cantidad * detalle.producto.precio}</td>
                  </tr>
                ))}
                <tr>
                  <td colSpan={3} className="text-right">
                    <b>Total:</b>
                  </td>
                  <td>
                    {consumicion.detalleConsumiciones.reduce(
                      (total, detalle) =>
                        total + detalle.cantidad * detalle.producto.precio,
                      0
                    )}
                  </td>
                </tr>
              </tbody>
            </Table>
          </div>
          <Button variant="primary" onClick={() => setCambiarCliente(true)}>
            Cambiar Cliente
          </Button>
          &nbsp;
          <Button variant="primary" onClick={() => setAgregar(true)}>
            Agregar Producto
          </Button>
          &nbsp;
          <Button variant="danger" onClick={cerrarPedido}>
            Cerrar Pedido
          </Button>
          <Modal show={agregar} onHide={() => setAgregar(false)}>
            <Modal.Header closeButton>
              <Modal.Title>Agregar Producto</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <form>
                <div className="form-group">
                  <label className="control-label">Producto:</label>
                  <select
                    className="form-control"
                    onChange={(e) => setProducto(Number(e.target.value))}
                  >
                    <option value={0}>Seleccione un producto</option>
                    {productos.map((producto) => (
                      <option key={producto.id} value={producto.id}>
                        {producto.nombre}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label className="control-label">Cantidad:</label>
                  <input
                    className="form-control"
                    type="number"
                    onChange={(e) => setCantidad(Number(e.target.value))}
                  />
                </div>
                <div className="form-group">
                  <Button variant="primary" onClick={agregarProducto}>
                    Agregar
                  </Button>
                </div>
              </form>
            </Modal.Body>
          </Modal>
          <Modal show={cambiarCliente} onHide={() => setCambiarCliente(false)}>
            <Modal.Header closeButton>
              <Modal.Title>Cambiar Cliente</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="form-group">
                <label className="control-label">Cliente:</label>
                <select
                  className="form-control"
                  onChange={(e) => setCliente(Number(e.target.value))}
                >
                  <option value={0}>Seleccione un Cliente</option>
                  {clientes.map((cliente) => (
                    <option key={cliente.id} value={cliente.id}>
                      {cliente.nombre + ' ' + cliente.apellido}
                    </option>
                  ))}
                </select>
              </div>
              <br />
              <div className="form-group">
                <Button variant="primary" onClick={sendCambiarCliente}>
                  Cambiar
                </Button>
              </div>
            </Modal.Body>
          </Modal>
        </div>
      )}
    </div>
  );
};
