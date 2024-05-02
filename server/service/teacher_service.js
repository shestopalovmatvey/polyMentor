const TeacherModel = require("../models/teacher_models");
const bcrypt = require("bcrypt");
const TeacherDto = require("../dtos/teacher-dto");
const { v4: uuidv4 } = require("uuid");
const ApiError = require("../exceptions/api-error");

class TeacherService {
  async registration(email, password, userName, department, post) {
    const candidate = await TeacherModel.findOne({ email });
    if (candidate) {
      throw ApiError.BadRequest("Пользователь с таким email уже существует");
    }
    const id = uuidv4();
    const hashPassword = await bcrypt.hash(password, 5);
    const user = await TeacherModel.create({
      user_id: id,
      department,
      email,
      password: hashPassword,
      userName,
      post,
    });

    const teacherDto = new TeacherDto(user);
    // const tokens = tokenService.generateToken({ ...userDto });

    // await tokenService.saveToken(userDto.id, tokens.refreshToken);

    return {
      user: teacherDto,
    };
  }
}

module.exports = new TeacherService();
