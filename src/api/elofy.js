import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:8080/elofy-1.0-SNAPSHOT/'
})

export default api