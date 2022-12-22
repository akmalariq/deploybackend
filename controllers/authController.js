const authService = require('../services/authService')
const UsersService = require('../services/userService')

const register = async (req, res) => {
    const { name, email, password, imgURL } = req.body

    const { status, status_code, message, data } = await authService.register({
        name,
        email,
        password,
        imgURL
    })

    res.status(status_code).send({
        status: status,
        message: message,
        data: data
    })
}

const registerAsAdmin = async (req, res) => {
    const email = req.body.email

    const { status, status_code, message, data } = await UsersService.registerAsAdmin(email)

    res.status(status_code).send({
        status: status,
        message: message,
        data: data
    })
}

const currentUser = async (req, res) => {
    const currentUser = req.user

    res.status(200).send({
        status: true,
        message: "Get current user success",
        data:
        {
            user: currentUser
        }
    })
}

const login = async (req, res) => {
    const { email, password } = req.body

    const { status, status_code, message, data } = await authService.login({
        email,
        password
    })

    res.status(status_code).send({
        status: status,
        message: message,
        data: data
    })
}

module.exports = { register, login, currentUser, registerAsAdmin }