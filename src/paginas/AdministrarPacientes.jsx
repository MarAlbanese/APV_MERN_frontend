import { useState } from 'react'
import Formulario from "../components/Formulario";
import ListadoPacientes from "../components/ListadoPacientes";

const AdministrarPacientes = () => {
  const [mostrarFormulario, setMostrarFormulario] = useState(false) 

  return (
        <div className = "flex flex-col md:flex-row">
            <button 
            type="button"
            className="bg-indigo-600 text-white font-bold uppercase mx-10 p-3 rounded-md mb-10 md:hidden"
            onClick={() => setMostrarFormulario(!mostrarFormulario)} // Cuando un evento llama a una funcion con argumento se  
            >{mostrarFormulario ? 'Ocultar Formulario' : 'Mostrar Formulario' }</button>  {/*debe hacer por medio de callback, asi se ejecuta la funcion luego del clik*/} 
            <div className={`${mostrarFormulario ? 'block': 'hidden'} md:block 
            md:w-1/2 lg:w-2/5 `}>
              <Formulario />
            </div>

            <div className="md:w-1/2 lg:w-3/5">
              <ListadoPacientes />
            </div>
        
        </div>
  );
};

export default AdministrarPacientes;