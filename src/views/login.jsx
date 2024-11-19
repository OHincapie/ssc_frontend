import { useEffect, useState } from 'react';
import { login } from '../utils/auth';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/auth';

const Login = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const isLoggedIn = useAuthStore((state) => state.isLoggedIn);

    useEffect(() => {
        if (isLoggedIn()) {
            navigate('/');
        }
    }, []);

    const resetForm = () => {
        setUsername('');
        setPassword('');
    };

    const handleNavigate = async (e, ruta) => {
        e.preventDefault();
        navigate(ruta);
        resetForm();
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        const { data, error } = await login(email, password);
        if (error) {
            alert(error);
        } else {
            navigate('/');
            resetForm();
        }
    };
    return (

        <div className="card p-4 text-light" style={{
            background: '#1f1f1f'
        }}>
            <div className="card-body">
                <h2 className="text-center mb-4 ">Iniciar sesión</h2>
                <form onSubmit={handleLogin}>
                
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label fw-bold">Correo Electrónico</label>
                        <input type="email" className="form-control" id="email" placeholder="Ingrese su correo electrónico" value={email}
                            onChange={(e) => setEmail(e.target.value)} required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label  fw-bold">Contraseña</label>
                        <input type="password" className="form-control" id="password" placeholder="Ingrese su contraseña" value={password}
                            onChange={(e) => { setPassword(e.target.value) }} />
                    </div>
                    <button type="submit" className="btn w-100" style={{
                        boxShadow: '2px 2px 7px #38d39f70',

                        background: '#38d39f'
                    }}>Iniciar sesión</button>
                </form>
                <div className="text-center mt-3 d-flex justify-content-between">
                    <a onClick={(e)=>{handleNavigate(e, '/login')}} className="text-light ">¿Olvidaste tu contraseña?</a>
                    <a onClick={(e)=>{handleNavigate(e, '/register')}} className="text-light">¿No tienes cuenta?, Registrate aqui.</a>
                </div>
            </div>
        </div>

    );
};

export default Login;