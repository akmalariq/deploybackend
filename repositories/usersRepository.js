const { User } = require('../models')

class UsersRepository {
    static async getByID(id) {
        const getUser = await User.findOne({ where: { id:id } })
        
        return getUser
    }
    
    static async getByEmail(email) {
        const getUser = await User.findOne({ where: { email:email } })
        
        return getUser
    }
    
    static async enrollAsAdmin(email) {
        const updatedAsAdmin = await User.update(
            {
                role: "admin"
            },
            {
                where: { email: email }
            })
        
        return updatedAsAdmin
    }

    static async create({ name, email, password, role, imgURL }) {
        const createdUser = User.create({
            name,
            email,
            password,
            role,
            imgURL
        })

        return createdUser
    }

    static async deletedByID(id) {
        const deletedUser = await User.update({
            deletedAt: new Date(),
            deletedBy: 'admin'
        }, {
            where: { id }
        })

        return deletedUser
    }
}

module.exports = UsersRepository