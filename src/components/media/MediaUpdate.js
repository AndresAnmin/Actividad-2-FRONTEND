import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getMediaPorId, actualizarMedia } from "../../services/mediaService";
import { getDirector } from "../../services/directorService";
import { getGenero } from "../../services/generoService";
import { gettipo } from "../../services/tipoService";
import { getProductora } from "../../services/productoraService";
import Swal from "sweetalert2";

export const MediaUpdate = () => {
  const { mediaId = '' } = useParams();
  const [media, setMedia] = useState();
  const [directores, setDirectores] = useState([]);
  const [generos, setGeneros] = useState([]);
  const [tipos, setTipos] = useState([]);
  const [productoras, setProductoras] = useState([]);
  const [valoresForm, setValoresForm] = useState([]);

  const {
    serial = '',
    titulo = '',
    sinopsis = '',
    url = '',
    imagenPortada = '',
    añoEstreno = '',
    genero,
    director,
    productora,
    tipo
  } = valoresForm;


  const listarDirectores = async () => {
    try {
      const { data } = await getDirector();
      setDirectores(data);

    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    listarDirectores();
  }, []);


  const listarGeneros = async () => {
    try {
      const { data } = await getGenero();
      setGeneros(data);

    } catch (error) {
      console.log(error);

    }
  }

  useEffect(() => {
    listarGeneros();
  }, []);

  
  const listarTipos = async () => {
    try {
      const { data } = await gettipo();
      setTipos(data);

    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    listarTipos();
  }, []);

  
  const listarProductoras = async () => {
    try {
      const { data } = await getProductora();
      setProductoras(data);

    } catch (error) {
      console.log(error);

    }
  }

  useEffect(() => {
    listarProductoras();
  }, []);

  
  const getMedia = async () => {
    try {
      Swal.fire({
        allowOutsideClick: false,
        text: "Cargando...",
      });
      Swal.showLoading();
      const { data } = await getMediaPorId(mediaId);
      console.log(data);
      setMedia(data);
      Swal.close();
    } catch (error) {
      console.log(error);
      Swal.close();
    }
  }

  useEffect(() => {
    getMedia();
  }, [mediaId]);


  useEffect(() => {
    if (media) {
      setValoresForm({
        serial: media.serial,
        titulo: media.titulo,
        sinopsis: media.sinopsis,
        url: media.url,
        imagenPortada: media.imagenPortada,
        añoEstreno: media.añoEstreno,
        genero: media.generoPrincipal._id,
        director: media.directorPrincipal._id,
        productora: media.productora._id,
        tipo: media.tipo._id
      });
    }
  }, [media]);  

  const handleOnChange = ({ target }) => {
    const { name, value } = target;
    setValoresForm({ ...valoresForm, [name]: value });
  }

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    const mediaActualizada = {
      serial,
      titulo,
      sinopsis,
      url,
      imagenPortada,
      añoEstreno,

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
      }
    }

    console.log(mediaActualizada);
    try {
      Swal.fire({
        allowOutsideClick: false,
        text: 'Cargando...',
      });
      Swal.showLoading();
      await actualizarMedia(mediaId, mediaActualizada);
      Swal.close();

    } catch (error) {
      console.log(error);
      Swal.close();
      let mensaje;
      if (error && error.response && error.response.data) {
        mensaje = error.response.data;
      } else {
        mensaje = "Ocurrió un error, por favor intente de nuevo";
      }
      Swal.fire('Error', mensaje, 'error');
    }
  }

  return (
    <div className='container-fluid mt-3 mb-2'>
      <div className='card'>
        <div className='card-header'>
          <h5 className='card-title'>Detalle Media</h5>
        </div>

        <div className='card-body'>

          <div className='row'>

            <div className='col-md-4'>
              <img src={media?.imagenPortada} alt="Portada de la pelicula" />
            </div>
            <div className='col-md-8'>
              <form onSubmit={(e) => handleOnSubmit(e)}>
                <div className='row'>

                  <div className='col'>
                    <div className="mb-3">
                      <label className="form-label">Serial</label>
                      <input
                        type="text"
                        name='serial'
                        value={serial}
                        onChange={(e) => handleOnChange(e)}
                        required
                        className='form-control'
                      />
                    </div>
                  </div>

                  <div className='col'>
                    <div className="mb-3">
                      <label className="form-label">Titulo</label>
                      <input
                        type="text"
                        name='titulo'
                        value={titulo}
                        onChange={(e) => handleOnChange(e)}
                        required
                        className="form-control"
                      />
                    </div>
                  </div>

                  <div className="col">
                    <div className="mb-3">
                      <label className="form-label">Sinopsis</label>
                      <textarea
                        name='sinopsis'
                        value={sinopsis}
                        onChange={(e) => handleOnChange(e)}
                        required
                        className="form-control"
                      />
                    </div>
                  </div>

                  <div className='col'>
                    <div className='mb-3'>
                      <label className="form-label">URL de la pelicula </label>
                      <input
                        type="text"
                        name='url'
                        value={url}
                        onChange={(e) => handleOnChange(e)}
                        required
                        className="form-control"
                      />
                    </div>
                  </div>
                </div>

                <div className='row'>

                  <div className="col">
                    <div className="mb-3">
                      <label className="form-label">Portada </label>
                      <input
                        type="text"
                        name='imagenPortada'
                        value={imagenPortada}
                        onChange={(e) => handleOnChange(e)}
                        required
                        className="form-control"
                      />
                    </div>
                  </div>

                  <div className='col'>
                    <div className='mb-3'>
                      <label className="form-label">Año de estreno </label>
                      <input
                        type="number"
                        name='añoEstreno'
                        value={añoEstreno}
                        onChange={(e) => handleOnChange(e)}
                        required
                        className="form-control"
                      />
                    </div>
                  </div>

                  <div className='col'>
                    <div className='mb-3'>
                      <label className="form-label">Genero</label>
                      <select
                        className="form-select"
                        required
                        name='genero'
                        value={genero}
                        onChange={(e) => handleOnChange(e)}>
                        <option value="">--SELECCIONE--</option>
                        {generos.map(({ _id, nombre }) => {
                          return <option key={_id} value={_id}>{nombre}</option>
                        })}
                      </select>
                    </div>
                  </div>

                </div>

                <div className="row">

                  <div className="col">
                    <div className="mb-3">
                      <label className="form-label">Director </label>
                      <select
                        className="form-select"
                        required
                        name="director"
                        value={director}
                        onChange={(e) => handleOnChange(e)}>
                        <option value="">--SELECCIONE--</option>
                        {directores.map(({ _id, nombre }) => {
                          return <option key={_id} value={_id}>{nombre}</option>
                        })}
                      </select>
                    </div>
                  </div>

                  <div className="col">
                    <div className="mb-3">
                      <label className="form-label">Productora</label>
                      <select
                        className="form-select"
                        required
                        name="productora"
                        value={productora}
                        onChange={(e) => handleOnChange(e)}>
                        <option value="">--SELECCIONE--</option>
                        {productoras.map(({ _id, nombre }) => {
                          return <option key={_id} value={_id}>{nombre}</option>
                        })}
                      </select>
                    </div>
                  </div>

                  <div className="col">
                    <div className="mb-3">
                      <label className="form-label">Tipo </label>
                      <select
                        className="form-select"
                        required
                        name="tipo"
                        value={tipo}
                        onChange={(e) => handleOnChange(e)}>
                        <option value="">--SELECCIONE--</option>
                        {tipos.map(({ _id, nombre }) => {
                          return <option key={_id} value={_id}>{nombre}</option>
                        })}
                      </select>
                    </div>
                  </div>
                </div>

                <div className="row">
                  
                  <div className="col">
                    <button className="btn btn-primary">Actualizar</button>
                  </div>
                </div>

              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

