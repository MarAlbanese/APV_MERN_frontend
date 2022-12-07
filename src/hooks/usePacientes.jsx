import { useContext } from 'react'  // Con useContext se extraen los datos de 
import PacientesContext from '../context/PacientesProvider' // PacientesContext, por eso tambien se importa PacientesContext 

const usePacientes = () => {     // La funcion usePacientes hace que se pueda acceder a la informacion del componenete PacientesProvider (v. carpeta context, archivo AuthProvider)
    return useContext(PacientesContext)  // useContext hace diposibles los valores del provider, pero por 
}                                       //parametro se le debe indicar cual de todos los provider, en este caso es 
                                            // PacientesContext porque es el que contiene el PacientesProvider 

export default usePacientes;