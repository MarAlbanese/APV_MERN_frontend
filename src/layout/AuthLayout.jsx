import { Outlet } from "react-router-dom";  // Oulet es un componente que hace que cuando se  
// ingrese en la pagina <Route path="/" element={<AuthLayout/>}>, carga el 
// componente principal que es {<AuthLayout/>}, muestre su contenido y el  
//contenido del componente que le sigue en la ruta que antes del element lleva el index  (v. ruta del login)
const AuthLayout = () => {
  return (
    <>
        
        <main className="container mx-auto md:grid grid-cols-2 mt-12 gap-10 p-5 items-center">  
          <Outlet />
        </main>

    </>
    
  )  
};

export default AuthLayout