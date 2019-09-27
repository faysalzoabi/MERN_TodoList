const jwt = require('jsonwebtoken');

function auth(req, res, next) {
    try{
    console.log('token', req.headers)
    const token = req.headers.authorization.split(" ")[1];
    console.log('tooooken', token);
    //check for token
    if(!token) return res.status(401).json({msg:'No token, authorization denied'});
        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        req.user = decoded;
        next();
    }catch(err) {
        res.status(401).json({msg:'Token is not valid'});
    }
}

module.exports = auth;