const usersRepository = require('../repositories/usersRepository')

class UsersService {
    static async getByID(id) {
        try {
            const getUser = await usersRepository.getByID(id)

            return {
                status: true,
                status_code: 200,
                message: 'Success',
                data: {
                    user: getUser
                }
            }
        } catch (err) {
            return {
                status: false,
                status_code: 500,
                message: err.message,
                data: {
                    user: null
                }
            }
        }
    }
    
    static async getByEmail(email) {
        try {
            const getUser = await usersRepository.getByEmail(email)

            return {
                status: true,
                status_code: 200,
                message: 'Success',
                data: {
                    user: getUser
                }
            }
        } catch (err) {
            return {
                status: false,
                status_code: 500,
                message: err.message,
                data: {
                    user: null
                }
            }
        }
    }
    
    static async create({ name, email, password, role, imgURL }) {
        try {
            const getUserByEmail = await this.getByEmail(email)
            const { status,data } = getUserByEmail

            if (!status) {
                return {
                status: false,
                status_code: 400,
                message: 'Email already exist',
                data: {
                    user: data
                }
            }
            }

            const createUser = await usersRepository.create({ name, email, password, role, imgURL })

            return {
                status: true,
                status_code: 201,
                message: 'Success',
                data: {
                    user: createUser
                }
            }
        } catch (err) {
            return {
                status: false,
                status_code: 500,
                message: err.message,
                data: {
                    user: null
                }
            }
        }
    }

    static async deletedByID(id) {
        try {
            const getUserByID = await this.getByID(id)
            const { status,data } = getUserByID

            if (!status) {
                return {
                status: false,
                status_code: 400,
                message: 'ID does not exist',
                data: {
                    user: data
                }
            }
            }

            const deletedUser = await usersRepository.deletedByID(id)

            return {
                status: true,
                status_code: 201,
                message: 'Success',
                data: {
                    user: data
                }
            }
        } catch (err) {
            return {
                status: false,
                status_code: 500,
                message: err.message,
                data: {
                    user: null
                }
            }
        }
    }

    
    static async registerAsAdmin(email) {
        try {
            const getUser = await usersRepository.getByEmail(email)
            console.log(getUser)
            if (!getUser) {
                return {
                    status: false,
                    status_code: 404,
                    message: "Email does not exists",
                    data: {
                        registered_user: null
                    }
                }
            }

            const rows_updated = await usersRepository.enrollAsAdmin(email)
            const updatedUser = await usersRepository.getByEmail(email)
            
            return {
                status: true,
                status_code: 201,
                message: "User successfuly enrolled as Admin",
                data: {
                    rows: rows_updated,
                    registered_user: updatedUser
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
}

module.exports = UsersService