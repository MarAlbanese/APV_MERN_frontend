import { createContext, useState, useEffect } from 'react'
import clienteAxios from '../config/axios'

const PacientesContext = createContext()

export const PacientesProvider = ({children}) =>{ // PacientesProvider es una funcion que tiene otra funcion que se encarga de almacenar los pacientes ingresados,
                                                  // y para almacenarlo primero debe pedir autorizacion al backend - por medio de axios-, obtenido el   
    const [ pacientes, setPacientes ] = useState([])   // valor se almacena el la constante paciente y por medio del provider queda disponible en todos los componentes

    const [paciente, setPaciente] = useState({})


    useEffect(() => {
    const obtenerPacientes = async () => {
        try { 
            const token = localStorage.getItem('token')
            if(!token) return 
            const config = {
                headers: {
                    "Content-Type" : "application/json",
                    Authorization: `Bearer ${token}`
                } 
                    
            } 
        const { data } = await clienteAxios('/pacientes', config)
        setPacientes(data) 


        } catch (error) {
            console.log(error)
        }
    } 
    obtenerPacientes()
}, [])


    const guardarPaciente = async (paciente) => {
        const token = localStorage.getItem('token')
            const config = {
                headers: {
                    "Content-Type" : "application/json",
                    Authorization: `Bearer ${token}`
                }             
            }
        if(paciente.id) {
            try {
                const {  data } = await clienteAxios.put(`/pacientes/${paciente.id}`, paciente, config)
                
                const pacientesActualizado = pacientes.map ( pacienteState => pacienteState._id === data._id ? data : pacienteState )
                setPacientes(pacientesActualizado) 

            } catch (error) {
                console.log(error)
            }    
        } else {
            try {
             
            const { data } = await clienteAxios.post('/pacientes', paciente, config)
                
                const { createdAt, updatedAt, __v,...pacienteAlmacenado } = data // este codigo crea un nuevo objeto con lo que no se quiere del objeto creado -se almacena en pacienteAlmacenado-

                setPacientes([pacienteAlmacenado, ...pacientes])
        } catch (error) {
            console.log(error.response.data.msg)
        }
        }
         
        }
        
        const setEdicion = (paciente) => {
            setPaciente(paciente) 
    }

    const eliminarPaciente = async id => {
        const confirmar = confirm('Confirmas que deseas eliminar?')
        if(confirmar){
            try {
                const token = localStorage.getItem('token')
                const config = {
                    headers: {
                        "Content-Type" : "application/json",
                        Authorization: `Bearer ${token}`
                    }             
                }

                const { data } = await clienteAxios.delete(`/pacientes/${id}`, config)
                const pacientesActualizado = pacientes.filter ( pacientesState => pacientesState._id !== id)
                setPacientes(pacientesActualizado)
            } catch (error) {
                console.log(error)
                
            }
        }
    }

    return(
        <PacientesContext.Provider
            value={{
                pacientes, // Este state estara disponible en todos los componentes, pero para extraerlo hace falta un hook
                guardarPaciente,
                setEdicion,
                paciente,
                eliminarPaciente
         }}
        >
            {children} 
        </PacientesContext.Provider> 
    )

}


export default PacientesContext; 
