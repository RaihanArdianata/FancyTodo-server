const {User, Todo } = require('../models')

class Controller {

    static findAll(req, res, next) {
        let UserId = req.CurrentUserId
        Todo.findAll({
            include:[ User ],
            order: [
                [
                    'id', 'ASC'
                ]
            ], where:{
                UserId
            }
        })
            .then((result) => {
                return res.status(201).json(result)

            })
            .catch((err) => {
                return next(err)
            })
    }

    static findByPk(req, res, next) {
        const id = req.params.id
        Todo.findByPk(id)
            .then((result) => {
                if (result) {
                    return res.status(200).json(result)
                } else {
                    return next({ message: 'Data Not Found', data: result })
                }
            })
            .catch((err) => {
                return next(err)
            })
    }

    static create(req, res, next) {
        let { title, description, status, due_date } = req.body
        let UserId = req.CurrentUserId
        Todo.create({
            title,
            description,
            due_date,
            UserId,
            status
        })
            .then((result) => {
                // console.log(result);
                return res.status(201).json(result)
            })
            .catch((err) => {
                return next(err)
            })
    }

    static update(req, res, next) {
        const id = +req.params.id
        let { title, description, status, due_date } = req.body
        let UserId = req.CurrentUserId
        const data = {
            title,
            description,
            status,
            due_date,
            UserId
        }

        Todo.update(data, {
            where: {
                id
            }
        })
            .then((result) => {
                if (result[0] > 0) {
                    return res.status(200).json(data)
                } else {
                    return next({ message: 'Data Not Found', data: result })
                }
            })
            .catch((err) => {
                return next(err)
            })
    }

    static delete(req, res, next) {
        const id = req.params.id
        let data
        Todo.findByPk(id)
            .then((result) => {
                if(result != null ){
                    data = result
                    
                    return Todo.destroy({
                        where: {
                            id
                        }
                    })
                }else{
                    return next({ message: 'Data Not Found', data: result })
                }
            })
            .then((result) => {
                return res.status(200).json(data)
            })
            .catch((err) => {
                return next(err)
            })
    }
}

module.exports = Controller