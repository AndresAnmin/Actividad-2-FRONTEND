import React, { useState, useEffect } from "react";
import { getDirector } from "../../services/directorService";
import { getGenero } from "../../services/generoService";
import { gettipo } from "../../services/tipoService";
import { getProductora } from "../../services/productoraService";
import { crearMedia } from "../../services/mediaService";
import Swal from "sweetalert2";

export const MediaNew = ({ handleOpenModal, listarMedia }) => {
  // Agregamos listarMedia para actualizar la lista después de guardar

  const [directorPrincipal, setDirector] = useState([]);
  const [generoPrincipal, setGenero] = useState([]);
  const [tipos, setTipo] = useState([]);
  const [productoras, setProductora] = useState([]);
  const [ valoresForm, setValoresForm ] = useState([]);
  const { serial = "", titulo = "", sinopsis = "", url = "", imagenPortada = "", añoEstreno = "", 
  genero, director, productora, tipo, } = valoresForm;

  // Listar directores
  const listarDirector = async () => {
    try {
      const { data } = await getDirector();
      setDirector(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    listarDirector();
  }, []);

  // Listar géneros
  const listarGenero = async () => {
    try {
      const { data } = await getGenero();
      setGenero(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    listarGenero();
  }, []);

  // Listar tipos
  const listarTipo = async () => {
    try {
      const { data } = await gettipo();
      setTipo(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    listarTipo();
  }, []);

  // Listar productoras
  const listarProductora = async () => {
    try {
      const { data } = await getProductora();
      setProductora(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    listarProductora();
  }, []);

  // Manejo del cambio en el formulario
  const handleOnChange = ({ target }) => {
    const { name, value } = target;
    setValoresForm({ ...valoresForm, [name]: value });
  };

  // Manejo del envío del formulario
  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const media = {serial, titulo, sinopsis, url, imagenPortada, añoEstreno,

      generoPrincipal: {
        _id: genero,
      },

      directorPrincipal: {
        _id: director,
      },

      productora: {
        _id: productora,
      },
      tipo: {
        _id: tipo,
      },
    };

    console.log(media);
    try {
      Swal.fire({
        allowOutsideClick: false,
        text: "Cargando...",
      });

      Swal.showLoading();
      const { data } = await crearMedia(media); // Guardar la media
      handleOpenModal();
      listarMedia(); // Actualizar lista
      Swal.close();

    } catch (error) {
      console.log(error);
      Swal.close();
    }
  };

  return (
    <div className='sidebar'>
      <div className='container-fluid'>
        <div className='row'>

          <div className='col'>
            <div className='sidebar-header'>
              <h3>Nueva media</h3>
              <i className="fa-solid fa-xmark" onClick={ handleOpenModal }></i>
            </div>
          </div>

          <div className='row'>
            <div className='col'></div>
            <hr />
          </div>
        </div>

        <form onSubmit={(e) => handleOnSubmit(e)}>
          <div className="row">

            <div className='col'>
              <div className="mb-3">
                <label className="form-label">Serial</label>
                <input type="text" 
                  name='serial'
                  value={serial}
                  onChange={ e => handleOnChange(e)}
                  required
                  className="form-control"/>
              </div>
            </div>

            <div className='col'>
              <div className="mb-3">
                <label className="form-label">Titulo</label>
                <input type="text" 
                name='titulo' 
                value={titulo}
                  onChange={ e => handleOnChange(e)}
                  required
                  className="form-control"
                />
              </div>
            </div>

            <div className='col'>
              <div className="mb-3">
                <label className="form-label">Sinopsis</label>
                <textarea
                  name='sinopsis'
                  value={sinopsis}
                  onChange={ e => handleOnChange(e)}
                  required
                  className="form-control"
                />
              </div>
            </div>

            <div className='col'>
              <div className="mb-3">
                <label className="form-label">Url de la pelicula</label>
                <input
                  type="url"
                  name='url'
                  value={url}
                  onChange={ e => handleOnChange(e)}
                  required
                  className="form-control"
                />
              </div>
            </div>
          </div>

          <div className='row'>
            <div className='col'>
              <div className="mb-3">
                <label className="form-label">Portada</label>
                <input
                  type="url"
                  name='imagenPortada'
                  value={imagenPortada}
                  onChange={ e => handleOnChange(e)}
                  required
                  className="form-control"
                />
              </div>
            </div>

            <div className='col'>
              <div className="mb-3">
                <label className="form-label">Año de estreno</label>
                <input
                  type="number"
                  name='añoEstreno'
                  value={añoEstreno}
                  onChange={e => handleOnChange(e)}
                  required
                  className="form-control"
                />
              </div>
            </div>

            <div className='col'>
              <div className="mb-3">
                <label className="form-label">Genero</label>
                <select
                  className="form-select"
                  required
                  name='genero'
                  value={genero}
                  onChange={e => handleOnChange(e)}
                >
                  <option value="">--SELECCIONE--</option>
                  {generoPrincipal.map(({ _id, nombre }) => {
                    return (
                      <option key={_id} value={_id}>
                        {nombre}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>
          </div>

          <div className='row'>
            <div className='col'>
              <div className="mb-3">
                <label className="form-label">Director</label>
                <select
                  className="form-select"
                  required
                  name='director'
                  value={director}
                  onChange={e => handleOnChange(e)}
                >
                  <option value="">--SELECCIONE--</option>
                  {directorPrincipal.map(({ _id, nombre }) => {
                    return (
                      <option key={_id} value={_id}>
                        {nombre}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>

            <div className='col'>
              <div className="mb-3">
                <label className="form-label">Productora</label>
                <select
                  className="form-select"
                  required
                  name='productora'
                  value={productora}
                  onChange={ e => handleOnChange(e)}
                >
                  <option value="">--SELECCIONE--</option>
                  {productoras.map(({ _id, nombre }) => {
                    return (
                      <option key={_id} value={_id}>
                        {nombre}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>

            <div className='col'>
              <div className="mb-3">
                <label className="form-label">Tipo</label>
                <select
                  className="form-select"
                  required
                  name='tipo'
                  value={tipo}
                  onChange={ e => handleOnChange(e)}
                >
                  <option value="">--SELECCIONE--</option>
                  {tipos.map(({ _id, nombre }) => {
                    return (
                      <option key={_id} value={_id}>
                        {nombre}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>
          </div>
          <div className='row'>
            <div className='col'>
              <button className="btn btn-primary">Crear Media</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
