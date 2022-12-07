import axios from 'axios'

const clienteAxios = axios.create({  // Esto crea una url de base, sirve para escribir el codigo mas corto
    baseURL: `${import.meta.env.VITE_BACKEND_URL}/api`  // Aca se pasa el endpoint principal en donde se van a hacer las peticiones

})

export default clienteAxios