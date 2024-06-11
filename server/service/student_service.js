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
      favoriteAnnouncements,
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

    return { ...tokens, user: { ...userDto, role: "Студент" } };
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
    if (!studentData) {
      throw ApiError.UnauthorizedError();
    }

    const tokenFromDb = await tokenService.findToken(refreshToken);
    if (!tokenFromDb) {
      throw ApiError.UnauthorizedError();
    }

    const isTokenExpired = new Date() > new Date(tokenFromDb.expiresIn);
    if (!isTokenExpired) {
      const student = await StudentModel.findById(studentData.id);
      const studentDto = new StudentDto(student);
      return { accessToken: refreshToken, refreshToken, user: studentDto };
    }

    const student = await StudentModel.findById(studentData.id);
    const studentDto = new StudentDto(student);
    const tokens = tokenService.generateToken({ ...studentDto });

    await tokenService.saveToken(studentDto.id, tokens.refreshToken);

    return { ...tokens, user: studentDto };
  }

  async addToFavorites(studentId, announcementId) {
    const student = await StudentModel.findById(studentId);
    if (!student) {
      throw ApiError.BadRequest("Студент не найден");
    }

    if (!student.favoriteAnnouncements.includes(announcementId)) {
      student.favoriteAnnouncements.push(announcementId);
      await student.save();
      return { message: "Объявление успешно добавлено в избранное!" };
    } else {
      return { message: "Объявление уже добавлено в избранное!" };
    }
  }

  async removeFromFavorites(studentId, announcementId) {
    const student = await StudentModel.findById(studentId);
    if (!student) {
      throw ApiError.BadRequest("Студент не найден");
    }

    const index = student.favoriteAnnouncements.indexOf(announcementId);
    if (index !== -1) {
      student.favoriteAnnouncements.splice(index, 1);
      await student.save();
      return { message: "Объявление успешно удалено из избранного студента" };
    } else {
      return { message: "Объявление не найдено в избранном студента" };
    }
  }

  async getAllFavoriteAnnouncements(studentId) {
    const student = await StudentModel.findById(studentId).populate(
      "favoriteAnnouncements"
    );
    if (!student) {
      throw new Error("Студент не найден");
    }
    return student.favoriteAnnouncements;
  }
}

module.exports = new StudentService();
