import axios, { AxiosError } from "axios"

const api = axios.create({
    baseURL: 'http://localhost:3000/api'
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