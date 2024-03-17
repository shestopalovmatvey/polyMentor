const StudentModel = require('../models/student_models')
const bcrypt = require('bcrypt')

class StudentService {
    async registration(email, password, userName, department) {
        const candidate = await StudentModel.findOne({email})
        if (candidate) {
            throw new Error(`Пользователь с таким email уже существет`)
        }

        const hashPassword = await bcrypt.hash(password, 3)


    }

}

module.exports = new StudentService()