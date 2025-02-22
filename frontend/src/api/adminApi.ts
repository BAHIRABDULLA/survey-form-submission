

import axios, { AxiosError } from "axios";

console.log(import.meta.env.VITE_BASE_URL,'import ment. env. base url ');

const api = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL
})

export const handleLogin = async (data: object) => {
    try {
        const response = await api.post('/admin/login', data)
        return response
    } catch (error) {
        console.error('Error foiunded in handle long ', error);
        if (error instanceof AxiosError) {
            return error.response
        }
    }
}

export const fetchAlllSurveys = async () => {
    try {
        const response = await api.get('/admin/survey-submissions')
        return response
    } catch (error) {
        if (error instanceof AxiosError) {
            return error.response
        }
    }
}

