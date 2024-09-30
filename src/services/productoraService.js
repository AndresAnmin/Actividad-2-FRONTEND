import { axiosInstance } from "../helper/axios-config";

const getProductora = () => {
    return axiosInstance.get('Productora', {
        header: {
            'Content-Type': 'application/json'
        }
    });
}

const crearProductora = (data) => {
    return axiosInstance.post('productora', data, {
        header: {
            'content-Type': 'application/json'
        }
    });
}

const actualizarProductora = (data, productoraId) => {
    return axiosInstance.put(`productora/${ productoraId }`,data, {
        header: {
            'Content-Type': 'application/json'
        }
    });
}

export {
    getProductora, crearProductora, actualizarProductora


}
