const {User} = require('../models')
const {verify} = require('../helper/jws.js')

function autentication(req, res, next) {
    try {
        let decode = verify(req.headers.token)
        console.log(decode)
        User.findOne({
            where:{
                id : decode.id
            }
        })
        .then((result)=>{
            if(result){
                req.CurrentUserId = result.id
                return next()
            }else{
                return res.status(404).json({
                    name: "Not Found",
                    errors: [{ message: " User not found "}]
                })
            }
        })
        .catch((err)=>{
            return res.status(401).json({
                name: "Unautorizes",
                errors: [{ message: " User Unautorizes "}]
            })
        })
    } catch (err) {
        return res.status(500).json({
            name: "Internal Server Error",
            errors: [{ message: " User Unautorizes "}]
        })
    }
}

module.exports = autentication