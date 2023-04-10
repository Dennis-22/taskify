import axios from 'axios'

const endPoint = 'http://localhost:4000'
const API = axios.create({
    baseURL: `${endPoint}/api/v1`
})


export const signUpRoute = (userDetails)=>API.post('/users/signup', userDetails)
export const loginRoute = (userDetails)=>API.post('/users/login', userDetails)
