import {
    createBrowserRouter
} from 'react-router-dom';
import Home from '../views/home';
import Login from '../views/login';
import Register from '../views/register';
import Logout from '../views/logout';
import PrivateRoute from '../layouts/PrivateRoute';
import Private from '../views/private';
import { NewPassword } from '../views/new_password';
import { MailPassword } from '../views/mail';
import UserList from '../views/user_list';
import { HomeLogin } from '../views/home_login';


export const getRoutes = () => createBrowserRouter([
    {
        path: '/',
        element: <Home />
    },
    {
        path: '/mail',
        element: <MailPassword/>
    },
    {
        path: '/login',
        element: < Login />
    },
    {
        path: '/register',
        element: < Register />
    },
    {
        path: '/nuevaClave',
        element: < NewPassword />
    },
    {
        path: '/logout',
        element: < Logout />
    },
    {
        path: '/private',
        element:
            <PrivateRoute>
                <Private />
            </PrivateRoute>
    },
    {
        path: '/users',
        element: <UserList />
    },
    {
        path: '/hlogin',
        element: <HomeLogin />
    }
]);