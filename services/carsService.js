const carsRepository = require('../repositories/carsRepositories')

class CarsService{
    static async create({ name, type, dailyPrice, size, imgURL, username }) {
        console.log('service terpanggil')
        try {
            if (!name) {
                return {
                    status: false,
                    status_code: 400,
                    message: "Name must be filled",
                    data: {
                        car: null
                    }
                }
            }

            if (!type) {
                return {
                    status: false,
                    status_code: 400,
                    message: "Type must be filled",
                    data: {
                        car: null
                    }
                }
            }

            if (!dailyPrice) {
                return {
                    status: false,
                    status_code: 400,
                    message: "Daily Price must be filled",
                    data: {
                        car: null
                    }
                }
            }

            if (!size) {
                return {
                    status: false,
                    status_code: 400,
                    message: "Size must be filled",
                    data: {
                        car: null
                    }
                }
            }

            if (!imgURL) {
                return {
                    status: false,
                    status_code: 400,
                    message: "Image must not be empty",
                    data: {
                        car: null
                    }
                }
            }

            const createdCar = await carsRepository.create({
                name,
                type,
                dailyPrice,
                size,
                imgURL,
                username
            })

            return {
                status: true,
                status_code: 201,
                message: "Car is created successfully",
                data: {
                    created_car: createdCar
                }
            }

        } catch (err) {
            return {
                status: false,
                status_code: 500,
                message: err.message,
                data: {
                    registered_user: null
                }
            }
        }
    }

    static async getAll() {
        try {
            const getAllCars = await carsRepository.getAll()

            return {
                status: true,
                status_code: 200,
                message: "Cars are retrieved successfully",
                data: {
                    get_cars: getAllCars
                }
            }

        } catch(err) {
            return {
                status: false,
                status_code: 500,
                message: err.message,
                data: {
                    car: null
                }
            }
        }
    }

    static async getByID(id) {
        try {
            const getCarByID = await carsRepository.getByID(id)

            if (!getCarByID) {
                return {
                    status: false,
                    status_code: 404,
                    message: "Car ID is not found",
                    data: {
                        car: null
                    }
                }
            } else if (getCarByID.deletedAt !== null) {
                return {
                    status: false,
                    status_code: 404,
                    message: "Car not found, maybe deleted...",
                    data: {
                        car: null
                    }
                }
            }

            return {
                status: true,
                status_code: 200,
                message: "Car is retrieved successfully",
                data: {
                    get_car: getCarByID
                }
            }

        } catch(err) {
            return {
                status: false,
                status_code: 500,
                message: err.message,
                data: {
                    car: null
                }
            }
        }
    }

    static async delete({ id, username }) {
        try {
            const getCarByID = await this.getByID(id)
            
            if (!getCarByID.status) {
                return getCarByID
            }
            
            const rows_deleted = await carsRepository.delete({ id, username })
            const deleted_car = await this.getByID(id)
            
            return {
                status: true,
                status_code: 201,
                message: "Car is removed successfully",
                data: {
                    rows_deleted: rows_deleted,
                    deleted_car: rows_deleted.data['get_car']
                }
            }

        } catch(err) {
            return {
                status: false,
                status_code: 422,
                message: err.message,
                data: {
                    car: null
                }
            }
        }
    }

    static async update({ id, name, type, dailyPrice, size, imgURL, username }) {
        try {
            const getCarByID = await this.getByID(id)

            if (!getCarByID.status) {
                return getCarByID
            }

            if (!name && !type && !dailyPrice && !size && !imgURL) {
                return {
                    status: false,
                    status_code: 404,
                    message: "Please add an argument to update",
                    data: {
                        car: null
                    }
                }
            }

            if (!name) {
                name = getCarByID.data['get_car']['name']
            }

            if (!type) {
                type = getCarByID.data['get_car']['type']
            }

            if (!dailyPrice) {
                dailyPrice = getCarByID.data['get_car']['dailyPrice']
            }

            if (!size) {
                size = getCarByID.data['get_car']['size']
            }

            if (!imgURL) {
                imgURL = getCarByID.data['get_car']['imgURL']
            }

            const updatedCar = await carsRepository.update({ id, name, type, dailyPrice, size, imgURL, username })

            const newUpdatedCar = await this.getByID(id)

            return {
                status: true,
                status_code: 201,
                message: "Car is updated successfully",
                data: {
                    rows_updated: updatedCar,
                    updated_car: newUpdatedCar['data']['get_car']
                }
            }

        } catch(err) {
            return {
                status: false,
                status_code: 422,
                message: err.message,
                data: {
                    car: null
                }
            }
        }
    }
}

module.exports = CarsService;