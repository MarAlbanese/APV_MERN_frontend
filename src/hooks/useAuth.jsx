import { useContext } from 'react'  // Con useContext se extraen los datos de 
import AuthContext from '../context/AuthProvider' // AuthContext, por eso tambien se importa AuthContext 

const useAuth = () => {     // La funcion useAuth hace que se pueda acceder a la informacion del componenete AuthProvider (v. carpeta context, archivo AuthProvider)
    return useContext(AuthContext)  // useContext hace diposibles los valores del provider, pero por 
}                                       //parametro se le debe indicar cual de todos los provider, en este caso es 
                                            // AuthContext porque es el que contiene el AuthProvider 

export default useAuth