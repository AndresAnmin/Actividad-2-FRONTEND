import React, { useState, useEffect } from 'react';
import { getDirector, crearDirector, actualizarDirector } from '../../services/directorService';
import Swal from 'sweetalert2';
const moment = require('moment');

export const DirectorView = () => {
  // Inicializamos los estados correctamente
  const [valoresForm, setValoresForm] = useState({ nombre: '', estado: '' });
  const [director, setDirector] = useState([]); // Cambiado de useEffect([]) a useState([])
  const [directorSeleccionado, setDirectorSeleccionado] = useState(null); // Cambiado de { directorSeleccionado, setDirectorSeleccionado } = useState(null)

  const listarDirector = async () => {
    try {
      Swal.fire({
        allowOutsideClick: false,
        text: 'Cargando...'
      });
      const resp = await getDirector();
      setDirector(resp.data);
      Swal.close();
    } catch (error) {
      console.log(error);
      Swal.close();
    }
  };

  useEffect(() => {
    listarDirector();
  }, []);

  const handleOnChange = (e) => {
    setValoresForm({ ...valoresForm, [e.target.name]: e.target.value });
  };

  const handleCrearDirector = async (e) => {
    e.preventDefault();
    console.log(valoresForm);
    try {
      Swal.fire({
        allowOutsideClick: false,
        text: 'Cargando...'
      });
      Swal.showLoading();

      if (directorSeleccionado) {
        await actualizarDirector(valoresForm, directorSeleccionado);
        setDirectorSeleccionado(null);
      } else {
        await crearDirector(valoresForm);
      }

      setValoresForm({ nombre: '', estado: '' });
      listarDirector();
      Swal.close();
    } catch (error) {
      console.log(error);
      Swal.close();
    }
  };

  const handleActualizarDirector = async (e, director) => {
    e.preventDefault();
    setValoresForm({ nombre: director.nombre, estado: director.estado });
    setDirectorSeleccionado(director._id);
  };

  return (
    <div className='container-fluid mt-4'>
      <form onSubmit={(e) => handleCrearDirector(e)}>
        <div className="row">
          <div className="col-lg-4">
            <div className="mb-3">
              <label className="form-label">Nombre</label>
              <input
                required
                name='nombre'
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
                name='estado'
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
        </div>
        <button className="btn btn-primary mb-3">Guardar</button>
      </form>

      <table className="table">
        <thead>
          <tr>
            <th scope='row'>#</th>
            <th scope="col">Nombre</th>
            <th scope="col">Estado</th>
            <th scope='col'>Fecha Creación</th>
            <th scope='col'>Fecha Actualización</th>
            <th scope='col'>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {director.length > 0 && director.map((director, index) => (
            <tr key={director._id}>
              <th scope='row'> {index + 1}</th>
              <td>{director.nombre}</td>
              <td>{director.estado}</td>
              <td>{moment(director.fechaCreacion).format('DD-MM-YYYY HH:mm')}</td>
              <td>{moment(director.fechaActualizacion).format('DD-MM-YYYY HH:mm')}</td>
              <td>
                <button
                  className='btn btn-success btn-sm me-2'
                  onClick={(e) => handleActualizarDirector(e, director)}
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
