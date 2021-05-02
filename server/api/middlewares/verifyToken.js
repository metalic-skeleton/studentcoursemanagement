const jwt = require('jsonwebtoken')
const HttpStatus = require('http-status-codes')

exports.isAuth = async (req, res, next) => {
    const result = await userDataFromJWT(req, res, next)
    if (result && result.username) {
        //add username
        req.username = result.username
        return next()
    }

    return res.status(HttpStatus.StatusCodes.UNAUTHORIZED).json({'message': HttpStatus.getReasonPhrase.UNAUTHORIZED})
}


const userDataFromJWT = async (req, res, next) => {
    // get token from header and check
    const authHeader = req.header("Authorization")
    // check token in header
    if (!authHeader) {
        return;
    }

    try {
        const token = authHeader.split(" ")[1]
        return await jwt.verify(token, process.env.APP_SECREAT_KEY, {algorithms: ['HS256']})
    } catch (error) {
        console.log('userDataFromJWT error', error)
        return;
    }
}
