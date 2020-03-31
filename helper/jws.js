const jwt = require('jsonwebtoken');

function gen_token(payload){
    let token = jwt.sign(payload, process.env.SECRET);
    return token
}

function verify(token){
    let decoded = jwt.verify(token, process.env.SECRET);
    return decoded
}

module.exports =  {gen_token, verify}
