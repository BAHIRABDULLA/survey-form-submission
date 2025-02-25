import axios, { AxiosError } from "axios"


const api = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    withCredentials:true
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

export const submitSurvey = async (data: object) => {
    try {
        const response = await api.post('/survey', data)
        return response
    } catch (error) {
        if (error instanceof AxiosError) {
            return error.response
        }
    }
}


export const fetchAllSurveys = async (filterItems: object) => {
    try {
        const response = await api.get('/survey/survey-submissions', {
            params: filterItems
        })
        return response
    } catch (error) {
        if (error instanceof AxiosError) {
            return error.response
        }
    }
}