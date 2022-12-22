const jwt = require('jsonwebtoken')
const { JWT, ROLES } = require('../lib/const')
const usersRepository = require('../repositories/usersRepository')

const authenticate = async (req, res, next) => {
    const authHeader = req.get("Authorization")

    let token = ""

    if (authHeader && authHeader.split(" ")[0] === "Bearer") {
        token = authHeader.split(" ")[1]
    } else {
        return res.status(401).send({
            status: false,
            message: "Please login to access",
            data: null
        })
    }

    try {
        const { email } = jwt.verify(token, JWT.SECRET)

        const getUser = await usersRepository.getByEmail(email)

        req.user = getUser
        
        next()

        return
    } catch (err) {
        return res.status(401).send({
            status: false,
            message: "Session expired",
            data: null
        })
    }
}

const isAdmin = async (req, res, next) => {
    const user = req.user

    if ((user.role === ROLES.ADMIN) || (user.role === ROLES.SUPERADMIN)) return next()

    return res.status(401).send({
        status: false,
        message: "You need an Admin credentials to pass here",
        data: null
    })
}

const isSuperAdmin = async (req, res, next) => {
    const user = req.user

    if (user.role === ROLES.SUPERADMIN) return next()

    return res.status(401).send({
        status: false,
        message: "You need a Super Admin credentials to pass here",
        data: null
    })
}

module.exports = { authenticate, isAdmin, isSuperAdmin }