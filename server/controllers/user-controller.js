const { MongoClient, ServerApiVersion } = require("mongodb");
const ApiError = require("../exceptions/api-error");
const teacherService = require("../service/teacher_service");
const studentService = require("../service/student_service");
const { validationResult, cookie } = require("express-validator");

const client = new MongoClient(process.env.DB_URL, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

class UserController {
  async registration(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return next(
          ApiError.BadRequest("Ошибка при валидации", errors.array())
        );
      }
      const { role, userName, email, password, department, post } = req.body;

      if (role === "Студент") {
        const studentData = await studentService.registration(
          email,
          password,
          userName,
          department
        );
        res.cookie("refreshToken", (await studentData).refreshToken, {
          maxAge: 30 * 24 * 60 * 60 * 1000,
          httpOnly: true,
        });
        return res.status(200).json(studentData);
      }

      if (role === "Преподаватель") {
        const teacherData = await teacherService.registration(
          email,
          password,
          userName,
          department,
          post
        );
        res.cookie("refreshToken", (await teacherData).refreshToken, {
          maxAge: 30 * 24 * 60 * 60 * 1000,
          httpOnly: true,
        });
        return res.status(200).json(teacherData);
      }
    } catch (e) {
      next(e);
    }
  }

  async login(req, res, next) {
    try {
      const { role, email, password } = req.body;
      if (role === "Преподаватель") {
        const teacherData = await teacherService.login(email, password);
        res.cookie("refreshToken", (await teacherData).refreshToken, {
          maxAge: 30 * 24 * 60 * 60 * 1000,
          httpOnly: true,
        });
        return res.json(teacherData);
      }
      if (role === "Студент") {
        const studentData = await studentService.login(email, password);
        res.cookie("refreshToken", (await studentData).refreshToken, {
          maxAge: 30 * 24 * 60 * 60 * 1000,
          httpOnly: true,
        });
        return res.json(studentData);
      }
    } catch (e) {
      next(e);
    }
  }

  async logout(req, res, next) {
    try {
      const { role } = req.body;
      const { refreshToken } = req.cookies;
      if (role === "Преподаватель") {
        const token = await teacherService.logout(refreshToken);
        res.clearCookie("refreshToken");
        return res.json(token);
      }
      if (role === "Студент") {
        const token = await studentService.logout(refreshToken);
        res.clearCookie("refreshToken");
        return res.json(token);
      }
    } catch (e) {
      next(e);
    }
  }

  async refresh(req, res, next) {
    try {
      const { role } = req.body;
      const { refreshToken } = req.cookies;
      if (role === "Преподаватель") {
        const userData = await teacherService.refresh(refreshToken);
        res.cookie("refreshToken", userData.refreshToken, {
          maxAge: 30 * 24 * 60 * 60 * 1000,
          httpOnly: true,
        });
        return res.json(userData);
      }
      if (role === "Студент") {
        const userData = await studentService.refresh(refreshToken);
        res.cookie("refreshToken", userData.refreshToken, {
          maxAge: 30 * 24 * 60 * 60 * 1000,
          httpOnly: true,
        });
        return res.json(userData);
      }
    } catch (e) {
      next(e);
    }
  }

  async getListOfUniver(req, res) {
    try {
      await client.connect();
      const db = client.db("University");
      const collection = db.collection("ListOfUniver");
      const universities = await collection.find().toArray();
      res.json(universities);
    } catch (error) {
      res.status(500).send("Internal Server Error");
    } finally {
      await client.close();
    }
  }

  async addToFavorites(req, res, next) {
    try {
      const { studentId, announcementId } = req.body;
      const result = await studentService.addToFavorites(
        studentId,
        announcementId
      );
      res.json(result);
    } catch (error) {
      next(error);
    }
  }

  async removeFromFavorites(req, res, next) {
    try {
      const { studentId, announcementId } = req.body;
      const result = await studentService.removeFromFavorites(
        studentId,
        announcementId
      );
      res.json(result);
    } catch (error) {
      next(error);
    }
  }

  async getAllFavoriteAnnouncements(req, res, next) {
    try {
      const { studentId } = req.body;
      const favoriteAnnouncements =
        await studentService.getAllFavoriteAnnouncements(studentId);
      res.json(favoriteAnnouncements);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new UserController();
