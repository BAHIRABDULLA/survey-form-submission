

import axios, { AxiosError } from "axios";

const api = axios.create({
    baseURL: 'http://localhost:3000/api'
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

