import { BrowserRouter, Routes, Route } from "react-router-dom" // -react-router-dom es una libreria con  
//routing (todo tiene que estar agrupado por BrowserRouter, Routes permite agrupar diferentes rutas y Rutes es para una ruta especifica )

import AuthLayout from "./layout/AuthLayout"
import RutaProtegida from "./layout/RutaProtegida"

import Login from "./paginas/Login"
import Registrar from "./paginas/Registrar"
import OlvidePassword from "./paginas/OlvidePassword"
import ConfirmarCuenta from "./paginas/ConfirmarCuenta"
import NuevoPassword from "./paginas/NuevoPassword"
import AdministrarPacientes from "./paginas/AdministrarPacientes"
import EditarPerfil from "./paginas/EditarPerfil"
import CambiarPassword from "./paginas/CambiarPassword"

import { AuthProvider } from './context/AuthProvider' // Se importa el AuthProvider porque es le que contiene la informacion del componente
import { PacientesProvider } from './context/PacientesProvider' 


function App() {  

  return (
      <BrowserRouter>  
          <AuthProvider>  
            <PacientesProvider>
              <Routes>
                  <Route path="/" element={<AuthLayout/>}>  {/* esta es la pagina principal, cuando el usuario visite la diagonal se carga el componente de AuthLayout */}
                      <Route index element={<Login />} />   {/* En este caso Route sirve como agrupador de todos los elementos que tengan el componente AuthLayout */}
                        <Route path="registrar" element = {<Registrar />} /> {/* cada ruta hija tiene el componente AuthLayout */}
                        <Route path="olvide-password" element = {<OlvidePassword />} /> {/* Login es la pagina principal porque lleva index */ }
                        <Route path="olvide-password/:token" element = {<NuevoPassword />} /> {/* element permite cargar el componente OlvidePassword*/ }
                        <Route path="confirmar/:id" element = {<ConfirmarCuenta />} />
                  </Route> {/* en la ruta registrar, path es lo mismo que la / y con element se accede al componente Registrar que esta en la pagina registrar*/}

                  <Route path="/admin" element={<RutaProtegida />}>
                    <Route index element = {<AdministrarPacientes />}/>  
                    <Route path="perfil" element={<EditarPerfil />} />
                    <Route path="cambiar-password" element={<CambiarPassword />} />
                  </Route> 
              </Routes>      
            </PacientesProvider> 
          </AuthProvider> 
      </BrowserRouter>     
    ) 
}
   
export default App

// Para que quede claro: En la ruta registrar path reemplaza la /, esa 
// ruta lleva a la pagina registrar (la paginan fue creada en la carpeta paginas), el contenido de esa 
// pagina va a tener inyectado los componentes AuthLayout y Registrar 