import axios, { AxiosError } from "axios"


console.log(import.meta.env.VITE_BASE_URL,'import ment. env. base url ');

const api = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL
})

export const submitSurvey = async (data:object) => {
    try {
        const response = await api.post('/survey',data)
        return response
    } catch (error) {
        if (error instanceof AxiosError) {
            return error.response
        }
    }
}

export const fetchAlllSurveysByEmail = async () => {
    try {
        const response = await api.get('/survey')
        return response
    } catch (error) {
        if(error instanceof AxiosError) error.response
    }
}