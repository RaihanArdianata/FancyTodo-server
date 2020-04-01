require('dotenv').config()
const express = require('express')
const app = express()
const PORT = process.env.PORT
const router = require('./router')

app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use('/', router)

app.use((err, req, res, next)=>{
    if (err.name == 'SequelizeValidationError') {
        const errors = err.errors.map((datum)=>({
            message: datum.message
        }))
        res.status(400).json(errors)
    }else{
        res.status(500).json(err)
    }
})

app.listen(PORT, (req, res) => {
    console.log('listening port ', PORT)
})