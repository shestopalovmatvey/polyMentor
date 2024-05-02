const StudentModel = require("../models/student_models");
const bcrypt = require("bcrypt");
const StudentDto = require("../dtos/student_dto");
const { v4: uuidv4 } = require("uuid");
const ApiError = require("../exceptions/api-error");

class StudentService {
  async registration(email, password, userName, department) {
    const candidate = await StudentModel.findOne({ email });
    if (candidate) {
      throw ApiError.BadRequest("Пользователь с таким email уже существует");
    }
    const id = uuidv4();
    const hashPassword = await bcrypt.hash(password, 5);
    const user = await StudentModel.create({
      user_id: id,
      department,
      email,
      password: hashPassword,
      userName,
    });

    const studentDto = new StudentDto(user);
    // const tokens = tokenService.generateToken({ ...userDto });

    // await tokenService.saveToken(userDto.id, tokens.refreshToken);

    return {
      user: studentDto,
    };
  }
}

module.exports = new StudentService();
