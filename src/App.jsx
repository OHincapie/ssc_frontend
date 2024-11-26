import { RouterProvider } from 'react-router-dom';
import './App.css';
import MainWrapper from './layouts/MainWrapper';
import { getRoutes } from './routes';

const router = getRoutes();

function App() {
  return (
    <div className="d-flex align-items-center min-vh-100" style={{
      background: '#121212'
    }}>
      <div className='container'>
        <div className="row justify-content-center">
          <div className="">
            <MainWrapper>
              <RouterProvider router={router} />
            </MainWrapper>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;