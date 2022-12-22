const carsService = require('../services/carsService')

const create = async (req, res) => {
    const { name, type, dailyPrice, size, imgURL } = req.body;
    const username = req.user.name

    // const user_id = req.user.id

    const { status, status_code, message, data } = await carsService.create({
        name,
        type,
        dailyPrice,
        size,
        imgURL,
        username
    })

    res.status(status_code).send({
        status: status,
        message: message,
        data: data
    })
}

const getAll = async (req, res) => {

    const { status, status_code, message, data } = await carsService.getAll()

    res.status(status_code).send({
        status: status,
        message: message,
        data: data
    })
}

const getByID = async (req, res) => {
    const id = req.params.id
    const { status, status_code, message, data } = await carsService.getByID(id)

    res.status(status_code).send({
        status: status,
        message: message,
        data: data
    })
}

const deleteCar = async (req, res) => {
    const id = req.params.id
    const username = req.user.name
    const { status, status_code, message, data } = await carsService.delete({ id, username })

    res.status(status_code).send({
        status: status,
        message: message,
        data: data
    })
}

const updateCar = async (req, res) => {
    const id = req.params.id
    const { name, type, dailyPrice, size, imgURL } = req.body
    const username = req.user.name

    const { status, status_code, message, data } = await carsService.update({ id, name, type, dailyPrice, size, imgURL, username })

    res.status(status_code).send({
        status: status,
        message: message,
        data: data
    })
}

module.exports = { create, getAll, getByID, deleteCar, updateCar };