import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom"; // useParams para poder ver los datos de la url de olvide-password del frontend (que tiene el token escrito)
import Alerta from "../components/Alerta";
import clienteAxios from "../config/axios";

const NuevoPassword = () => {
  const [ password, setPassword ] = useState('')    // NOTA: la mayoria de los state son para mostrar mensajes o enlaces, se usan para condicionales
  const [ alerta, setAlerta] = useState({}) 
  const [ tokenValido, setTokenValido] = useState(false)  // El state de token valido se usa como condicional para mostrar el formulario en caso que se convalide el token 
  const [ passwordModificado, setPasswordModificado ] = useState(false)  // este state se usa para mostrar o mensajes o enlaces, en este caso enlace

  const params= useParams()    // Params devuleve el token que lleva la url de olvide-password del frontend
  const {token} = params       // Se extrae el token

  useEffect (() => {
    const comprobarToken = async () => {
       try {
            await clienteAxios(`/veterinarios/olvide-password/${token}`) // esa ruta es del backend y se le inyecta el token extraido de la ruta del frontend
            setAlerta({
              msg: 'Coloca tu nuevo password'
            })      
            setTokenValido(true)
       } catch (error) {
          setAlerta({
            msg: 'Hubo un error con el enlace', // nota: en este setAlerta no traigo el 
            error: true                        // mensaje json porque quiero escrbir algo distinto a lo que dice el setAlerta de la funcion comprobarToken del veterinarioController
          })
       }
    }
    comprobarToken() // Poner la funcion que esta en el useEffect al final es opcional
  }, [])

  const handleSubmit = async (e) => {   // async es porque va a interactuar con la API 
    e.preventDefault()
    
    if ( password.length < 6) {
      setAlerta({
        msg: 'El password debe ser minimo de 6 caracteres',
        error: true 
      })
      return 
    }
    try {
      const url = `/veterinarios/olvide-password/${token}` // el token es el que se extrae mas arriba gracias al params
      const { data } = await clienteAxios.post(url, { password }) // se extrae data de la respuesta de 
                                                                  // axios y se le pasa el password que es lo que se llenaria en el form del frontend,
                                                                  // lo que contiene ese password es el nuevo password
      setPasswordModificado(true)
      setAlerta({
        msg: data.msg
      })

    } catch (error) {
        setAlerta({
          msg: error.response.data.msg,
          error: true 
        })
    }
  } 
 
  const { msg } = alerta  // Estraigo el mensaje de alerta, porque todos los alerta tiene mensaje pero no error
  return (
      <>
        <div>
            <h1 className="text-indigo-600 font-black text-6xl">
              Restablece tu password y no Pierdas Acceso a {""}  
              <span className="text-black">tus Pacientes</span>
            </h1>
        </div>
        <div className='mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white'>
              {msg && <Alerta   
              alerta={alerta}
              />}

          { tokenValido &&  (
            <>
                <form onSubmit= {handleSubmit}>
                
                <div className="my-5">
                  <label
                      className="uppercase text-gray-600 block text-xl font-bold"
                  >
                      Nuevo Password 
                  </label>
                  <input  
                    type="password"
                    placeholder="Tu nuevo password"
                    className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
                    value = {password}
                    onChange = { e => setPassword(e.target.value)}
                  />
                </div>
                <input
                    type="submit"
                    value="Guardar nuevo Password" 
                    className="bg-indigo-700 w-full py-3 px-10 rounded-xl text-white uppercase font-bold mt-5 hover:cursor-pointer hover:bg-indigo-800 md:w-auto"
                  />
                </form>

              </>
            )}
            {passwordModificado && 
              <Link
                className='block text-center my-5 text-gray-500' 
                to="/"
              >Iniciar Sesion</Link>
            }
        </div>
      </>
  )
};
export default NuevoPassword 
