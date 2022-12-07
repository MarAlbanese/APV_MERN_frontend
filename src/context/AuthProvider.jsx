import { useState, useEffect, createContext } from 'react'
import clienteAxios from '../config/axios'

/*La finalidad de esta funcion es chequar que el token de la persona que 
quiere autenticarse sea el mismo que el del usuario registrado, 
si es el mismo, va a extraer todos los datos del perfil de ese usuario y los almacena en un 
objeto en la constante auth, y como esa constante estara disponible en todos los componentes 
por medio de el provider del AuthContenxt, todas las las rutas del 
frontend tendras disponibles por consola el perfil del usuario. */

const AuthContext = createContext()  //provider es como un componente grande, un contenido global

const AuthProvider = ({children} ) => { // children representa a todos los componentes que afectar el provider 
    
    const [cargando, setCargando] = useState(true)
    const [auth, setAuth] = useState({}) // quedaran afectados por AuthProvider, en este caso todas las rutas del App.jsx (v. App.jsx)    
    
    useEffect( () => {
        const autenticarUsuario = async () => {
            const token = localStorage.getItem('token')  // el token se encuentra almacenado en el locaStorage
                if(!token) { // Si el usuario no tiene un token asignado es porque no esta registrado y si no esta registrado no se puede autenticar
                    setCargando (false) // setCargando es para que figure cargando en consola, es irrelevante
                    return   
                }
                const config = {
                    headers: {   // El header es la parte del postman en donde esta la authorization junto con 
                        "Content-Type": "application/json",  // el bearertoken y todos los datos del perfil del usuario, en esta constante se almacena el perfil del usuario.
                        Authorization: `Bearer ${token}`
                    }
                } 
                try {
                    const { data } = await clienteAxios ('/veterinarios/perfil', config)  // Corroborado que exista el token, esta lina solicita a la url '/veterinarios/perfil' el 
                                                                                          // perfil del usuario autenticado. Como es una peticion tipo get se  
                                                                                          // anota la url + la configuracion (que en este caso el perfil del usuario se almaceno en la constante config), 
                                                                                          // Data es el medio por el que se devuelven los datos extraidos de la url '/veterinarios/perfil'   
                    setAuth(data) // en setAuth -que almacena dato de tipo objeto- se almacena los datos del perfil del veterinario autenticado. Como setAuth es un provider,
                } catch (error) { //  estara disponible en todas las rutas.
                    console.log(error.response.data.msg)
                    setAuth({})
                    
                }
                setCargando(false) 
        }
        autenticarUsuario() 
    },[])

    const cerrarSesion = () => {
        localStorage.removeItem('token')
        setAuth({})        
    }
    
    const actualizarPerfil = async datos => {
        const token = localStorage.getItem('token')
        if(!token) { 
            setCargando (false) 
            return   
        }
        const config = {
            headers: {   
                "Content-Type": "application/json",  
                Authorization: `Bearer ${token}`
            }
        }
        try {

            const url = `/veterinarios/perfil/${datos._id}`
            const { data } = await clienteAxios.put(url, datos, config)
            
            return {
                msg: 'Almacenado Correctamente'
            }
            
        } catch (error) {
            return {
                msg: error.response.data.msg,
                error: true
            }
            
        }

    }

    const guardarPassword = async (datos) => {
        const token = localStorage.getItem('token')
        if(!token) { 
            setCargando (false) 
            return   
        }
        const config = {
            headers: {   
                "Content-Type": "application/json",  
                Authorization: `Bearer ${token}`
            }
        }
        try {
            const url = '/veterinarios/actualizar-password'
            const { data } = await clienteAxios.put(url, datos, config)
            console.log(data)

            return {
                msg: data.msg
            }
        } catch (error) {
            return {
                msg: error.response.data.msg, 
                error: true 
            }
            
        }
    }

    return(
        <AuthContext.Provider
            value={{                // value es el prop y se pasa el valor como 
                auth,               // objeto, y en el value decide que states se ponen a disposicion en los diferentes componentes
                setAuth,
                cargando,
                cerrarSesion,
                actualizarPerfil,
                guardarPassword 
            }}
        >      

            {children}               {/* children representa a todas las rutas de la App.jsx a las que afectara el componente context provider */}
             
        </AuthContext.Provider>
    )
}

export {
    AuthProvider 
}

export default AuthContext   