const axios = require('axios');
class Controller {

    static getAll(req, res) {
        axios.get('https://corona.lmao.ninja/all')
            .then((result)=>{
                // handle success
                const {data} =  result
                res.status(200).json({
                    data
                })
            })
            .catch((err)=>{
                // handle error
                res.status(500).json({
                    err
                })
            })
    }
}

module.exports = Controller