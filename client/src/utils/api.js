import axios from 'axios'

const baseUrl = process.env.REACT_APP_SERVER_URL
const usersEndpoint = `${baseUrl}/api/v1/users`
const tasksEndpoint = `${baseUrl}/api/v1/tasks`

const setHeaders = (accessToken)=>{
    return {
        headers:{authorization: `Bearer ${accessToken}`}
    }
}

// users routes
export const loginRoute = (userDetails)=>axios.post(`${usersEndpoint}/login`, userDetails)
export const signUpRoute = (userDetails)=>axios.post(`${usersEndpoint}/signup`, userDetails)
export const editUserRoute = (updateDetails, accessToken)=>axios.patch(`${usersEndpoint}/edit`, updateDetails, setHeaders(accessToken))

// tasks routes
export const getAllTasksRoute = (userId, accessToken)=>axios.get(`${tasksEndpoint}/${userId}`, setHeaders(accessToken))
export const findATaskRoute = (taskId, accessToken)=>axios.get(`${tasksEndpoint}/task/${taskId}`, setHeaders(accessToken))
export const createTasksRoute = (taskData, accessToken,)=>axios.post(`${tasksEndpoint}/create`, taskData, setHeaders(accessToken))
export const editTaskRoute = (taskData, accessToken,)=>API.patch(`${tasksEndpoint}/edit`, taskData, setHeaders(accessToken))
export const deleteTasksRoute = (taskId, accessToken)=> axios.delete(`${tasksEndpoint}/delete/${taskId}`, setHeaders(accessToken))

