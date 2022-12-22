const usersRepository = require('../repositories/usersRepository')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { OAuth2Client } = require('google-auth-library')

const { JWT } = require('../lib/const')
const { authenticate } = require('../middlewares/auth')

const SALT_ROUND = 10

class authService {
    static async register({ name, email, password, imgURL }) {
        try {
            // Payload Validation
            if (!name) {
                return {
                    status: false,
                    status_code: 400,
                    message: 'Name is required, please input name.',
                    data: {
                        user: null
                    }
                }
            }
            
            if (!email) {
                return {
                    status: false,
                    status_code: 400,
                    message: 'Email is required, please input email.',
                    data: {
                        user: null
                    }
                }
            }

            if (!password) {
                return {
                    status: false,
                    status_code: 400,
                    message: 'Password is required, please input password.',
                    data: {
                        user: null
                    }
                }
            } else if (password.length < 8) {
                return {
                    status: false,
                    status_code: 400,
                    message: 'Password has to have more than 8 characters, please input another password.',
                    data: {
                        user: null
                    }
                }
            }

            if (!imgURL) {
                return {
                    status: false,
                    status_code: 400,
                    message: 'ImgURL is required, please input imgURL.',
                    data: {
                        user: null
                    }
                }
            }

            const getUserByEmail = await usersRepository.getByEmail(email)

            if (getUserByEmail) {
                return {
                    status: false,
                    status_code: 400,
                    message: 'Email is already exist.',
                    data: {
                        user: null
                    }
                }
            }

            const hashedPassword = await bcrypt.hash(password, SALT_ROUND)
            const createdUser = await usersRepository.create({
                name,
                email,
                password: hashedPassword,
                role: 'member',
                imgURL
            })

            return {
                status: true,
                status_code: 201,
                message: "Registration is success",
                data: {
                    registered_user: createdUser
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
    
    static async login({ email, password }) {
        try {
            // Payload Validation
            if (!email) {
                return {
                    status: false,
                    status_code: 400,
                    message: 'Email is required, please input email.',
                    data: {
                        user: null
                    }
                }
            }

            if (!password) {
                return {
                    status: false,
                    status_code: 400,
                    message: 'Password is required, please input password.',
                    data: {
                        user: null
                    }
                }
            } else if (password.length < 8) {
                return {
                    status: false,
                    status_code: 400,
                    message: 'Password has to have more than 8 characters, please input another password.',
                    data: {
                        user: null
                    }
                }
            }

            const getUserByEmail = await usersRepository.getByEmail(email)

            if (!getUserByEmail) {
                return {
                    status: false,
                    status_code: 404,
                    message: 'Email is not registered.',
                    data: {
                        user: null
                    }
                }
            } else {
                const isPasswordMatch = await bcrypt.compare(
                    password,
                    getUserByEmail.password
                )

                if (isPasswordMatch) {
                    const token = jwt.sign(
                        {
                            id: getUserByEmail.id,
                            email: getUserByEmail.email
                        },
                        JWT.SECRET,
                        {
                            expiresIn: JWT.EXPIRED
                        }
                    )

                    return {
                        status: true,
                        status_code: 200,
                        message: "Login successful",
                        data:
                        {
                            token
                        }
                    }
                } else {
                    return {
                        status: false,
                        status_code: 400,
                        message: "Wrong password",
                        data:
                        {
                            user: null,
                        },
                    };
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

    // static async loginGoogle({ google_credential: googleCredential }) {
    //     try {
    //         // Get google user credential
    //         const client = new OAuth2Client()
    //     }
    // }
}

module.exports = authService