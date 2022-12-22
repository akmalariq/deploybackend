const { Car } = require('../models')
const Sequelize = require('sequelize')
const Op = Sequelize.Op

class CarsRepository {
    static async create({ name, type, dailyPrice, size, imgURL, username }) {
        const createdCar = Car.create({
            name,
            type,
            dailyPrice,
            size,
            imgURL,
            createdAt: new Date(),
            updatedAt: new Date(),
            deletedAt: null,
            createdBy: username,
            updatedBy: username,
            deletedBy: null
        })

        return createdCar
    }

    static async getAll() {
        const getCars = await Car.findAll({
            where: {deletedAt:null}
        })

        return getCars
    }

    static async getByID(id) {
        const getCarByID = await Car.findByPk(id)

        return getCarByID
    }

    static async delete({ id, username }) {
        const deletedCar = await Car.update(
            {
                deletedAt: new Date(),
                deletedBy: username
            },
            {
                where: { id:id }
            })

        return deletedCar
    }

    static async update({ id, name, type, dailyPrice, size, imgURL, username }) {
        const deletedCar = await Car.update(
            {
                name,
                type,
                dailyPrice,
                size,
                imgURL,
                updatedAt: new Date(),
                updatedBy: username,
            },
            {
                where: { id:id }
            })

        return deletedCar
    }
    
}

module.exports = CarsRepository;