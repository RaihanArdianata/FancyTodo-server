require('dotenv').config()
const cors = require('cors')
const express = require('express')
const router = require('./router')
const errHandling = require('./middleware/err_handling.js')
const app = express()
const PORT = process.env.PORT

app.use(cors())
app.use(express.urlencoded({extended:false}))
app.use(express.json())
app.use(router)

app.use((err, req, res, next)=>{
    if (err.name == 'SequelizeValidationError') {
        const errors = err.errors.map((datum)=>({
            message: datum.message
        }))
        return res.status(400).json(errors)
    }else{
        return res.status(500).json(err)
    }
})

app.listen(PORT, (req, res) => {
    console.log('listening port ', PORT)
})