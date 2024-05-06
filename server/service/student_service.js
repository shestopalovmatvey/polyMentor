const StudentModel = require("../models/student_models");
const bcrypt = require("bcrypt");
const StudentDto = require("../dtos/student_dto");
const { v4: uuidv4 } = require("uuid");
const ApiError = require("../exceptions/api-error");
const tokenService = require("./token-service");

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
    const tokens = tokenService.generateToken({ ...studentDto });

    await tokenService.saveToken(studentDto.id, tokens.refreshToken);

    return {
      ...tokens,
      user: studentDto,
    };
  }

  async login(email, password) {
    const user = await StudentModel.findOne({ email });

    if (!user) {
      throw ApiError.BadRequest("Пользователь с таким email не найден");
    }

    const isPasswordEquals = await bcrypt.compare(password, user.password);

    if (!isPasswordEquals) {
      throw ApiError.BadRequest("Пароль неверный");
    }

    const userDto = new StudentDto(user);
    const tokens = tokenService.generateToken({ ...userDto });

    await tokenService.saveToken(userDto.id, tokens.refreshToken);

    return { ...tokens, user: userDto };
  }

  async logout(refreshToken) {
    const token = await tokenService.removeToken(refreshToken);
    return token;
  }

  async refresh(refreshToken) {
    if (!refreshToken) {
      throw ApiError.UnauthorizedError();
    }

    const studentData = tokenService.validateRefreshToken(refreshToken);
    const tokenFromDb = await tokenService.findToken(refreshToken);

    if (!studentData || !tokenFromDb) {
      throw ApiError.UnauthorizedError();
    }

    const student = await StudentModel.findById(studentData.id);
    const studentDto = new StudentDto(student);
    const tokens = tokenService.generateToken({ ...studentDto });

    await tokenService.saveToken(studentDto.id, tokens.refreshToken);

    return { ...tokens, user: userDto };
  }
}

module.exports = new StudentService();
