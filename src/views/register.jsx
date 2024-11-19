import { useEffect, useState } from 'react';
import { register } from '../utils/auth';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/auth';

function Register() {
    const [identification, setIdentification] = useState('');
    const [name, setName] = useState('');
    const [lastName, setLastName] = useState('');
    const [publicForce, setPublicForce] = useState('');
    const [range, setRange] = useState('');
    const [forceId, setForceId] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
    const navigate = useNavigate();

    const areFieldsFilled = () => {
        return (
            identification &&
            name &&
            lastName &&
            publicForce &&
            range &&
            forceId &&
            email 
        );
    };

    useEffect(() => {
        if (isLoggedIn()) {
            navigate('/');
        }
    }, []);

    const resetForm = () => {
        setIdentification('');
        setName('');
        setLastName('');
        setPublicForce('');
        setRange('');
        setForceId('');
        setEmail('');
        setPassword('');
        setPassword2('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const payload = {
            identification: Number(identification),
            name,
            last_name: lastName,
            public_force: publicForce,
            range,
            force_id: Number(forceId),
            email,
            password,
        };
        const { data, error } = await register(payload);
        if (error) {
            alert(JSON.stringify(error));
        } else {
            navigate('/mail', { state: data});
            resetForm();
        }
    };

    const handleNavigate = async (e) => {
        e.preventDefault();
        navigate('/login');
        resetForm();
    };

    return (
        <div className="card p-4 text-light" style={{
            background: '#1f1f1f'
        }}>
            <div className="card-body">
                <h2 className="text-center mb-4">Registro</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="identification" className="form-label fw-bold">Identificación</label>
                        <input type="number" className="form-control" id="identification" placeholder="Ingrese su identificación" value={identification}
                            onChange={(e) => setIdentification(e.target.value)} required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label fw-bold">Nombres</label>
                        <input type="text" className="form-control" id="name" placeholder="Ingrese sus nombres" value={name}
                            onChange={(e) => setName(e.target.value)} required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="last-name" className="form-label fw-bold">Apellidos</label>
                        <input type="text" className="form-control" id="last-name" placeholder="Ingrese sus apellidos" value={lastName}
                            onChange={(e) => setLastName(e.target.value)} required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="public-force" className="form-label fw-bold">Fuerza Pública</label>
                        <select className="form-select" id="public-force" value={publicForce}
                            onChange={(e) => setPublicForce(e.target.value)} required>
                            <option value="">Seleccione una opción</option>
                            <option value="Policía">Policía</option>
                            <option value="Ejército">Ejército</option>
                            <option value="Armada">Armada</option>
                            <option value="Fuerza Aérea">Fuerza Aérea</option>
                        </select>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="range" className="form-label fw-bold">Rango</label>
                        <input type="text" className="form-control" id="range" placeholder="Ingrese su rango" value={range}
                            onChange={(e) => setRange(e.target.value)} required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="force-id" className="form-label fw-bold">ID Fuerza</label>
                        <input type="number" className="form-control" id="force-id" placeholder="Ingrese su ID de fuerza" value={forceId}
                            onChange={(e) => setForceId(e.target.value)} required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label fw-bold">Correo Electrónico</label>
                        <input type="email" className="form-control" id="email" placeholder="Ingrese su correo electrónico" value={email}
                            onChange={(e) => setEmail(e.target.value)} required />
                    </div>
                    <button type="submit" className="btn w-100" style={{
                        boxShadow: '2px 2px 7px #38d39f70',
                        background: areFieldsFilled() ? '#38d39f' : '#6c757d',
                        cursor: areFieldsFilled() ? 'pointer' : 'not-allowed'
                    }} disabled={!areFieldsFilled()}>
                        Registrar usuario
                    </button>
                </form>
                <div className="text-center mt-3">
                    <a onClick={handleNavigate} className="text-light">¿Ya tienes cuenta? Ingresa aquí.</a>
                </div>
            </div>
        </div>
    );
}

export default Register;