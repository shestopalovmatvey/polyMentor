const TeacherModel = require("../models/teacher_models");
const bcrypt = require("bcrypt");
const TeacherDto = require("../dtos/teacher-dto");
const { v4: uuidv4 } = require("uuid");
const ApiError = require("../exceptions/api-error");
const tokenService = require("./token-service");

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
    const tokens = tokenService.generateToken({ ...teacherDto });

    await tokenService.saveToken(teacherDto.id, tokens.refreshToken);
    return {
      ...tokens,
      user: teacherDto,
    };
  }

  async login(email, password) {
    const user = await TeacherModel.findOne({ email });

    if (!user) {
      throw ApiError.BadRequest("Пользователь с таким email не найден");
    }

    const isPasswordEquals = await bcrypt.compare(password, user.password);

    if (!isPasswordEquals) {
      throw ApiError.BadRequest("Пароль неверный");
    }

    const userDto = new TeacherDto(user);
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

    const teacherData = tokenService.validateRefreshToken(refreshToken);
    const tokenFromDb = await tokenService.findToken(refreshToken);

    if (!teacherData || !tokenFromDb) {
      throw ApiError.UnauthorizedError();
    }

    const teacher = await TeacherModel.findById(teacherData.id);
    const teacherDto = new TeacherDto(teacher);
    const tokens = tokenService.generateToken({ ...teacherDto });

    await tokenService.saveToken(studentDto.id, tokens.refreshToken);

    return { ...tokens, user: userDto };
  }
}

module.exports = new TeacherService();
