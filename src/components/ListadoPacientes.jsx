import usePacientes from "../hooks/usePacientes";
import Paciente from "./Paciente";


const ListadoPacientes = () => {
  const { pacientes } = usePacientes()

  

 return ( 
     <>
        { pacientes.length ? 
        (
            <>
                <h2 className="font-black text-3xl text-center">Listado de Pacientes</h2>
                
                <p className="text-xl mt-5 mb-10 text-center">
                    Administra tus {''}
                    <span className="text-indigo-600 font-bold">Pacientes y Citas </span>
                </p>
                {pacientes.map(paciente => (
                    <Paciente
                        key={paciente._id} // cuando se itera sobre un arreglo se requiere un key unico
                        paciente={paciente} // aca se pasa el prop de paciente que es un objeto completo
                    
                    />
                ))}
            </>
        ): 
        (
            <> 
                <h2 className="font-black text-3xl text-center">No hay pacientes</h2>
                
                <p className="text-xl mt-5 mb-10 text-center">
                    Comienza agregando Pacientes {''}
                    <span className="text-indigo-600 font-bold">y apareceran en este lugar </span>
                </p>
            </>
        )}
    </>
 )
        };    


 export default ListadoPacientes;
