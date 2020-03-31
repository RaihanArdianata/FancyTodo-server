const {User} = require('../models')
const {gen_token} = require('../helper/jws.js')
const {decode} = require('../helper/bycript.js')

class Controller{

    static signup(req, res){
        let data = {
            email : req.body.email,
            password : req.body.password
        }
        User.create(data)
        .then((result)=>{
            let user = {
                id : result.id,
                email : result.email
            }
            let token = gen_token(user)
            res.status(201).json({
                id: user.id,
                email: user.email, 
                token: token
            })
        })
        .catch((err)=>{
            res.status((500)).json(err)
        })

    }

    static signin(req, res){
        let data = {
            email : req.body.email,
            password : req.body.password
        }
        User.findOne({
            where:{
                email : data.email
            }
        })
        .then((result)=>{
            if(result){
                let compared = decode(data.password, result.password)
                if(compared){
                    let user = {
                        id : result.id,
                        email : result.email
                    }
                    let token = gen_token(user)
                    res.status(200).json({
                        id: user.id,
                        email: user.email, 
                        token: token
                    })
                }
                else{
                    res.status(400).json({
                        'type': 'Bad request',
                        'msg': 'invlid email/password'
                    })
                }
            }else{
                res.status(400).json({
                    'type': 'Bad request',
                    'msg': 'invlid email/password'
                })
            }
        })
        .catch((err)=>{
            res.status((500)).json(err)
        })
    }

}

module.exports = Controller