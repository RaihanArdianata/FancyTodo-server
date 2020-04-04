const {User} = require('../models')
const {gen_token} = require('../helper/jws.js')
const {decode} = require('../helper/bycript.js')
const {OAuth2Client} = require('google-auth-library');

class Controller{

    static signup(req, res, next){
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
            return res.status(201).json({
                id: user.id,
                email: user.email, 
                token: token
            })
        })
        .catch((err)=>{
            return next(err)
        })

    }

    static signin(req, res, next){
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
                    return res.status(200).json({
                        id: user.id,
                        email: user.email, 
                        token: token
                    })
                }
                else{
                    return next({
                        'type': 'BadRequest',
                        'msg': 'invlid email/password'
                    })
                }
            }else{
                return next({
                    'type': 'BadRequest',
                    'msg': 'invlid email/password'
                })
            }
        })
        .catch((err)=>{
            return next(err)
            res.status((500)).json(err)
        })
    }

    static findAll(req, res, next){
        User.findAll({
            // include:[ todo ],
            order: [
                [
                    'id', 'ASC'
                ]
            ]
        })
            .then((result) => {
                return res.status(201).json(result)

            })
            .catch((err) => {
               return res.status(500).json(err)
            })
    }

    static googleAcount(req, res, next){
        const client = new OAuth2Client(process.env.CLIENT_ID);
        let email = ''
        client.verifyIdToken({
            idToken: req.body.id_token,
            audence: process.env.CLIENT_ID
        })
            .then(result =>{
                console.log('masuk');
                
                email = result.getPayload().email
                User.findOne({
                    where:{
                        email
                    }
                })
                    .then(result=>{
                        console.log('result');
                        
                        if(data){
                            let user = {
                                id: result.id,
                                email: result.email
                            }
                            let token = gen_token(user)
                            res.status(200).json({
                                id: result.id,
                                email: result.email,
                                access_token: token
                            })
                        }else{
                            User.create({
                                email,
                                password:"ThisHash"
                            })
                            .then(data =>{
                                let user = {
                                    id: result.id,
                                    email: result.email
                                }
                                let token = gen_token(user)
                                res.status(201).json({
                                    id: data.id,
                                    email: data.email, 
                                    token: token
                                })
                            })
                        }
                    })
                    .catch(err =>{

                    })
                console.log(result)
            })
            .catch(err =>{
                next(err)
            })
    }   

}

module.exports = Controller