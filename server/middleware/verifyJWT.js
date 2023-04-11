const jwt = require('jsonwebtoken')
const {sendError, statusCodes} = require('../utils/response')

function verifyJWT(req, res, next){
    const authHeader = req.headers.authorization
    if(!authHeader) return sendError(res, "Not authorized", statusCodes.notAuthorized) 
    const token = authHeader.split(' ')[1]
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (error, decoded)=>{
        if(error) return sendError(res, error, statusCodes.forbidden, "Access forbidden", null)
        req.userId = decoded.userId
        next()
    })
}

module.exports = verifyJWT