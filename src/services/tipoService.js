import { axiosInstance } from "../helper/axios-config";

const gettipo = () => {
    return axiosInstance.get('tipo', {
        header: {
            'Content-Type': 'application/json'
        }
    });
}

const creartipo = (data) => {
    return axiosInstance.post('tipo', data, {
        header: {
            'content-Type': 'application/json'
        }
    });
}

const actualizartipo = (data,tipoId) => {
    return axiosInstance.put(`tipo/${ tipoId }`,data, {
        header: {
            'Content-Type': 'application/json'
        }
    });
}

export {
    gettipo, creartipo, actualizartipo


}
