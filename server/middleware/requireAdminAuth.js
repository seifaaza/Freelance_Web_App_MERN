const jwt = require('jsonwebtoken');
const Admin = require('../models/admin')

async function requireAdminAuth(req, res, next) {
    try{
        const token = req.cookies.AdminAuthorization; 

        const decoded = jwt.verify(token, process.env.SECRET)

        if(Date.now() > decoded.exp) return res.sendStatus(401)

        const admin = await Admin.findById(decoded.sub)
        if(!admin) return res.sendStatus(401)

        req.admin = admin

        next();

    }catch(err){
        return res.sendStatus(401)
    }
}

module.exports = requireAdminAuth