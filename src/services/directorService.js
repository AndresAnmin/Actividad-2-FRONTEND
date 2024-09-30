import { axiosInstance } from "../helper/axios-config";

const getDirector = () => {
    return axiosInstance.get('director', {
        header: {
            'Content-Type': 'application/json'
        }
    });
}

const crearDirector = (data) => {
    return axiosInstance.post('director', data, {
        header: {
            'content-Type': 'application/json'
        }
    });
}

const actualizarDirector = (data, directorId) => {
    return axiosInstance.put(`director/${directorId}`, data, {
        header: {
            'Content-Type': 'application/json'
        }
    });
}


export {
    getDirector, crearDirector, actualizarDirector


}
