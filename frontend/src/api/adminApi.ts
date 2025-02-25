import axios, { AxiosError } from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL
})

api.interceptors.request.use(
    config => {
        config.headers['Authorization'] = `Bearer ${localStorage.getItem('token')}`
        return config
    },
    error => {
        return Promise.reject(error)
    }
)

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

export const fetchAlllSurveys = async (filterItems: object) => {
    try {
        const response = await api.get('/admin/survey-submissions', {
            params: filterItems
        })
        return response
    } catch (error) {
        if (error instanceof AxiosError) {
            return error.response
        }
    }
}

