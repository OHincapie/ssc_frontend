import { useAuthStore } from '../store/auth';
import axios from './axios';
import jwt_decode from 'jwt-decode';
import Cookies from 'js-cookie';


export const fetchUsers = async () => {
    try {
        const { data, status } = await axios.get('/users');
        console.log("OK");
        return { data, error: null };
    } catch (error) {
        console.log("error")
        return {
            data: null,
            error: error?.response?.data.message || 'Something went wrong',
        };
    }
};

export const login = async (email, password) => {
    try {
        const { data, status } = await axios.post('/login', {
            email,
            password,
        });
        console.log("OK");
        return { data, error: null };
    } catch (error) {
        console.log("error")
        return {
            data: null,
            error: error?.response?.data.message || 'Something went wrong',
        };
    }
};

export const register = async (payload) => {
    try {
        const { data } = await axios.post('/users/', payload);
        //await login(username, password);
        return { data, error: null };
    } catch (error) {
        return {
            data: null,
            error: error.response.data || 'Something went wrong',
        };
    }
};

export const updatePassword = async (username, new_password) => {
    try {
        const { data } = await axios.put('updatePassword/', {
            username,
            new_password
        });
        return { data, error: null };
    } catch (error) {
        return {
            data: null,
            error: error.response.data || 'Something went wrong',
        };
    }
};

export const logout = () => {
    Cookies.remove('access_token');
    Cookies.remove('refresh_token');
    useAuthStore.getState().setUser(null);
};

export const setUser = async () => {
    // ON PAGE LOAD
    const accessToken = Cookies.get('access_token');
    const refreshToken = Cookies.get('refresh_token');
    if (!accessToken || !refreshToken) {
        return;
    }
    if (isAccessTokenExpired(accessToken)) {
        const response = await getRefreshToken(refreshToken);
        setAuthUser(response.access, response.refresh);
    } else {
        setAuthUser(accessToken, refreshToken);
    }
};

export const setAuthUser = (access_token, refresh_token) => {
    Cookies.set('access_token', access_token, {
        expires: 1,
        secure: true,
    });

    Cookies.set('refresh_token', refresh_token, {
        expires: 7,
        secure: true,
    });

    const user = jwt_decode(access_token) ?? null;

    if (user) {
        useAuthStore.getState().setUser(user);
    }
    useAuthStore.getState().setLoading(false);
};

export const getRefreshToken = async () => {
    const refresh_token = Cookies.get('refresh_token');
    const response = await axios.post('token/refresh/', {
        refresh: refresh_token,
    });
    return response.data;
};

export const isAccessTokenExpired = (accessToken) => {
    try {
        const decodedToken = jwt_decode(accessToken);
        console.log(decodedToken);
        return decodedToken.exp < Date.now() / 1000;
    } catch (err) {
        return true; // Token is invalid or expired
    }
};