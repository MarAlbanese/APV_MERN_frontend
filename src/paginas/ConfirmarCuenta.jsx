import { useEffect, useState } from "react"; // con useEffect se puede ejecutar el codigo una vez que el componente este listo
import { useParams, Link } from "react-router-dom"; // useParams es un hook que permite ver los parametros de la url en react router dom
import clienteAxios from "../config/axios"; // importo axios porque voy a hacer peticion hacia la url del get de postman 
import Alerta from "../components/Alerta";


// La funcion lo que hace es mandar el token de la url que figura en la 
// pagina confirmar cuenta ("confirmar/:id") del frontend para que se lea en la url del backend  

const ConfirmarCuenta = () => {  // La confirmacion de la cuenta se hace al servidor del backend por eso se extrae el token de alli
    const [cuentaConfirmada, setCuentaConfirmada] = useState(false) // Por defecto la variable es false
    const [cargando, setCargando] = useState(true)
    const [alerta, setAlerta] = useState({}) // el objeto queda vacio y se llena con cualquiera de los dos llamado de useEffect

    const params = useParams()  // En express la manera de verlo era con req.params, en react router dom es con useParams
    const { id } = params       // params me permite ver los parametros de la url del FRONTEND (el parametro va a ser el token que se envia para autenticar usuario), esa url es la que 
                                // figura en el frontend al momento de confirmar la cuenta del usuario    

    useEffect( () => {  // la funcion copara que el id de la url confirmar del frontend sea la misma que la url confirmar del backen, por eso compara ambos id (o token, es lo mismo)
        const confirmarCuenta = async () => {
          try {
            const url = `${import.meta.env.VITE_BACKEND_URL}/api/veterinarios/confirmar/${id}` // esa url es del backend de confirmar usuario y se le pasa el id de la pagina del frontend 
            const { data } = await clienteAxios (url)  // data es la respuesta que da axios
            setCuentaConfirmada(true) //si el codigo se ejecuta significa que se confirmo corectamente y si hubo error, pasa al catch 
            setAlerta ({
              msg: data.msg    // Se puede acceder a los mensajes porque estan en json
              
            })  
          } catch (error) {
              setAlerta( {  
                msg: error.response.data.msg,
                error:true 
              })
          }
          setCargando(false) //independientemente de lo que de el useEffect setCargando pasa a ser false

        }   
        confirmarCuenta(); 
    }, [])  // el useEffect al tener corchetes vacios se ejecuta una sola vez
    

    return (
      <>
          <div>
            <h1 className="text-indigo-600 font-black text-6xl">
              Confirma tu cuenta y comienza a administrar  {""}  
              <span className="text-black">tus Pacientes</span>
            </h1>
        </div>
        <div className='mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white'>
            {!cargando && 
              <Alerta 
                alerta={alerta}
              />}
              {cuentaConfirmada && (
                  <Link
                    className='block text-center my-5 text-gray-500' 
                      to="/"> Iniciar Sesion</Link>
              )}          
        </div>
      </>
    )
  };

  export default ConfirmarCuenta;