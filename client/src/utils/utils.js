export function getErrorMessage(error){
    console.log(error)
    // if error from the backend
    if(error.response) return error.response.data.message
    return error.message || 'An error occurred please try again'
}

export {getErrorMessage}