const router = require('express').Router()

router.get((err, req, res, next)=>{
    if (err.name == 'SequelizeValidationError') {
        const errors = err.errors.map((datum)=>({
            message: datum.message
        }))
        res.status(400).json(errors)
    }else{
        res.status(500).json(err)
    }
})

module.exports = router