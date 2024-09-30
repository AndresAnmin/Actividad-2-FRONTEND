import React, { useState, useEffect } from "react";
import {
  getGenero,
  crearGenero,
  actualizarGenero,
} from "../../services/generoService";
import Swal from "sweetalert2";
const moment = require("moment");

export const GeneroView = () => {
  // Inicializamos los estados
  const [valoresForm, setValoresForm] = useState({
    nombre: "",
    estado: "",
    descripcion: "",
  });
  const [generos, setGeneros] = useState([]);
  const [generoSeleccionado, setGeneroSeleccionado] = useState(null);

  const listarGeneros = async () => {
    try {
      Swal.fire({
        allowOutsideClick: false,
        text: "Cargando...",
      });
      const resp = await getGenero();
      setGeneros(resp.data);
      Swal.close();
    } catch (error) {
      console.log(error);
      Swal.close();
    }
  };

  useEffect(() => {
    listarGeneros();
  }, []);

  const handleOnChange = (e) => {
    setValoresForm({ ...valoresForm, [e.target.name]: e.target.value });
  };

  const handleCrearGenero = async (e) => {
    e.preventDefault();
    try {
      Swal.fire({
        allowOutsideClick: false,
        text: "Cargando...",
      });
      Swal.showLoading();

      if (generoSeleccionado) {
        await actualizarGenero(valoresForm, generoSeleccionado);
        setGeneroSeleccionado(null);
      } else {
        await crearGenero(valoresForm);
      }

      setValoresForm({ nombre: "", estado: "", descripcion: "" });
      listarGeneros();
      Swal.close();
    } catch (error) {
      console.log(error);
      Swal.close();
    }
  };

  const handleActualizarGenero = async (e, genero) => {
    e.preventDefault();
    setValoresForm({
      nombre: genero.nombre,
      estado: genero.estado,
      descripcion: genero.descripcion,
    });
    setGeneroSeleccionado(genero._id);
  };

  return (
    <div className="container-fluid mt-4">
      <form onSubmit={(e) => handleCrearGenero(e)}>
        <div className="row">
          <div className="col-lg-4">
            <div className="mb-3">
              <label className="form-label">Nombre</label>
              <input
                required
                name="nombre"
                value={valoresForm.nombre}
                type="text"
                className="form-control"
                onChange={(e) => handleOnChange(e)}
              />
            </div>
          </div>
          <div className="col-lg-4">
            <div className="mb-3">
              <label className="form-label">Estado</label>
              <select
                required
                name="estado"
                value={valoresForm.estado}
                className="form-select"
                onChange={(e) => handleOnChange(e)}
              >
                <option value="">--SELECCIONE--</option>
                <option value="Activo">Activo</option>
                <option value="Inactivo">Inactivo</option>
              </select>
            </div>
          </div>
          <div className="col-lg-4">
            <div className="mb-3">
              <label className="form-label">Descripción</label>
              <textarea
                name="descripcion"
                value={valoresForm.descripcion}
                className="form-control"
                onChange={(e) => handleOnChange(e)}
              />
            </div>
          </div>
        </div>
        <button className="btn btn-primary mb-3">Guardar</button>
      </form>

      <table className="table">
        <thead>
          <tr>
            <th scope="row">#</th>
            <th scope="col">Nombre</th>
            <th scope="col">Estado</th>
            <th scope="col">Fecha Creación</th>
            <th scope="col">Fecha Actualización</th>
            <th scope="col">Descripción</th>
            <th scope="col">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {generos.length > 0 &&
            generos.map((genero, index) => (
              <tr key={genero._id}>
                <th scope="row"> {index + 1}</th>
                <td>{genero.nombre}</td>
                <td>{genero.estado}</td>
                <td>
                  {moment(genero.fechaCreacion).format("DD-MM-YYYY HH:mm")}
                </td>
                <td>
                  {moment(genero.fechaActualizacion).format("DD-MM-YYYY HH:mm")}
                </td>
                <td>{genero.descripcion}</td>
                <td>
                  <button
                    className="btn btn-success btn-sm me-2"
                    onClick={(e) => handleActualizarGenero(e, genero)}
                  >
                    Actualizar
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};
