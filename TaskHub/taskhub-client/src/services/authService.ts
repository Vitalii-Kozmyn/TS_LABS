import api from './api';
import type { IAuthResponse, IUserLogin, IUserRegister } from '../types/user'; 

export const authService = {
    login: async (data: IUserLogin) => {
        const response = await api.post<IAuthResponse>('/auth/login', data);
        return response.data;
    },
    register: async (data: IUserRegister) => {
        const response = await api.post<IAuthResponse>('/auth/register', data);
        return response.data;
    }
};