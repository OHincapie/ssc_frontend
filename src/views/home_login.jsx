import { useLocation } from 'react-router-dom'
import { Link } from 'react-router-dom';

export const HomeLogin = () => {
    const location = useLocation();
    const data = location.state || {};

  return (
    <div>
           <h1 className='text-center text-light'>Login exitoso!</h1>
            <h2 className='text-center text-light'>Bienvenido al SCC - Sistema de consulta ciudadano</h2>
            <div className='w-100 d-flex justify-content-around mt-5'>
            <Link>
                    <button className="btn" style={{
                        background: '#0197F6'
                    }}>Leer codigo de barras</button>
                </Link>
                
                <Link to="/">
                    <button className="btn" style={{
                        background: '#0197F6'
                    }}>Salir</button>
                </Link>
            </div>
        </div>  
  )
}
