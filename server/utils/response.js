// for sending data
function sendData(res, statusCode, data){
    res.status(statusCode ? statusCode : 200).json({success:true, data})
    return
}

function sendError(res, error, statusCode, message, data={}){
    console.log(error)
    // console.log('data', data)
    res.status(statusCode).json({success:false, message, data})
    return
}

//for sending confirmation messages
function sendMessage(res, message){
    res.status(200).json({success:true, message})
    return
}

const statusCodes = {
    ok:200,
    created:201,
    badRequest:400,
    notAuthorized:401,
    forbidden:403,
    notFound:404,
    notAccepted:406,
    serverError:500
}

module.exports = {sendData, sendError, sendMessage, statusCodes}