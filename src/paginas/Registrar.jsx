import { useState } from "react"  // useState es un hook de react
import { Link } from "react-router-dom"
import clienteAxios from "../config/axios"
import Alerta from "../components/Alerta" // La extencion js es solo para node no para react
 
const Registrar = () => {
    const [ nombre, setNombre ] = useState ('') // Cada vez que se llene uno de los campos el state cambia
    const [ email, setEmail ] = useState ('')
    const [ password, setPassword ] = useState ('')
    const [ repertirPassword, setRepetirPassword ] = useState ('')

    const [alerta, setAlerta] = useState({})

    const handleSubmit = async e =>{      // handleSubmit es la funcion que maneja un evento y se 
        e.preventDefault();               // ejecuta la funcion cuando se apreta el boton de crear cuenta
                                          // La funcion lleva async porque axios debe utilizarse con async await

        if([nombre, email, password, repertirPassword].includes('')){ // includ es el metodo del arreglo
          setAlerta({ msg: "Hay campos vacios", error: true})
          return;
        }

        if(password !== repertirPassword){
            setAlerta({ msg: "Los password no son iguales", error: true})
            return; 
        }

        if(password.length<6){
          setAlerta({ msg: "El password es muy corto, agrega minimo 6 caracteres", error: true})
          return;
        }
        setAlerta({})
        // Crear un usuario en la api
        try {
          await clienteAxios.post('/veterinarios', { nombre, email, password }) // axios lo que hace es pedirle permiso a una url del backend, en este   
          setAlerta({                                                           // caso pide a  '/veterinarios', esa ruta del backend tiene la funcion registrar, de esa forma se     
            msg: 'Creado Correctamente, revisa tu email',                       // comunican ambas funciones: la funcion registrar del backend con la del frontend.  
            error: false                                                        // Realizada la peticion, crea un objeto y le pasa la informacion que se completa en el formulario.
          })                                                                    
        } catch (error) {
          setAlerta({
            msg: error.response.data.msg,  // con .response accedo al mensjase de error de la funcion Registrar del backend -v. veterinarioController.js- y con la funcion setAlerta imprimo el mensaje en el formulario del frontend
            error: true
          }) 
        }
 
    }  
    const { msg } = alerta   // se extrae el valor de mensaje y se asigna a alerta, alerta esta dentro de la funcion setAlerta
    return (
      <>  
        <div>
            <h1 className="text-indigo-600 font-black text-6xl">
              Crea tu Cuenta y Administra {""}  
              <span className="text-black">tus Pacientes</span>
            </h1>
        </div>
        <div className='mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white'>
          {msg && <Alerta   
              alerta={alerta} // alerta= es un props que se le pasa el valor que hay en un componente 
          />}
          <form
              onSubmit={handleSubmit}
          >
          <div className="my-5">
                <label
                    className="uppercase text-gray-600 block text-xl font-bold"
                >
                    Nombre 
                </label>
                <input  
                  type="text"
                  placeholder="Tu nombre"
                  className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
                  value = {nombre} // nombre contendra el valor ingresado en el campo nombre, parte de un arreglo vacio definido en el state
                  onChange = { e => setNombre(e.target.value)} // e.target.value extrae el valor del campo y se lo asigna al parametro del setNombre
                />
              </div>
              <div className="my-5">
                <label
                    className="uppercase text-gray-600 block text-xl font-bold"
                >
                    Email 
                </label>
                <input  
                  type="email"
                  placeholder="Email de Registro"
                  className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
                  value = {email}
                  onChange = { e => setEmail(e.target.value)}
                />
              </div>
              <div className="my-5">
                <label
                    className="uppercase text-gray-600 block text-xl font-bold"
                >
                    Password 
                </label>
                <input  
                  type="password"
                  placeholder="Tu password"
                  className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
                  value = {password}
                  onChange = { e => setPassword(e.target.value)}
                />
              </div>
              <div className="my-5">
                <label
                    className="uppercase text-gray-600 block text-xl font-bold"
                >
                    Repetir Password 
                </label>
                <input  
                  type="repetir password"
                  placeholder="Repite tu password"
                  className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
                  value = {repertirPassword}
                  onChange = { e => setRepetirPassword(e.target.value)}
                />
              </div>
              <input
                  type="submit"
                  value="Crear Cuenta" 
                  className="bg-indigo-700 w-full py-3 px-10 rounded-xl text-white uppercase font-bold mt-5 hover:cursor-pointer hover:bg-indigo-800 md:w-auto"
              />
          </form>
          <nav className="mt-10 lg:flex lg:justify-between">
             <Link
                className='block text-center my-5 text-gray-500' 
                to="/">¿Ya tienes una cuenta? Inicia Sesion</Link>
             <Link 
                className='block text-center my-5 text-gray-500'
                to="/olvide-password">Olvide mi Password</Link>
          </nav>
        </div>
      </>
    )
  }
  
  export default Registrar;