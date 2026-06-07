require('dotenv').config();
const jwt= require('jsonwebtoken');

function authMiddleware(req, res, next){
    try{
        let authHeader= req.headers.authorization;
        let tokenArray= authHeader.split(" ");
        let token= tokenArray[1];
        let verify= jwt.verify(token, process.env.JWT_SECRET);
        req.user= verify;
        next();
    } catch(err){
        console.log(err.message);
        res.status(401).json({message: 'Unauthorized'});
    }
}

module.exports= authMiddleware;