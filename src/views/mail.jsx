import { useLocation } from 'react-router-dom'
import { Link } from 'react-router-dom';

export const MailPassword = () => {
    const location = useLocation();
    const data = location.state || {};

  return (
    <div>
           <h1 className='text-center text-light'>Registro exitoso!</h1>
            <h2 className='text-center text-light'>Revisa tu correo y tendras tus datos de acceso</h2>
            <div className='w-100 d-flex justify-content-around mt-5'>
                <Link to="/">
                    <button className="btn" style={{
                        background: '#0197F6'
                    }}>Ok</button>
                </Link>
            </div>
        </div>  
  )
}
