var bcrypt = require('bcryptjs');

function encode(password){
    var salt = bcrypt.genSaltSync(20);
    var hash = bcrypt.hashSync(password, salt);
    return hash
}

function decode(password, hash){
    return bcrypt.compareSync(password, hash)
}

module.exports = {encode, decode}

