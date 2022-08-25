import axios from "axios"
import jwt_decode from "jwt-decode"
import dayjs from "dayjs"

const baseURL = 'http://127.0.0.1:8000'

let authTokens = localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null

export const axiosInstance = axios.create({
    baseURL,
    header: {Authorization: `Bearer ${authTokens?.access}`} // NOTE
})

axiosInstance.interceptors.request.use( async req => {
    if (!authTokens) {
        authTokens = localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null
        req.headers.Authorization = `Bearer ${authTokens?.access}`
    }

    const user = jwt_decode(authTokens.access)
    const isExpried = dayjs.unix(user.exp).diff(dayjs()) < 1
    console.log('isExpried', isExpried)
    if (!isExpried) {
        return req
    }

    // Refresh new Tokens

    const response = await axios.post(`${baseURL}/api/token/refresh`, {
        refresh: authTokens.refresh
    })

    localStorage.setItem('authTokens', JSON.stringify(response.data))
    req.headers.Authorization = `Bearer ${response.data.access}`

    return req
})
