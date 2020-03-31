const {Todo} = require('../models')
function autorization(req, res, next) {
    console.log(req.params.id)
    Todo.findOne({
        where:{
            id: req.params.id
        }
    })
    .then((result)=>{

        if(result){
            if(result.UserId == req.CurrentUserId){

                return next()
            }else{

                return res.status(401).json({
                    name:'Not Autorized',
                    errors: [{
                        message: 'User Not Autorized'
                    }]
                })
            }
        }else{
            return res.status(404).json({
                name:'Not Found',
                errors: [{
                    message: 'Data Not Found'
                }]
            })
        }
    })
    .catch((err)=>{
        return res.status(500).json({
            name:'Not Found',
            errors: [{
                message: err
            }]
        })
    })
}

module.exports = autorization