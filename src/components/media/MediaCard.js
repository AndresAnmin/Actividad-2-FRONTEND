import React from "react";
import { Link } from "react-router-dom";

export const MediaCard = (props) => {

    const { media } = props

  return (
    <div className="col"> 
      <div className="card">
        <img src={media.imagenPortada} className="card-img-top" alt="img" />
        <div className="card-body">
          <h1 className="card-title">{`${media.titulo}`}</h1>
          <hr />
          <p className="card-text">{`Sinopsis: ${media.sinopsis}`}</p>
          <p className="card-text">{`Director: ${media.directorPrincipal.nombre}`}</p>
          <p className="card-text">{`Género: ${media.generoPrincipal.nombre}`}</p>
          <p className="card-text">{`Estreno: ${media.añoEstreno}`}</p>
          <p className="card-text">{`Productora: ${media.productora.nombre}`}</p>
          <p className="card-text">{`Tipo: ${media.tipo.nombre}`}</p>
          <p className="card-text">{`Serial: ${media.serial}`}</p>
          <p className="card-text">{`URL: ${media.url}`}</p>
          <p className="card-text"> 
            <Link to = {`media/edit/${media._id}`} >Ver más...</Link>
          </p>
        </div>
      </div>
    </div>
  );
};
