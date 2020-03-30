const { Todo } = require('../models')

class Controller {

    static findAll(req, res) {
        Todo.findAll({
            order: [
                [
                    'id', 'ASC'
                ]
            ]
        })
            .then((result) => {
                res.status(201).json(result)

            })
            .catch((err) => {
                res.status(500).json(err)
            })
    }

    static findByPk(req, res) {
        const id = req.params.id
        Todo.findByPk(id)
            .then((result) => {
                if (result) {
                    res.status(200).json(result)
                } else {
                    res.status(404).json({ message: 'Data Not Found', data: result })
                }
            })
            .catch((err) => {
                res.status(500).json(err)
            })
    }

    static create(req, res) {
        let { title, description, status, due_date } = req.body

        console.log(title)
        Todo.create({
            title,
            description,
            status,
            due_date
        })
            .then((result) => {
                res.status(201).json(result)
            })
            .catch((err) => {
                res.status(500).json(err)
            })
    }

    static update(req, res) {
        const id = req.params.id
        let { title, description, status, due_date } = req.body

        const data = {
            title,
            description,
            status,
            due_date
        }

        Todo.update(data, {
            where: {
                id
            }
        })
            .then((result) => {
                console.log(result)
                if (result[0] > 0) {
                    res.status(200).json(data)
                } else {
                    res.status(404).json({ message: 'Data Not Found', data: result })
                }
            })
            .catch((err) => {
                res.status((400)).json(err)
            })
    }

    static delete(req, res) {
        const id = req.params.id
        Todo.destroy({
            where: {
                id
            }
        })
            .then((result) => {
                if (result[0] > 0) {
                    res.status(200).json(data)
                } else {
                    res.status(404).json({ message: 'Data Not Found', data: result })
                }
            })
            .catch((err) => {
                res.status((400)).json(err)
            })
    }
}

module.exports = Controller