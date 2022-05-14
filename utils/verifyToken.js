const jwt = require("jsonwebtoken");
const createError = require("../utils/error.js");

const verifyToken = (req,res,next) => {
    const token = req.cookies.access_token;
    if(!token){
        return next(createError(401, "You Are Not Authenticated! "))
    }

    jwt.verify(token,process.env.JWT, (err, user) => {
        if(err) return next(createError(403, "Token is Not Valid!"));
        req.user = user;
        next()
    })
}

const verifyUser = (req,res,next)=> {
    verifyToken(req,res,next,()=> {
        if(req.user.id === req.params.id || req.user.isAdmin){
            next()
        }else{
            if(err) return next(createError(403, "You are Not Authorized!"));
        }
    })
} 

const verifyAdmin = (req,res,next)=> {
    verifyToken(req,res,()=> {
        if(req.user.isAdmin){
            next()
        }else{
            next(createError(403, "You are Not Authorized!"));
        }
    })
} 

module.exports = {verifyToken , verifyUser , verifyAdmin };